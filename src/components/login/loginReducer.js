import { fromJS } from 'immutable';
import views from './loginConstants';
import {
  LOGIN_FETCH,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGIN_CONFIRMATION_ERROR,
  RESEND_CONFIRMATION_EMAIL_FETCH,
  RESEND_CONFIRMATION_EMAIL_SUCCESS,
  RESEND_CONFIRMATION_EMAIL_ERROR,
  LOGIN_VIEW_CHANGE,
} from 'src/actions';

const initialState = fromJS({
  loading: false,
  error: '',
  view: views.LOGIN_FORM_VIEW,
  title: 'Bienvenido',
})

function loginReducer(state = initialState, action) {
  switch(action.type){
    case LOGIN_FETCH: 
      return state.merge({
        loading: true,
        error: initialState.get('error'),
      })
    case LOGIN_SUCCESS: 
      return state.set('loading', false)
    case LOGIN_ERROR: 
      return state.merge({
        loading: initialState.get('loading'),
        error: action.payload,
      })
    case LOGIN_CONFIRMATION_ERROR: 
      return state.merge({
        loading: initialState.get('loading'),
        view: views.CONFIRM_EMAIL_ERROR_VIEW,
        title: 'Confirma tu correo electrónico',
      })
    case RESEND_CONFIRMATION_EMAIL_FETCH:
      return state.merge({
        loading: true,
        error: initialState.get('error'),
      })
    case RESEND_CONFIRMATION_EMAIL_SUCCESS:
      return state.merge({
        loading: initialState.get('loading'),
        view: views.CONFIRM_EMAIL_INTRUCTIONS_VIEW,
        title: 'Correo enviado',
      })
    case RESEND_CONFIRMATION_EMAIL_ERROR:
      return state.merge({
        loading: initialState.get('loading'),
        error: action.payload,
      })
    case LOGIN_VIEW_CHANGE:
      return state.merge({
        view: action.payload.view,
        title: action.payload.title,
        error: initialState.get('error'),
      })
    default:
      return state;
  }
}

export default loginReducer;
