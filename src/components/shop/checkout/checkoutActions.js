import axios from 'axios';
import session from 'http/session';
import openpayService from 'services/openpay';
import storeService from 'services/store';
import { arrayToHash } from 'library/utils/functions';
import { STORE_PICKUP_ADDRESS } from 'res/constants';

import {
  GET_CHECKOUT_ADDRESSES_FETCH,
  GET_CHECKOUT_ADDRESSES_SUCCESS,
  GET_CHECKOUT_ADDRESSES_ERROR,
  ADD_CHECKOUT_ADDRESS_FETCH,
  ADD_CHECKOUT_ADDRESS_SUCCESS,
  ADD_CHECKOUT_ADDRESS_ERROR,
  CHANGE_CHECKOUT_ADDRESS,
  GET_SHIPPING_COST_FETCH,
  GET_SHIPPING_COST_SUCCESS,
  GET_SHIPPING_COST_ERROR,
  GET_CHECKOUT_CARDS_FETCH,
  GET_CHECKOUT_CARDS_SUCCESS,
  GET_CHECKOUT_CARDS_ERROR,
  ADD_CHECKOUT_CARD_FETCH,
  ADD_CHECKOUT_CARD_SUCCESS,
  ADD_CHECKOUT_CARD_ERROR,
  CHANGE_CHECKOUT_CARD,
  CHANGE_ACTIVE_SECTION,
  OPEN_CHECKOUT_DIALOG,
  CLOSE_CHECKOUT_DIALOG,
  EXIT_CHECKOUT_DIALOG,
  PLACE_ORDER_FETCH,
  PLACE_ORDER_ERROR,
  CONFIRM_ORDER_FETCH,
  CONFIRM_ORDER_SUCCESS,
  CONFIRM_ORDER_ERROR,
} from 'src/actions';

function toAddressObject(address) {
  return {
    id: address.id,
    name: address.name,
    address: address.address,
    streets: address.between_streets,
    reference: address.reference,
    city: address.city,
    state: address.state,
    zip: address.zip,
    country: address.country,
    phone: address.phone,
    primary: address.primary,
  }
}

function toAddressArray(addresses) {
  const result = [];
  result.push(STORE_PICKUP_ADDRESS);
  addresses.map(address => {
    result.push(toAddressObject(address));
  })
  return result;
}

function toCardObject(item) {
  return {
    id: item.openpay_id,
    name: item.holder_name,
    cardNumber: item.card_number,
    expiration: item.expiration,
    brand: item.brand,
    primary: item.primary,
  }
}

function toCardArray(items) {
  const result = [];
  items.map(item => {
    result.push(toCardObject(item));
  })
  return result;
}

export function changeActiveSection(section) {
  return (dispatch) => {
    dispatch({
      type: CHANGE_ACTIVE_SECTION,
      payload: section,
    });
  }
}

export function getAddresses() {
  return (dispatch) => {
    dispatch({ 
      type: GET_CHECKOUT_ADDRESSES_FETCH,
    });
    return axios.get('/shipping_addresses/get_all_for_user')
    .then(response => {
      dispatch({ 
        type: GET_CHECKOUT_ADDRESSES_SUCCESS,
        payload: arrayToHash(toAddressArray(response.data.shipping_addresses))
      });
    })
    .catch(e => {
      dispatch({ 
        type: GET_CHECKOUT_ADDRESSES_ERROR, 
        payload: "Ocurrió un error al obtener las direcciones. Por favor intenta más tarde.",
      });
      throw e;
    })
  }
}

export function addAddress(values) {
  return (dispatch) => {
    dispatch({ 
      type: ADD_CHECKOUT_ADDRESS_FETCH,
    });
    return session.getIpInfo()
    .then(location => {

      axios.post('/shipping_addresses', { 
        shipping_address: {
          name: values.get('name'),
          address: values.get('address'),
          between_streets: values.get('streets'),
          reference: values.get('reference'),
          city: values.get('city'),
          state: values.get('state'),
          zip: values.get('zip'),
          country: values.get('country'),
          phone: values.get('phone'),
          location: location
        } 
      })
      .then(response => {
        dispatch({ 
          type: ADD_CHECKOUT_ADDRESS_SUCCESS,
          payload: toAddressObject(response.data.shipping_address),
        });
        dispatch({ 
          type: CLOSE_CHECKOUT_DIALOG,
        });
      })
      .catch(e => {
        dispatch({ 
          type: ADD_CHECKOUT_ADDRESS_ERROR, 
          payload: "Ocurrió un error al agregar la dirección. Por favor intenta más tarde.",
        });
        throw e;
      })
    });
  }
}

export function changeCheckoutAddress(id) {
  return (dispatch) => {
    dispatch({ 
      type: CHANGE_CHECKOUT_ADDRESS, 
      payload: id,
    });
  }
}

export function getShippingCost(shippingAddressId, productsMap) {
  return (dispatch) => {
    dispatch({ 
      type: GET_SHIPPING_COST_FETCH,
    });

    const productsIdArray = productsMap ? Object.keys(productsMap) : [];
    const products = [];

    productsIdArray.map(id => {
      products.push({
        id: id,
        amount: productsMap[id].quantity,
        price: productsMap[id].price,
      })
    })

    return axios.post('/orders/calculate_shipping_price', {
      shipping_address_id: shippingAddressId == 0 ? null : shippingAddressId,
      items: products
    })
    .then(response => {
      dispatch({ 
        type: GET_SHIPPING_COST_SUCCESS,
        payload: {
          cost: response.data.shipping_price,
          message: response.data.message,
        }
      });
    })
    .catch(e => {
      dispatch({ 
        type: GET_SHIPPING_COST_ERROR,
        payload: (e.response && e.response.data && e.response.data.errors) ? e.response.data.errors[0].title : "Ocurrió un error al obtener el costo del envío. Por favor intenta más tarde.",
      });
      throw e;
    })
  }
}

