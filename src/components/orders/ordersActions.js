import axios from 'axios';
import { IMAGE_URL_ROOT } from '../../common/constants';

export const GET_ORDERS_FETCH = 'GET_ORDERS_FETCH';
export const GET_ORDERS_SUCCESS = 'GET_ORDERS_SUCCESS';
export const GET_ORDERS_ERROR = 'GET_ORDERS_ERROR';

function toJSObject(item) {

  const result = {
    id: item.id,
    number: item.order_number,
    status: item.status,
    total: item.total_price,
    createdAt: item.created_at,
    volume: item.total_item_volume,
    products: [],
    shippingAddress: undefined,
    paymentMethod: item.payment_method,
  }

  item.shipping_address && (result.shippingAddress = {
    id: item.shipping_address.id,
    name: item.shipping_address.name,
    address: item.shipping_address.address,
    city: item.shipping_address.city,
    state: item.shipping_address.state,
    zip: item.shipping_address.zip,
    country: item.shipping_address.country,
  })
  
  item.items && item.items.map(product => {
    result.products.push({
      id: product.id,
      picture: IMAGE_URL_ROOT + product.image,
      name: product.name,
      quantity: product.amount,
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
    return axios.get('/orders/all')
    .then(response => {
      dispatch({ 
        type: GET_ORDERS_SUCCESS,
        payload: toJSArray(response.data.orders),
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

const ordersActions = {
  getOrders,
};

export default ordersActions;
