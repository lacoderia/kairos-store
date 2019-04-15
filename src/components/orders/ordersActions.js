import axios from 'axios';
import ordersMock from './ordersMock';
import { arrayToHash } from '../../common/commonFunctions';
import { IMAGE_URL_ROOT } from '../../common/constants';

export const GET_ORDERS_FETCH = 'GET_ORDERS_FETCH';
export const GET_ORDERS_SUCCESS = 'GET_ORDERS_SUCCESS';
export const GET_ORDERS_ERROR = 'GET_ORDERS_ERROR';

function toJSObject(item) {

  const result = {
    id: item.id,
    number: item.number,
    status: item.status,
    total: item.total,
    createdAt: item.created_at,
    volume: item.volume,
    products: [],
    shippingAddress: {
      id: item.shipping_address.id,
      name: item.shipping_address.name,
      address: item.shipping_address.address,
      city: item.shipping_address.city,
      state: item.shipping_address.state,
      zip: item.shipping_address.zip,
      country: item.shipping_address.country,
    },
    paymentMethod: item.payment_method,
  }

  item.products && item.products.map(product => {
    result.products.push({
      id: product.id,
      picture: IMAGE_URL_ROOT + product.picture,
      name: product.name,
      quantity: product.quantity,
      price: product.price,
    });
  })

  return result;
}

function toJSArray(items) {
  const result = [];
  items.map(item => {
    result.push(toJSObject(item));
  })
  return result;
}

export function getOrders() {
  return (dispatch) => {
    dispatch({ 
      type: GET_ORDERS_FETCH,
    });
    return axios.get('/orders')
    .then(response => {
      dispatch({ 
        type: GET_ORDERS_SUCCESS,
        payload: arrayToHash(toJSArray(response.data)),
      });
    })
    .catch(e => {
      dispatch({ 
        type: GET_ORDERS_ERROR, 
        payload: "Ocurrió un error al obtener los pedidos. Por favor intenta más tarde.",
      });
      throw e;
    })
  }
}

export function getOrdersMock() {
  return (dispatch) => {
    dispatch({ 
      type: GET_ORDERS_SUCCESS,
      payload: arrayToHash(toJSArray(ordersMock)),
    });
  }
}

const ordersActions = {
  getOrders,
  getOrdersMock,
};

export default ordersActions;
