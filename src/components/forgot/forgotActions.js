export const RESET_FORGOT_ERROR = 'RESET_FORGOT_ERROR';
export const FORGOT_VIEW_CHANGE = 'FORGOT_VIEW_CHANGE';

export function changeView(view) {

  return (dispatch) => {
    dispatch({ 
      type: FORGOT_VIEW_CHANGE,
      payload: view
    });
  }
}

export function resetError() {

  return (dispatch) => {
    dispatch({ 
      type: RESET_FORGOT_ERROR,
    });
  }
}

const forgotActions = {
  changeView,
  resetError
};

export default forgotActions;
