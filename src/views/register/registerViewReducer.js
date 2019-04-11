import { fromJS } from 'immutable';

const initialState = fromJS({
})

function registerViewReducer(state = initialState, action) {
  switch(action.type){
    default:
      return state;
  }
}

export default registerViewReducer;
