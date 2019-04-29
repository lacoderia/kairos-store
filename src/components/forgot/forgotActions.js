export const FORGOT_VIEW_CHANGE = 'FORGOT_VIEW_CHANGE';

export function changeView(view) {

  return (dispatch) => {
    dispatch({ 
      type: FORGOT_VIEW_CHANGE,
      payload: view
    });
  }
}

const forgotActions = {
  changeView,
};

export default forgotActions;
