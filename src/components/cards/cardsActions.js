import axios from 'axios';
import { arrayToHash } from '../../common/commonFunctions';
import openpayService from '../../services/openpay';

export const GET_CARDS_FETCH = 'GET_CARDS_FETCH';
export const GET_CARDS_SUCCESS = 'GET_CARDS_SUCCESS';
export const GET_CARDS_ERROR = 'GET_CARDS_ERROR';
export const ADD_CARD_FETCH = 'ADD_CARD_FETCH';
export const ADD_CARD_SUCCESS = 'ADD_CARD_SUCCESS';
export const ADD_CARD_ERROR = 'ADD_CARD_ERROR';
export const DELETE_CARD_FETCH = 'DELETE_CARD_FETCH';
export const DELETE_CARD_SUCCESS = 'DELETE_CARD_SUCCESS';
export const DELETE_CARD_ERROR = 'DELETE_CARD_ERROR';
export const SET_PRIMARY_CARD_FETCH = 'SET_PRIMARY_CARD_FETCH';
export const SET_PRIMARY_CARD_SUCCESS = 'SET_PRIMARY_CARD_SUCCESS';
export const SET_PRIMARY_CARD_ERROR = 'SET_PRIMARY_CARD_ERROR';
export const OPEN_CARDS_DIALOG = 'OPEN_CARDS_DIALOG';
export const CLOSE_CARDS_DIALOG = 'CLOSE_CARDS_DIALOG';

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
    return axios.get('/cards/all?company=OMEIN')
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
          console.log(response);
          
          axios.post('/cards/create', {
            token: response.data.id,
            device_session_id: openpayService.deviceSessionId,
            company: 'OMEIN',
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
      company: 'OMEIN',
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
    dispatch({
      type: SET_PRIMARY_CARD_FETCH,
    })
    return axios.post('/cards/set_primary/', {
      id: id,
      company: 'OMEIN',
    })
    .then(response => {
      dispatch({
        type: SET_PRIMARY_CARD_SUCCESS,
        payload: response.data.card.id,
      });
    })
    .catch(e => {
      dispatch({
        type: SET_PRIMARY_CARD_ERROR,
        payload: e.response ? e.response.data.errors[0].title : "Ocurrió un error al cambiar la tarjeta principal. Por favor intenta más tarde.",
      });
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

const cardsActions = {
  getCards,
  addCard,
  deleteCard,
  setPrimaryCard,
  openDialog,
  closeDialog,
};

export default cardsActions;
