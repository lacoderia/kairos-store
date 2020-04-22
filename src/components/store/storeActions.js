import { SET_STORE_NAME } from 'src/actions';

export function setStore(store) {
  return (dispatch) => {
    dispatch({ 
      type: SET_STORE_NAME, 
      payload: store
    });
  }
}

const storeActions = {
  setStore,
};

export default storeActions;
