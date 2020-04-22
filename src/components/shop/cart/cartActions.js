import {
  ADD_PRODUCT_TO_CART,
  REMOVE_PRODUCT_FROM_CART,
  UPDATE_PRODUCT_QUANTITY,
  UPDATE_PRODUCT_DISPLAY_QUANTITY,
  RESET_PRODUCT_QUANTITY,
} from 'src/actions';

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
