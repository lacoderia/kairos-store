import { fromJS } from 'immutable';
import { SET_STORE_NAME } from 'src/actions';

const initialState = fromJS({
  store: '',
});

function storeReducer(state = initialState, action) {
  switch(action.type){
    case SET_STORE_NAME:
      return state.merge({
        store: action.payload,
      });
    default:
      return state;
  }
}

export default storeReducer;
