import { FORGOT_VIEW_CHANGE } from 'src/actions';

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
