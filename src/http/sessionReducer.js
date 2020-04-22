import { fromJS } from 'immutable';
import {
  LOGIN_SUCCESS,
  SIGNOUT_SUCCESS,
} from 'src/actions';

const initialState = fromJS({
  isAuthenticated: false,
  id: '',
  email: '',
  name: '',
  lastname: '',
  phone: '',
  externalId: '',
});

function sessionReducer(state = initialState, action) {
  switch(action.type){
    case LOGIN_SUCCESS:
      return state.merge({
        isAuthenticated: true,
        id: action.payload.user.id,
        email: action.payload.user.email,
        name: action.payload.user.first_name,
        lastname: action.payload.user.last_name,
        phone: action.payload.user.phone,
        externalId: action.payload.user.external_id,
      });
    case SIGNOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
}

export default sessionReducer;
