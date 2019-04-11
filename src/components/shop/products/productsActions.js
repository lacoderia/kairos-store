import axios from 'axios';
import productsMock from './productsMock';
import { arrayToHash } from '../../../common/commonFunctions';

export const GET_PRODUCTS_FETCH = 'GET_PRODUCTS_FETCH';
export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS';
export const GET_PRODUCTS_ERROR = 'GET_PRODUCTS_ERROR';
export const OPEN_PRODUCT_DIALOG = 'OPEN_PRODUCT_DIALOG';
export const CLOSE_PRODUCT_DIALOG = 'CLOSE_PRODUCT_DIALOG';
export const EXIT_PRODUCT_DIALOG = 'EXIT_PRODUCT_DIALOG';

function toJSObject(item) {

  const result = {
    id: item.id,
    title: item.title,
    description: item.description,
    price: item.price,
    picture: item.picture,
  }

  return result;
}

function toJSArray(items) {
  const result = [];
  items.map(item => {
    result.push(toJSObject(item));
  })
  return result;
}

export function getProducts() {
  return (dispatch) => {
    dispatch({ 
      type: GET_PRODUCTS_FETCH,
    });
    return axios.get('/products')
    .then(response => {
      dispatch({ 
        type: GET_PRODUCTS_SUCCESS,
        payload: arrayToHash(toJSArray(response.data)),
      });
    })
    .catch(e => {
      dispatch({ 
        type: GET_PRODUCTS_ERROR, 
        payload: "Ocurrió un error al obtener los productos. Por favor intenta más tarde.",
      });
      throw e;
    })
  }
}

export function getProductsMock() {
  return (dispatch) => {
    dispatch({ 
      type: GET_PRODUCTS_SUCCESS,
      payload: arrayToHash(toJSArray(productsMock)),
    });
  }
}

export function openProductDialog(id) {
  return (dispatch) => {
    dispatch({
      type: OPEN_PRODUCT_DIALOG,
      payload: id,
    })
  }
}

export function closeProductDialog() {
  return (dispatch) => {
    dispatch({
      type: CLOSE_PRODUCT_DIALOG,
    })
  }
}

export function exitProductDialog() {
  return (dispatch) => {
    dispatch({
      type: EXIT_PRODUCT_DIALOG,
    })
  }
}

const productsActions = {
  getProducts,
  getProductsMock,
  openProductDialog,
  closeProductDialog,
  exitProductDialog,
};

export default productsActions;
