import axios from 'axios';
import session from 'http/session';
import { arrayToHash } from 'library/utils/functions';

import {
  GET_ADDRESSES_FETCH,
  GET_ADDRESSES_SUCCESS,
  GET_ADDRESSES_ERROR,
  ADD_ADDRESS_FETCH,
  ADD_ADDRESS_SUCCESS,
  ADD_ADDRESS_ERROR,
  UPDATE_ADDRESS_FETCH,
  UPDATE_ADDRESS_SUCCESS,
  UPDATE_ADDRESS_ERROR,
  DELETE_ADDRESS_FETCH,
  DELETE_ADDRESS_SUCCESS,
  DELETE_ADDRESS_ERROR,
  OPEN_ADDRESS_DIALOG,
  CLOSE_ADDRESS_DIALOG,
  EXIT_ADDRESS_DIALOG,
} from 'src/actions';

function toJSObject(address) {
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
  }
}

function toJSArray(addresses) {
  const result = [];
  addresses.map(address => {
    result.push(toJSObject(address));
  })
  return result;
}

export function getAddresses() {
  return (dispatch) => {
    dispatch({ 
      type: GET_ADDRESSES_FETCH,
    });
    return axios.get('/shipping_addresses/get_all_for_user')
    .then(response => {
      dispatch({ 
        type: GET_ADDRESSES_SUCCESS,
        payload: arrayToHash(toJSArray(response.data.shipping_addresses))
      });
    })
    .catch(e => {
      dispatch({ 
        type: GET_ADDRESSES_ERROR, 
        payload: "Ocurrió un error al obtener las direcciones. Por favor intenta más tarde."
      });
      throw e;
    })
  }
}

export function addAddress(values) {
  return (dispatch) => {
    dispatch({ 
      type: ADD_ADDRESS_FETCH,
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
          type: ADD_ADDRESS_SUCCESS,
          payload: toJSObject(response.data.shipping_address),
        });
        dispatch({ 
          type: CLOSE_ADDRESS_DIALOG,
        });
      })
      .catch(e => {
        dispatch({ 
          type: ADD_ADDRESS_ERROR, 
          payload: "Ocurrió un error al guardar tu dirección. Por favor intenta más tarde."
        });
        throw e;
      })
    });
  }
}

export function updateAddress(values) {
  return (dispatch) => {
    dispatch({ 
      type: UPDATE_ADDRESS_FETCH,
    });
    return axios.put(`/shipping_addresses/${values.get('id')}`, { 
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
      } 
    })
    .then(response => {
      dispatch({ 
        type: UPDATE_ADDRESS_SUCCESS,
        payload: toJSObject(response.data.shipping_address),
      });
      dispatch({ 
        type: CLOSE_ADDRESS_DIALOG,
      });
    })
    .catch(e => {
      dispatch({ 
        type: UPDATE_ADDRESS_ERROR, 
        payload: "Ocurrió un error al guardar tus cambios. Por favor intenta más tarde."
      });
      throw e;
    });
  }
}

export function deleteAddress(id) {
  return (dispatch) => {
    dispatch({
      type: DELETE_ADDRESS_FETCH,
    })
    return axios.post(`/shipping_addresses/${id}/deactivate`)
    .then(response => {
      dispatch({
        type: DELETE_ADDRESS_SUCCESS,
        payload: id,
      });
      dispatch({ 
        type: CLOSE_ADDRESS_DIALOG,
      });
    })
    .catch(e => {
      dispatch({
        type: DELETE_ADDRESS_ERROR,
        payload: "Ocurrió un error al eliminar la dirección. Por favor intenta más tarde."
      });
      throw e;
    });
  }
}

export function openDialog(dialog, selectedAddressId) {
  return (dispatch) => {
    dispatch({ 
      type: OPEN_ADDRESS_DIALOG, 
      payload: {
        dialog,
        selectedAddressId
      }
    });
  }
}

export function closeDialog() {
  return (dispatch) => {
    dispatch({ 
      type: CLOSE_ADDRESS_DIALOG,
    });
  }
}

export function exitDialog() {
  return (dispatch) => {
    dispatch({ 
      type: EXIT_ADDRESS_DIALOG,
    });
  }
}

const addressActions = {
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  openDialog,
  closeDialog,
  exitDialog,
};

export default addressActions;
