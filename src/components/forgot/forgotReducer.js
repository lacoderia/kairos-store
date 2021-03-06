import { fromJS } from 'immutable';
import views from './forgotConstants';
import {
  PASSWORD_RECOVERY_FETCH,
  PASSWORD_RECOVERY_SUCCESS,
  PASSWORD_RECOVERY_ERROR,
  PASSWORD_RESET_FETCH,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_ERROR,
  FORGOT_VIEW_CHANGE,
} from 'src/actions';

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
        error: initialState.get('error'),
      })
    case PASSWORD_RECOVERY_SUCCESS: 
      return state.merge({
        loading: initialState.get('loading'),
        view: views.RECOVER_PASSWORD_INSTRUCTIONS_VIEW,
        title: 'Correo enviado',
      })
    case PASSWORD_RECOVERY_ERROR: 
      return state.merge({
        loading: initialState.get('loading'),
        error: action.payload,
      })
    case PASSWORD_RESET_FETCH: 
      return state.merge({
        loading: true,
        error: initialState.get('error'),
      })
    case PASSWORD_RESET_SUCCESS: 
      return state.merge({
        loading: initialState.get('loading'),
        view: views.RESET_PASSWORD_INSTRUCTIONS_VIEW,
        title: 'Contraseña actualizada',
      })
    case PASSWORD_RESET_ERROR: 
      return state.merge({
        loading: initialState.get('loading'),
        error: action.payload,
      })
    case FORGOT_VIEW_CHANGE:
      return state.merge({
        view: action.payload.view,
        title: action.payload.title,
        error: initialState.get('error'),
      })
    default:
      return state;
  }
}

export default forgotReducer;
