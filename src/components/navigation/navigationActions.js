export const TOGGLE_MENU = 'TOGGLE_MENU';

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
