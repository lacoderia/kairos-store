export const SET_STORE_NAME = 'SET_STORE_NAME';

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
