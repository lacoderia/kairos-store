export const RESET_LOGIN_ERROR = 'RESET_LOGIN_ERROR';
export const LOGIN_VIEW_CHANGE = 'LOGIN_VIEW_CHANGE';

export function changeView(view) {

  return (dispatch) => {
    dispatch({ 
      type: LOGIN_VIEW_CHANGE,
      payload: view
    });
  }
}

export function resetError() {

  return (dispatch) => {
    dispatch({ 
      type: RESET_LOGIN_ERROR,
    });
  }
}

const loginActions = {
  resetError,
  changeView
};

export default loginActions;
