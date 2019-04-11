import { fromJS } from 'immutable';
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
  SET_PRIMARY_CARD_FETCH,
  SET_PRIMARY_CARD_SUCCESS,
  SET_PRIMARY_CARD_ERROR,
  OPEN_CARDS_DIALOG,
  CLOSE_CARDS_DIALOG,
} from './cardsActions';

const initialState = fromJS({
  getCardsLoading: false,
  getCardsError: '',
  dialogLoading: false,
  dialogError: '',
  dialog: '',
  openDialog: false,
  selectedCardId: 0,
  cards: null,
});

function cardsReducer(state = initialState, action) {
  switch(action.type){
    case GET_CARDS_FETCH:
      return state.merge({
        getCardsLoading: true,
        getCardsError: '',
      })
    case GET_CARDS_SUCCESS:
      return state.merge({
        getCardsLoading: false,
        cards: fromJS(action.payload)
      })
    case GET_CARDS_ERROR:
      return state.merge({
        getCardsLoading: false,
        getCardsError: action.payload,
      })
    case ADD_CARD_FETCH:
      return state.merge({
        dialogLoading: true,
        dialogError: '',
      })
    case ADD_CARD_SUCCESS:
      return state.merge({
        dialogLoading: false,
        cards: state.get('cards').set(action.payload.id.toString(), fromJS(action.payload)),
      })
    case ADD_CARD_ERROR:
      return state.merge({
        dialogLoading: false,
        dialogError: action.payload,
      })
    case DELETE_CARD_FETCH:
      return state.merge({
        dialogLoading: true,
        dialogError: '',
      })
    case DELETE_CARD_SUCCESS:
      return state.merge({
        dialogLoading: true,
        cards: fromJS(action.payload)
      })
    case DELETE_CARD_ERROR:
      return state.merge({
        dialogLoading: false,
        dialogError: action.payload,
      })
    case SET_PRIMARY_CARD_SUCCESS:
      return state.merge({
        cards: state.get('cards').map(value => value.set('primary', false)).setIn([action.payload.toString(), 'primary'], true),
      })
    case OPEN_CARDS_DIALOG:
      return state.merge({
        dialogLoading: initialState.get('dialogLoading'),
        dialogError: initialState.get('dialogError'),
        dialog: action.payload.dialog,
        openDialog: true,
        selectedCardId: action.payload.selectedCardId,
      })
    case CLOSE_CARDS_DIALOG:
      return state.merge({
        dialogLoading: initialState.get('dialogLoading'),
        dialogError: initialState.get('dialogError'),
        openDialog: initialState.get('openDialog'),
        selectedCardId: initialState.get('selectedCardId'),
      })
    default:
      return state;
  }
}

export default cardsReducer;
