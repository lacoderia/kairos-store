import { TOGGLE_MENU } from 'src/actions';

export function toggleMenu() {

  return (dispatch) => {
    dispatch({ 
      type: TOGGLE_MENU,
    });
  }
}

const navigationActions = {
  toggleMenu
};

export default navigationActions;
