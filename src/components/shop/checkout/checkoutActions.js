import axios from 'axios';
import session from '../../../http/session';
import openpayService from '../../../services/openpay';
import { arrayToHash } from '../../../common/commonFunctions';

export const GET_CHECKOUT_ADDRESSES_FETCH = 'GET_CHECKOUT_ADDRESSES_FETCH';
export const GET_CHECKOUT_ADDRESSES_SUCCESS = 'GET_CHECKOUT_ADDRESSES_SUCCESS';
export const GET_CHECKOUT_ADDRESSES_ERROR = 'GET_CHECKOUT_ADDRESSES_ERROR';
export const ADD_CHECKOUT_ADDRESS_FETCH = 'ADD_CHECKOUT_ADDRESS_FETCH';
export const ADD_CHECKOUT_ADDRESS_SUCCESS = 'ADD_CHECKOUT_ADDRESS_SUCCESS';
export const ADD_CHECKOUT_ADDRESS_ERROR = 'ADD_CHECKOUT_ADDRESS_ERROR';
export const SELECT_CHECKOUT_ADDRESS = 'SELECT_CHECKOUT_ADDRESS';
export const GET_CHECKOUT_CARDS_FETCH = 'GET_CHECKOUT_CARDS_FETCH';
export const GET_CHECKOUT_CARDS_SUCCESS = 'GET_CHECKOUT_CARDS_SUCCESS';
export const GET_CHECKOUT_CARDS_ERROR = 'GET_CHECKOUT_CARDS_ERROR';
export const ADD_CHECKOUT_CARD_FETCH = 'ADD_CHECKOUT_CARD_FETCH';
export const ADD_CHECKOUT_CARD_SUCCESS = 'ADD_CHECKOUT_CARD_SUCCESS';
export const ADD_CHECKOUT_CARD_ERROR = 'ADD_CHECKOUT_CARD_ERROR';
export const UPDATE_SELECTED_CHECKOUT_CARD = 'UPDATE_SELECTED_CHECKOUT_CARD';
export const UPDATE_ACTIVE_SECTION = 'UPDATE_ACTIVE_SECTION';
export const OPEN_CHECKOUT_DIALOG = 'OPEN_CHECKOUT_DIALOG';
export const CLOSE_CHECKOUT_DIALOG = 'CLOSE_CHECKOUT_DIALOG';
export const PAY_FETCH = 'PAY_FETCH';
export const PAY_SUCCESS = 'PAY_SUCCESS';
export const PAY_ERROR = 'PAY_ERROR';

function toAddressObject(address) {
  return {
    id: address.id,
    name: address.name,
    address: address.address,
    city: address.city,
    state: address.state,
    zip: address.zip,
    country: address.country,
    primary: true,
  }
}

function toAddressArray(addresses) {
  const result = [];
  result.push({
    id: 0,
    name: 'Recoger en persona',
    address: 'Los productos se recogen con el staff de Futura Network',
    primary: false,
  });
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

export function updateActiveSection(section) {
  return (dispatch) => {
    dispatch({
      type: UPDATE_ACTIVE_SECTION,
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
          zip: values.get('zip'),
          city: values.get('city'),
          state: values.get('state'),
          country: values.get('country'),
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

export function selectCheckoutAddress(id) {
  return (dispatch) => {
    dispatch({ 
      type: SELECT_CHECKOUT_ADDRESS, 
      payload: id,
    });
  }
}

export function getCards() {
  return (dispatch) => {
    dispatch({ 
      type: GET_CHECKOUT_CARDS_FETCH,
    });
    return axios.get('/cards/all?company=omein')
    .then(response => {
      console.log(response.data.cards);
      dispatch({ 
        type: GET_CHECKOUT_CARDS_SUCCESS,
        payload: arrayToHash(toCardArray(response.data.cards))
      });
    })
    .catch(e => {
      dispatch({ 
        type: GET_CHECKOUT_CARDS_ERROR,
        payload: e.response ? e.response.data.errors[0].title : "Ocurrió un error al obtener las tarjetas. Por favor intenta más tarde.",
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
            company: 'OMEIN',
          })
          .then(response => {
            dispatch({
              type: ADD_CHECKOUT_CARD_SUCCESS,
              payload: toJSObject(response.data.card),
            });
            dispatch({ 
              type: CLOSE_CARDS_DIALOG,
            });
            resolve(response);
          })
          .catch(e => {
            dispatch({ 
              type: ADD_CHECKOUT_CARD_ERROR,
              payload: e.response ? e.response.data.errors[0].title : "Ocurrió un error al guardar la tarjeta. Por favor intenta más tarde.",
            });
            reject(e);
          });
        
      }), (e) => {
        dispatch({
          type: ADD_CARD_ERROR,
          payload: "Por favor revisa que los datos de la tarjeta sean correctos."
        });
        reject(e);
      });
    
    })
  }
  
}

export function updateSelectedCard(id) {
  return (dispatch) => {
    dispatch({ 
      type: UPDATE_SELECTED_CHECKOUT_CARD, 
      payload: id,
    });
  }
}

export function placeOrder(addressId, cardId, productsMap) {
  return (dispatch) => {
    const productsIdArray = productsMap ? Object.keys(productsMap) : [];
    const products = [];

    productsIdArray.map(id => {
      products.push({
        id: id,
        amount: productsMap[id].quantity,
        price: productsMap[id].price,
      })
    })

    dispatch({
      type: PAY_FETCH,
    })
    
    return axios.post('/orders/create_with_items', {
        card_id: cardId, 
        shipping_address_id: addressId, // puede ser null si es recolección en persona
        items: products,
        total: products.reduce((sum, item) => sum + (item.amount * item.price), 0),
        device_session_id: openpayService.deviceSessionId,
        company: 'OMEIN'
    })
    .then(response => {
      dispatch({
        type: PAY_SUCCESS,
      });
      return response;
    })
    .catch(e => {
      const error = (e.response && e.response.data && e.response.data.errors) ? e.response.data.errors[0] : undefined;
      const errorText = error ? error.title : 'Ocurrió un error al procesar el pago. Por favor intenta nuevamente.';

      dispatch({
        type: PAY_ERROR,
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

const checkoutActions = {
  updateActiveSection,
  getAddresses,
  addAddress,
  selectCheckoutAddress,
  getCards,
  addCard,
  updateSelectedCard,
  openDialog,
  closeDialog,
};

export default checkoutActions;
