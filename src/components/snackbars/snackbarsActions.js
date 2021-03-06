import {
  OPEN_SNACKBAR,
  CLOSE_SNACKBAR,
  EXIT_SNACKBAR,
} from 'src/actions';

export function openSnackbar(snackbar) {
  return (dispatch) => {
    dispatch({ 
      type: OPEN_SNACKBAR,
      payload: snackbar,
    });
  }
}

export function closeSnackbar() {
  return (dispatch) => {
    dispatch({ 
      type: CLOSE_SNACKBAR,
    });
  }
}

export function exitSnackbar() {
  return (dispatch) => {
    dispatch({ 
      type: EXIT_SNACKBAR,
    });
  }
}

const snackbarsActions = {
  openSnackbar,
  closeSnackbar,
  exitSnackbar,
};

export default snackbarsActions;
