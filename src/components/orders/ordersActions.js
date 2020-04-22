import axios from 'axios';
import { IMAGE_URL_ROOT } from 'res/constants';

import {
  GET_ORDERS_FETCH,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_ERROR,
} from 'src/actions';

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
    streets: item.shipping_address.streets,
    reference: item.shipping_address.reference,
    city: item.shipping_address.city,
    state: item.shipping_address.state,
    zip: item.shipping_address.zip,
    country: item.shipping_address.country,
    phone: item.shipping_address.phone,
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
