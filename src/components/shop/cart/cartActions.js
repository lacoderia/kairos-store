export const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART';
export const REMOVE_PRODUCT_FROM_CART = 'REMOVE_PRODUCT_FROM_CART';
export const UPDATE_PRODUCT_QUANTITY = 'UPDATE_PRODUCT_QUANTITY';
export const UPDATE_PRODUCT_DISPLAY_QUANTITY = 'UPDATE_PRODUCT_DISPLAY_QUANTITY';
export const RESET_PRODUCT_QUANTITY = 'RESET_PRODUCT_QUANTITY';

export function addProductToCart(product) {
  return (dispatch) => {
    dispatch({ 
      type: ADD_PRODUCT_TO_CART,
      payload: product,
    });
  }
}

export function removeProduct(id) {
  return (dispatch) => {
    dispatch({ 
      type: REMOVE_PRODUCT_FROM_CART,
      payload: id,
    });
  }
}

export function updateProductQuantity(id, quantity) {
  return (dispatch) => {
    dispatch({ 
      type: UPDATE_PRODUCT_QUANTITY,
      payload: {
        id,
        quantity,
      }
    });
  }
}

export function updateProductDisplayQuantity(id, quantity) {
  return (dispatch) => {
    dispatch({ 
      type: UPDATE_PRODUCT_DISPLAY_QUANTITY,
      payload: {
        id,
        quantity,
      }
    });
  }
}

export function resetProductQuantity(id) {
  return (dispatch) => {
    dispatch({
      type: RESET_PRODUCT_QUANTITY,
      payload: id,
    });
  }
}

const cartActions = {
  addProductToCart,
  removeProduct,
  updateProductQuantity,
  updateProductDisplayQuantity,
  resetProductQuantity,
};

export default cartActions;
