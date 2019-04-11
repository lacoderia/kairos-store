import { fromJS } from 'immutable';
import views from './forgotConstants';
import {
  PASSWORD_RECOVERY_FETCH,
  PASSWORD_RECOVERY_SUCCESS,
  PASSWORD_RECOVERY_ERROR,
  PASSWORD_RESET_FETCH,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_ERROR
} from '../../http/sessionActions';
import {
  FORGOT_VIEW_CHANGE,
  RESET_FORGOT_ERROR,
} from './forgotActions';

const initialState = fromJS({
  loading: false,
  error: '',
  view: views.RECOVER_PASSWORD_FORM_VIEW,
  title: 'Recuperar contraseña'
})

function forgotReducer(state = initialState, action) {
  switch(action.type){
    case PASSWORD_RECOVERY_FETCH: 
      return state.merge({
        loading: true,
        error: '',
      })
    case PASSWORD_RECOVERY_SUCCESS: 
      return state.merge({
        loading: false,
        view: views.RECOVER_PASSWORD_INSTRUCTIONS_VIEW,
        title: 'Correo enviado',
      })
    case PASSWORD_RECOVERY_ERROR: 
      return state.merge({
        loading: false,
        error: action.payload,
      })
    case PASSWORD_RESET_FETCH: 
      return state.merge({
        loading: true,
        error: '',
      })
    case PASSWORD_RESET_SUCCESS: 
      return state.merge({
        loading: false,
        view: views.RESET_PASSWORD_INSTRUCTIONS_VIEW,
        title: 'Contraseña actualizada',
      })
    case PASSWORD_RESET_ERROR: 
      return state.merge({
        loading: false,
        error: action.payload,
      })
    case FORGOT_VIEW_CHANGE:
      return state.merge({
        view: action.payload.view,
        title: action.payload.title,
      })
    case RESET_FORGOT_ERROR:
      return state.set('error', '')
    default:
      return state;
  }
}

export default forgotReducer;
