import { fromJS } from 'immutable';
import { TOGGLE_MENU } from '../navigation/navigationActions';

const initialState = fromJS({
  mobileOpen: false
})

function navigationReducer(state = initialState, action) {
  switch(action.type){
    case TOGGLE_MENU: 
      return state.set('mobileOpen', !state.get('mobileOpen')) 
    default:
      return state;
  }
}

export default navigationReducer;
