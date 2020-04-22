import { LOGIN_VIEW_CHANGE } from 'src/actions';

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
