export const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART';
export const REMOVE_PRODUCT_FROM_CART = 'REMOVE_PRODUCT_FROM_CART';
export const UPDATE_PRODUCT_QUANTITY = 'UPDATE_PRODUCT_QUANTITY';

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

const cartActions = {
  addProductToCart,
  removeProduct,
};

export default cartActions;
