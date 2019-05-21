
const LocalStorage={
    getDataByKey:getDataByKey,
    setDataByKey:setDataByKey
}
export default LocalStorage;


function  getDataByKey(key){
   return JSON.parse(localStorage.getItem(key));
}
function  setDataByKey(key,data){
  localStorage.setItem(key,JSON.stringify(data));
}
