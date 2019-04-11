import { fromJS, Map } from 'immutable';
import {
  GET_CHECKOUT_ADDRESSES_FETCH,
  GET_CHECKOUT_ADDRESSES_SUCCESS,
  GET_CHECKOUT_ADDRESSES_ERROR,
  ADD_CHECKOUT_ADDRESS_FETCH,
  ADD_CHECKOUT_ADDRESS_SUCCESS,
  ADD_CHECKOUT_ADDRESS_ERROR,
  UPDATE_SELECTED_CHECKOUT_ADDRESS,
  GET_CHECKOUT_CARDS_FETCH,
  GET_CHECKOUT_CARDS_SUCCESS,
  GET_CHECKOUT_CARDS_ERROR,
  ADD_CHECKOUT_CARD_FETCH,
  ADD_CHECKOUT_CARD_SUCCESS,
  ADD_CHECKOUT_CARD_ERROR,
  UPDATE_SELECTED_CHECKOUT_CARD,
  UPDATE_ACTIVE_SECTION,
  OPEN_CHECKOUT_DIALOG,
  CLOSE_CHECKOUT_DIALOG
} from './checkoutActions';

const initialState = fromJS({
  getAddressesLoading: false,
  getAddressesError: '',
  getCardsLoading: false,
  getCardsError: '',
  dialogLoading: false,
  dialogError: '',
  dialog: '',
  openDialog: false,
  activeSection: undefined,
  addresses: null,
  selectedShippingAddress: undefined,
  cards: null,
  selectedCard: undefined,
});

function checkoutReducer(state = initialState, action) {
  switch(action.type){
    case GET_CHECKOUT_ADDRESSES_FETCH:
      return state.merge({
        getAddressesLoading: true,
        getAddressesError: '',
      })
    case GET_CHECKOUT_ADDRESSES_SUCCESS:
      return state.merge({
        getAddressesLoading: false,
        addresses: fromJS(action.payload),
        selectedShippingAddress: fromJS(action.payload).find(address => (address.get('primary') == true)),
      })
    case GET_CHECKOUT_ADDRESSES_ERROR:
      return state.merge({
        getAddressesLoading: false,
        getAddressesError: action.payload,
      })
    case ADD_CHECKOUT_ADDRESS_FETCH:
      return state.merge({
        dialogLoading: true,
        dialogError: '',
      })
    case ADD_CHECKOUT_ADDRESS_SUCCESS:
      return state.merge({
        dialogLoading: false,
        addresses: state.get('addresses').set(action.payload.id.toString(), action.payload),
        selectedShippingAddress: fromJS(action.payload),
      })
    case ADD_CHECKOUT_ADDRESS_ERROR:
      return state.merge({
        dialogLoading: false,
        dialogError: action.payload,
      })
    case UPDATE_SELECTED_CHECKOUT_ADDRESS:
      return state.merge({
        selectedShippingAddress: state.get('addresses').get(action.payload.toString()),
      })
    case GET_CHECKOUT_CARDS_FETCH:
      return state.merge({
        getCardsLoading: true,
        getCardsError: '',
      })
    case GET_CHECKOUT_CARDS_SUCCESS:
      return state.merge({
        getCardsLoading: false,
        cards: fromJS(action.payload),
        selectedCard: fromJS(action.payload).find(card => (card.get('primary') == true)),
      })
    case GET_CHECKOUT_CARDS_ERROR:
      return state.merge({
        getCardsLoading: false,
        getCardsError: action.payload,
      })
    case ADD_CHECKOUT_CARD_FETCH:
      return state.merge({
        dialogLoading: true,
        dialogError: '',
      })
    case ADD_CHECKOUT_CARD_SUCCESS:
      return state.merge({
        dialogLoading: false,
        cards: state.get('cards').set(action.payload.id.toString(), action.payload),
        selectedCard: fromJS(action.payload),
      })
    case ADD_CHECKOUT_CARD_ERROR:
      return state.merge({
        dialogLoading: false,
        dialogError: action.payload,
      })
    case UPDATE_SELECTED_CHECKOUT_CARD:
      return state.merge({
        selectedCard: state.get('cards').get(action.payload.toString()),
      })
    case UPDATE_ACTIVE_SECTION:
      return state.merge({
        activeSection: action.payload,
      })
    case OPEN_CHECKOUT_DIALOG:
      return state.merge({
        dialog: action.payload,
        openDialog: true,
      })
    case CLOSE_CHECKOUT_DIALOG:
      return state.merge({
        openDialog: initialState.get('openDialog'),
      })
    default:
      return state;
  }
}

export default checkoutReducer;
