export const LOGIN_VIEW_CHANGE = 'LOGIN_VIEW_CHANGE';

export function changeView(view) {

  return (dispatch) => {
    dispatch({ 
      type: LOGIN_VIEW_CHANGE,
      payload: view
    });
  }
}

const loginActions = {
  changeView,
};

export default loginActions;
