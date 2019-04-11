export const RESET_REGISTER_ERROR = 'RESET_REGISTER_ERROR';
export const REGISTER_VIEW_CHANGE = 'REGISTER_VIEW_CHANGE';

export function changeView(view) {

  return (dispatch) => {
    dispatch({ 
      type: REGISTER_VIEW_CHANGE,
      payload: view
    });
  }
}

export function resetError() {

  return (dispatch) => {
    dispatch({ 
      type: RESET_REGISTER_ERROR,
    });
  }
}

const registerActions = {
  resetError
};

export default registerActions;
