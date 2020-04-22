import { fromJS } from 'immutable';
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

const initialState = fromJS({
  getAddressesLoading: false,
  getAddressesError: '',
  dialogLoading: false,
  dialogError: '',
  dialog: '',
  openDialog: false,
  selectedAddressId: 0,
  addresses: null
});

function addressReducer(state = initialState, action) {
  switch(action.type){
    case GET_ADDRESSES_FETCH:
      return state.merge({
        getAddressesLoading: true,
        getAddressesError: initialState.get('getAddressesError'),
        addresses: initialState.get('addresses'),
      })
    case GET_ADDRESSES_SUCCESS:
      return state.merge({
        getAddressesLoading: initialState.get('getAddressesLoading'),
        addresses: fromJS(action.payload)
      })
    case GET_ADDRESSES_ERROR:
      return state.merge({
        getAddressesLoading: initialState.get('getAddressesLoading'),
        getAddressesError: action.payload,
      })
    case ADD_ADDRESS_FETCH:
      return state.merge({
        dialogLoading: true,
        dialogError: initialState.get('dialogError'),
      })
    case ADD_ADDRESS_SUCCESS:
      return state.merge({
        dialogLoading: initialState.get('dialogLoading'),
        addresses: state.get('addresses').set(action.payload.id.toString(), action.payload),
      })
    case ADD_ADDRESS_ERROR:
      return state.merge({
        dialogLoading: initialState.get('dialogLoading'),
        dialogError: action.payload,
      })
    case UPDATE_ADDRESS_FETCH:
      return state.merge({
        dialogLoading: true,
        dialogError: initialState.get('dialogError'),
      })
    case UPDATE_ADDRESS_SUCCESS:
      return state.merge({
        dialogLoading: initialState.get('dialogLoading'),
        addresses: state.get('addresses').set(action.payload.id.toString(), action.payload),
      })
    case UPDATE_ADDRESS_ERROR:
      return state.merge({
        dialogLoading: initialState.get('dialogLoading'),
        dialogError: action.payload,
      })
    case DELETE_ADDRESS_FETCH:
      return state.merge({
        dialogLoading: true,
        dialogError: initialState.get('dialogError'),
      })
    case DELETE_ADDRESS_SUCCESS:
      return state.merge({
        dialogLoading: initialState.get('dialogLoading'),
        addresses: state.get('addresses').delete(action.payload.toString()),
      })
    case DELETE_ADDRESS_ERROR:
      return state.merge({
        dialogLoading: initialState.get('dialogLoading'),
        dialogError: action.payload,
      })
    case OPEN_ADDRESS_DIALOG:
      return state.merge({
        dialogLoading: initialState.get('dialogLoading'),
        dialogError: initialState.get('dialogError'),
        dialog: action.payload.dialog,
        openDialog: true,
        selectedAddressId: action.payload.selectedAddressId,
      })
    case CLOSE_ADDRESS_DIALOG:
      return state.merge({
        dialogLoading: initialState.get('dialogLoading'),
        dialogError: initialState.get('dialogError'),
        openDialog: initialState.get('openDialog'),
        selectedAddressId: initialState.get('selectedAddressId'),
      })
    case EXIT_ADDRESS_DIALOG:
      return state.merge({
        dialog: initialState.get('dialog'),
      })
    default:
      return state;
  }
}

export default addressReducer;
