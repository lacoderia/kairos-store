import session from './session';

import {
  LOGIN_FETCH,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGIN_CONFIRMATION_ERROR,
  RESEND_CONFIRMATION_EMAIL_FETCH,
  RESEND_CONFIRMATION_EMAIL_SUCCESS,
  RESEND_CONFIRMATION_EMAIL_ERROR,
  REGISTER_FETCH,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  CONFIRM_REGISTRATION_FETCH,
  CONFIRM_REGISTRATION_SUCCESS,
  CONFIRM_REGISTRATION_ERROR,
  PASSWORD_RECOVERY_FETCH,
  PASSWORD_RECOVERY_SUCCESS,
  PASSWORD_RECOVERY_ERROR,
  PASSWORD_RESET_FETCH,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_ERROR,
  SIGNOUT_SUCCESS,
} from 'src/actions';

export function login(values) {

  return (dispatch) => {
    dispatch({ 
      type: LOGIN_FETCH,
    });
    return session.login(values)
    .then(response => {
      dispatch({ 
        type: LOGIN_SUCCESS,
        payload: response.data
      });
    })
    .catch(e => {
      dispatch({ 
        type: e.response?.data?.errors?.[0]?.id == "unconfirmed_email" ? LOGIN_CONFIRMATION_ERROR : LOGIN_ERROR, 
        payload: e.response?.data?.errors?.[0] ? e.response.data.errors[0].title : 'No se pudo iniciar tu sesión. Intenta nuevamente.',
      });
    })
  }
}

export function resendConfirmationEmail(email) {

  return (dispatch) => {
    dispatch({ 
      type: RESEND_CONFIRMATION_EMAIL_FETCH,
    });

    return session.resendConfirmationEmail(email)
    .then(response => {
      dispatch({ 
        type: RESEND_CONFIRMATION_EMAIL_SUCCESS,
      });
    })
    .catch(e => {
      dispatch({ 
        type: RESEND_CONFIRMATION_EMAIL_ERROR, 
        payload: 'Ocurrió un error al reenviar el correo. Por favor intenta nuevamente.'
      });
    });
  }
}

export function register(values) {

  return (dispatch) => {
    dispatch({ 
      type: REGISTER_FETCH,
    });

    return session.register(values)
    .then(response => {
      dispatch({ 
        type: REGISTER_SUCCESS,
        payload: response.data
      });
    })
    .catch(e => {
      dispatch({ 
        type: REGISTER_ERROR, 
        payload: e.response?.data?.errors?.[0] ? e.response.data.errors[0].title : 'Ocurrió un error al crear tu cuenta. Intenta nuevamente.',
      });
    });
  }
}

export function confirmRegistration(token) {

  return (dispatch) => {
    dispatch({ 
      type: CONFIRM_REGISTRATION_FETCH,
    });

    return session.confirmRegistration(token)
    .then(response => {
      dispatch({ 
        type: CONFIRM_REGISTRATION_SUCCESS,
      });
    })
    .catch(e => {
      dispatch({ 
        type: CONFIRM_REGISTRATION_ERROR, 
        payload: e.response?.data?.errors?.[0] ? e.response.data.errors[0].title : 'Ocurrió un error al confirmar tu cuenta. Intenta nuevamente.',
      });
    });
  }
}

export function recoverPassword(values) {

  return (dispatch) => {
    dispatch({ 
      type: PASSWORD_RECOVERY_FETCH,
    });
    return session.recoverPassword(values)
    .then(response => {
      dispatch({ 
        type: PASSWORD_RECOVERY_SUCCESS,
      });
    })
    .catch(e => {
      dispatch({ 
        type: PASSWORD_RECOVERY_ERROR, 
        payload: e.response?.data?.errors?.[0] ? e.response.data.errors[0].title : 'Ocurrió un error al enviar el correo. Intenta nuevamente.',
      });
    })
  }
}

export function resetPassword(values, token) {

  return (dispatch) => {
    dispatch({ 
      type: PASSWORD_RESET_FETCH,
    });
    return session.resetPassword(values, token)
    .then(response => {
      dispatch({ 
        type: PASSWORD_RESET_SUCCESS,
      });
    })
    .catch(e => {
      const error = e.response?.data?.errors?.[0];
      const errorText = error ? (error.id == 'reset_password_token' ? 'El token es inválido' : error.title) : 'Ocurrió un error al actualizar tu contraseña. Intenta nuevamente.';
      dispatch({ 
        type: PASSWORD_RESET_ERROR, 
        payload: errorText
      });
    })
  }
}

export function signout() {

  return (dispatch) => {
    return session.signout()
    .then(response => {
      dispatch({ 
        type: SIGNOUT_SUCCESS,
        payload: response.data
      });
    })
    .catch(e => {})
  }
}

export function getCurrentSession() {

  return (dispatch) => {
    return session.getCurrentSession()
    .then(response => {
      dispatch({ 
        type: LOGIN_SUCCESS,
        payload: response.data
      });
    })
    .catch(e => {})
  }
}

const sessionActions = {
  login,
  resendConfirmationEmail,
  register,
  confirmRegistration,
  recoverPassword,
  resetPassword,
  signout,
  getCurrentSession
};

export default sessionActions;
