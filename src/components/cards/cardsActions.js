import axios from 'axios';
import { arrayToHash } from 'library/utils/functions';
import openpayService from 'services/openpay';
import storeService from 'services/store';

import {
  GET_CARDS_FETCH,
  GET_CARDS_SUCCESS,
  GET_CARDS_ERROR,
  ADD_CARD_FETCH,
  ADD_CARD_SUCCESS,
  ADD_CARD_ERROR,
  DELETE_CARD_FETCH,
  DELETE_CARD_SUCCESS,
  DELETE_CARD_ERROR,
  SET_PRIMARY_CARD_SUCCESS,
  OPEN_CARDS_DIALOG,
  CLOSE_CARDS_DIALOG,
  EXIT_CARDS_DIALOG,
} from 'src/actions';

function toJSObject(item) {
  return {
    id: item.id,
    name: item.holder_name,
    cardNumber: item.card_number,
    expiration: item.expiration,
    brand: item.brand,
    primary: item.primary,
  }
}

function toJSArray(items) {
  const result = [];
  items.map(item => {
    result.push(toJSObject(item));
  })
  return result;
}

export function getCards() {
  return (dispatch) => {
    dispatch({ 
      type: GET_CARDS_FETCH,
    });
    return axios.get('/cards/all')
    .then(response => {
      dispatch({ 
        type: GET_CARDS_SUCCESS,
        payload: arrayToHash(toJSArray(response.data.cards)),
      });
    })
    .catch(e => {
      dispatch({ 
        type: GET_CARDS_ERROR,
        payload: e.response ? e.response.data.errors[0].title : "Ocurrió un error al obtener las tarjetas. Por favor intenta más tarde.",
      });
      throw e;
    })
  }
}

export function addCard(values) {
  return (dispatch) => {
    dispatch({
      type: ADD_CARD_FETCH,
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
              type: ADD_CARD_SUCCESS,
              payload: toJSObject(response.data.card),
            });
            dispatch({ 
              type: CLOSE_CARDS_DIALOG,
            });
            resolve(response);
          })
          .catch(e => {
            dispatch({ 
              type: ADD_CARD_ERROR,
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

export function deleteCard(id) {
  return (dispatch) => {
    dispatch({
      type: DELETE_CARD_FETCH,
    })
    return axios.post('/cards/delete/', {
      id: id,
      company: storeService.getStore(),
    })
    .then(response => {
      dispatch({
        type: DELETE_CARD_SUCCESS,
        payload: arrayToHash(toJSArray(response.data.cards)),
      });
      dispatch({ 
        type: CLOSE_CARDS_DIALOG,
      });
    })
    .catch(e => {
      dispatch({
        type: DELETE_CARD_ERROR,
        payload: e.response ? e.response.data.errors[0].title : "Ocurrió un error al eliminar la tarjeta. Por favor intenta más tarde.",
      });
      throw e;
    });
  }
}

export function setPrimaryCard(id) {
  return (dispatch) => {
    return axios.post('/cards/set_primary/', {
      id: id,
      company: storeService.getStore(),
    })
    .then(response => {
      dispatch({
        type: SET_PRIMARY_CARD_SUCCESS,
        payload: response.data.card.id,
      });
    })
    .catch(e => {
      throw e;
    });
  }
}

export function openDialog(dialog, selectedCardId) {
  return (dispatch) => {
    dispatch({ 
      type: OPEN_CARDS_DIALOG, 
      payload: {
        dialog,
        selectedCardId
      }
    });
  }
}

export function closeDialog() {
  return (dispatch) => {
    dispatch({ 
      type: CLOSE_CARDS_DIALOG,
    });
  }
}

export function exitDialog() {
  return (dispatch) => {
    dispatch({ 
      type: EXIT_CARDS_DIALOG,
    });
  }
}

const cardsActions = {
  getCards,
  addCard,
  deleteCard,
  setPrimaryCard,
  openDialog,
  closeDialog,
  exitDialog,
};

export default cardsActions;
