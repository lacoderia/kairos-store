import { fromJS } from 'immutable';

const initialState = fromJS({
})

function forgotViewReducer(state = initialState, action) {
  switch(action.type){
    default:
      return state;
  }
}

export default forgotViewReducer;
