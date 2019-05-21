import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import TopBar from '../core/TopBar';
import location from  '../images/location_icon.png';
import building from  '../images/building-icon.png';
import Script from 'react-load-script';
import searchedListAction from "../redux/actions/SearchedList";
import staticData from  '../staticdata/StaticData';
class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
 
  }
  componentWillMount(){
    this.props.searchedListAction(staticData.getHotelList());
  }
  componentDidMount(){
 
  }
  componentWillUnmount(){
  }
   
  handleScriptLoad=()=> {
    var options = {
      types: ['(cities)'],
    };
    // Initialize Google Autocomplete
    /*global google*/ // To disable any eslint 'google not defined' errors
    new google.maps.places.Autocomplete(
          document.getElementById('autocomplete'),
          options,
        );
    // Fire Event when a suggested name is selected
  }
  render() {
    var me=this;
    if(this.state.searchText&&this.state.searchText.length>0){
      var searchedList=this.props.searchedList&&this.props.searchedList.data?this.props.searchedList.data:[];
       searchedList = searchedList.filter(function(object){
                return object.name.match(new RegExp(me.state.searchText, "i"))||object.address.match(new RegExp(me.state.searchText, "i"));
            });
        if(searchedList&&searchedList.length>0){
          setTimeout(() => {
            var string="";
          searchedList.forEach(element => {
            string=string+'<div class="pac-item"><img class="building-icon" src="'+building+'"}/>'+
            ' <span class="pac-item-query"><span class="pac-matched">'+element.name+'</span></span>'+
            ' <span>'+element.address+'</span>'+
            '</div>'
          });
          destroyHotelPopup()
          let topOfGooglePac=document.getElementsByClassName("pac-container")[0].style.display=="none"?'105px':parseInt(window.getComputedStyle(document.getElementsByClassName("pac-container")[0], null).height, 10)+105+'px';
            document.getElementsByTagName("body")[0].insertAdjacentHTML('beforeend', 
          '<div class="pac-container pac-logo hotel-search" id="hotelId" style="  width: 816px; position: absolute;left: 0px;top: '+topOfGooglePac+';">'+string+'</div>');
           }, 300);
        }
        else{
         destroyHotelPopup()
        }
    }
    else{
      destroyHotelPopup()
    }
    return (
      <div className="home-page">
			<TopBar 
			title={"Location and Hotels Search"}
			/>
      <Script 
        url={"https://maps.googleapis.com/maps/api/js?key=AIzaSyAs6qbQjXR47KcQU-97bto1Rn73X8-a_x0&libraries=places&callback=initAutocomplete"}
          onLoad={this.handleScriptLoad}
        />
          <div className="text-field">
          <img className="icon" src={location}/>
      <input className="auto-complete-search" type="text" id="autocomplete" onChange={(e)=>{
        this.setState({searchText:e.target.value})
      }}  onBlur={()=>{ if(document.getElementById("hotelId")){
        document.getElementById("hotelId").style.display='none';
      }}} onFocus={()=>{ if(document.getElementById("hotelId")){
        document.getElementById("hotelId").style.display='block';
      }}}></input>
      </div>
			</div>
    );
  }
}
const mapStateToProps = redux => ({
	searchedList:redux.searchedList
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { searchedListAction:searchedListAction}, 
    dispatch 
  );

};
export default connect(mapStateToProps, mapDispatchToProps)(HomePage) ;

function destroyHotelPopup(){
  if(document.getElementById("hotelId")){
    document.getElementById("hotelId").remove();
  }
}
