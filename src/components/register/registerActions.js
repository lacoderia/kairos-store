import { REGISTER_VIEW_CHANGE } from 'src/actions';

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
