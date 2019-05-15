import { fromJS, Set } from 'immutable';
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
  touchedSections: Set(),
  addresses: null,
  selectedShippingAddress: undefined,
  shippingCost: undefined,
  getShippingCostError: '',
  cards: null,
  selectedCard: undefined,
  loading: false,
  placeOrderError: '',
  confirmOrderError: '',
});

function checkoutReducer(state = initialState, action) {
  switch(action.type){
    case GET_CHECKOUT_ADDRESSES_FETCH:
      return state.merge({
        getAddressesLoading: true,
        getAddressesError: initialState.get('getAddressesError'),
        addresses: initialState.get('addresses'),
        selectedShippingAddress: initialState.get('selectedShippingAddress'),
        shippingCost: initialState.get('shippingCost'),
      })
    case GET_CHECKOUT_ADDRESSES_SUCCESS:
      return state.merge({
        getAddressesLoading: initialState.get('getAddressesLoading'),
        addresses: fromJS(action.payload),
        selectedShippingAddress: fromJS(action.payload).find(address => (address.get('primary') == true)),
      })
    case GET_CHECKOUT_ADDRESSES_ERROR:
      return state.merge({
        getAddressesLoading: initialState.get('getAddressesLoading'),
        getAddressesError: action.payload,
      })
    case ADD_CHECKOUT_ADDRESS_FETCH:
      return state.merge({
        dialogLoading: true,
        dialogError: initialState.get('dialogError'),
      })
    case ADD_CHECKOUT_ADDRESS_SUCCESS:
      return state.merge({
        dialogLoading: initialState.get('dialogLoading'),
        addresses: state.get('addresses').set(action.payload.id.toString(), action.payload),
        selectedShippingAddress: fromJS(action.payload),
      })
    case ADD_CHECKOUT_ADDRESS_ERROR:
      return state.merge({
        dialogLoading: initialState.get('dialogLoading'),
        dialogError: action.payload,
      })
    case CHANGE_CHECKOUT_ADDRESS:
      return state.merge({
        selectedShippingAddress: state.get('addresses').get(action.payload.toString()),
      })
    case GET_SHIPPING_COST_FETCH:
      return state.merge({
        loading: true,
        getShippingCostError: initialState.get('getShippingCostError'),
      })
    case GET_SHIPPING_COST_SUCCESS:
      return state.merge({
        loading: initialState.get('loading'),
        shippingCost: action.payload,
      })
    case GET_SHIPPING_COST_ERROR:
      return state.merge({
        loading: initialState.get('loading'),
        getShippingCostError: action.payload,
      })
    case GET_CHECKOUT_CARDS_FETCH:
      return state.merge({
        getCardsLoading: true,
        getCardsError: initialState.get('getCardsError'),
        cards: initialState.get('cards'),
        selectedCard: initialState.get('selectedCard'),
      })
    case GET_CHECKOUT_CARDS_SUCCESS:
      return state.merge({
        getCardsLoading: initialState.get('getCardsLoading'),
        cards: fromJS(action.payload),
        selectedCard: fromJS(action.payload).find(card => (card.get('primary') == true)),
      })
    case GET_CHECKOUT_CARDS_ERROR:
      return state.merge({
        getCardsLoading: initialState.get('getCardsLoading'),
        getCardsError: action.payload,
      })
    case ADD_CHECKOUT_CARD_FETCH:
      return state.merge({
        dialogLoading: true,
        dialogError: initialState.get('dialogError'),
      })
    case ADD_CHECKOUT_CARD_SUCCESS:
      return state.merge({
        dialogLoading: initialState.get('dialogLoading'),
        cards: state.get('cards').set(action.payload.id.toString(), action.payload),
        selectedCard: fromJS(action.payload),
      })
    case ADD_CHECKOUT_CARD_ERROR:
      return state.merge({
        dialogLoading: initialState.get('dialogLoading'),
        dialogError: action.payload,
      })
    case CHANGE_CHECKOUT_CARD:
      return state.merge({
        selectedCard: state.get('cards').get(action.payload.toString()),
      })
    case CHANGE_ACTIVE_SECTION:
      return state.merge({
        activeSection: action.payload,
        touchedSections: state.get('touchedSections').add(action.payload),
      })
    case PLACE_ORDER_FETCH:
      return state.merge({
        loading: true,
        placeOrderError: initialState.get('placeOrderError'),
      })
    case PLACE_ORDER_ERROR:
      return state.merge({
        loading: initialState.get('loading'),
        placeOrderError: action.payload,
      })
    case CONFIRM_ORDER_FETCH:
      return state.merge({
        loading: true,
        confirmOrderError: initialState.get('confirmOrderError'),
      })
    case CONFIRM_ORDER_SUCCESS:
      return state.merge({
        loading: initialState.get('loading'),
      })
    case CONFIRM_ORDER_ERROR:
      return state.merge({
        loading: initialState.get('loading'),
        confirmOrderError: action.payload,
      })
    case OPEN_CHECKOUT_DIALOG:
      return state.merge({
        dialogLoading: initialState.get('dialogLoading'),
        dialogError: initialState.get('dialogError'),
        dialog: action.payload,
        openDialog: true,
        placeOrderError: initialState.get('placeOrderError'),
      })
    case CLOSE_CHECKOUT_DIALOG:
      return state.merge({
        dialogLoading: initialState.get('dialogLoading'),
        dialogError: initialState.get('dialogError'),
        openDialog: initialState.get('openDialog'),
      })
    case EXIT_CHECKOUT_DIALOG:
      return state.merge({
        dialog: initialState.get('dialog'),
      })
    default:
      return state;
  }
}

export default checkoutReducer;
