
const searchedListAction = (response,dispatch) => {
    return {
      type: "searchedList",
      payload:response
    }
  }

  export default searchedListAction;