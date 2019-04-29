export const REGISTER_VIEW_CHANGE = 'REGISTER_VIEW_CHANGE';

export function changeView(view) {

  return (dispatch) => {
    dispatch({ 
      type: REGISTER_VIEW_CHANGE,
      payload: view
    });
  }
}

const registerActions = {
  changeView,
};

export default registerActions;