export function getCards() {
  return (dispatch) => {
    dispatch({ 
      type: GET_CHECKOUT_CARDS_FETCH,
    });
    return axios.get('/cards/all')
    .then(response => {
      dispatch({ 
        type: GET_CHECKOUT_CARDS_SUCCESS,
        payload: arrayToHash(toCardArray(response.data.cards))
      });
    })
    .catch(e => {
      dispatch({ 
        type: GET_CHECKOUT_CARDS_ERROR,
        payload: (e.response && e.response.data && e.response.data.errors) ? e.response.data.errors[0].title : "Ocurrió un error al obtener las tarjetas. Por favor intenta más tarde.",
      });
      throw e;
    })
  }
}

export function addCard(values) {
  return (dispatch) => {
    dispatch({
      type: ADD_CHECKOUT_CARD_FETCH,
    })

    const card = {
      "card_number": values.get('cardNumber'),
      "holder_name": values.get('name'),
      "expiration_month": values.get('validThrough').substr(0,2),
      "expiration_year": values.get('validThrough').substr(2,2),
      "cvv2": values.get('cvv'),
    };

    return new Promise( (resolve, reject) => {

      openpayService.OpenPay.token.create(card, 
        (response => {
          axios.post('/cards/create', {
            token: response.data.id,
            device_session_id: openpayService.deviceSessionId,
            company: storeService.getStore(),
          })
          .then(response => {
            dispatch({
              type: ADD_CHECKOUT_CARD_SUCCESS,
              payload: toCardObject(response.data.card),
            });
            dispatch({ 
              type: CLOSE_CHECKOUT_DIALOG,
            });
            resolve(response);
          })
          .catch(e => {
            dispatch({ 
              type: ADD_CHECKOUT_CARD_ERROR,
              payload: (e.response && e.response.data && e.response.data.errors) ? e.response.data.errors[0].title : "Ocurrió un error al guardar la tarjeta. Por favor intenta más tarde.",
            });
            reject(e);
          });
        
      }), (e) => {
        dispatch({
          type: ADD_CHECKOUT_CARD_ERROR,
          payload: "Por favor revisa que los datos de la tarjeta sean correctos."
        });
        reject(e);
      });
    
    })
  }
  
}

export function changeSelectedCard(id) {
  return (dispatch) => {
    dispatch({ 
      type: CHANGE_CHECKOUT_CARD, 
      payload: id,
    });
  }
}

export function placeOrder(shippingAddressId, cardId, productsMap, shippingCost) {
  return (dispatch) => {
    dispatch({
      type: PLACE_ORDER_FETCH,
    })

    const productsIdArray = productsMap ? Object.keys(productsMap) : [];
    const products = [];

    productsIdArray.map(id => {
      products.push({
        id: id,
        amount: productsMap[id].quantity,
        price: productsMap[id].price,
      })
    })

    return axios.post('/orders/validate_charge_and_redirect', {
        card_id: cardId, 
        shipping_address_id: shippingAddressId == 0 ? null : shippingAddressId, // puede ser null si es recolección en persona
        items: products,
        total: products.reduce((sum, item) => sum + (item.amount * item.price), 0) + shippingCost,
        device_session_id: openpayService.deviceSessionId,
        company: storeService.getStore(),
    })
    .then(response => {
      return response;
    })
    .catch(e => {
      const error = (e.response && e.response.data && e.response.data.errors) ? e.response.data.errors[0] : undefined;
      const errorText = error ? error.title : 'Ocurrió un error al procesar el pago. Por favor intenta nuevamente.';

      dispatch({
        type: PLACE_ORDER_ERROR,
        payload: errorText,
      });
      throw e;
    });
  }
}

export function confirmOrder(token) {
  return (dispatch) => {
    dispatch({
      type: CONFIRM_ORDER_FETCH,
    })

    return axios.post('/orders/verify_and_apply_fee', {
      openpay_id: token
    })
    .then(response => {
      dispatch({
        type: CONFIRM_ORDER_SUCCESS,
      });
      return response;
    })
    .catch(e => {
      const error = (e.response && e.response.data && e.response.data.errors) ? e.response.data.errors[0] : undefined;
      const errorText = error ? error.title : 'Ocurrió un error al confirmar la orden. Por favor intenta nuevamente.';

      dispatch({
        type: CONFIRM_ORDER_ERROR,
        payload: errorText,
      });
      throw e;
    });
  }
}

export function openDialog(dialog) {
  return (dispatch) => {
    dispatch({ 
      type: OPEN_CHECKOUT_DIALOG, 
      payload: dialog
    });
  }
}

export function closeDialog() {
  return (dispatch) => {
    dispatch({ 
      type: CLOSE_CHECKOUT_DIALOG,
    });
  }
}

export function exitDialog() {
  return (dispatch) => {
    dispatch({ 
      type: EXIT_CHECKOUT_DIALOG,
    });
  }
}

const checkoutActions = {
  changeActiveSection,
  getAddresses,
  addAddress,
  changeCheckoutAddress,
  getShippingCost,
  getCards,
  addCard,
  changeSelectedCard,
  placeOrder,
  confirmOrder,
  openDialog,
  closeDialog,
  exitDialog,
};

export default checkoutActions;
