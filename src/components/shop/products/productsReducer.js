import { fromJS, Map } from 'immutable';
import {
  GET_PRODUCTS_FETCH,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  OPEN_PRODUCT_DIALOG,
  CLOSE_PRODUCT_DIALOG,
  EXIT_PRODUCT_DIALOG,
} from './productsActions';

const initialState = fromJS({
  loading: false,
  error: '',
  products: Map(),
  selectedProduct: null,
  openDialog: false,
});

function productsReducer(state = initialState, action) {
  switch(action.type){
    case GET_PRODUCTS_FETCH:
      return state.merge({
        loading: true,
        error: initialState.get('error'),
        products: initialState.get('products'),
      })
    case GET_PRODUCTS_SUCCESS:
      return state.merge({
        loading: initialState.get('loading'),
        products: fromJS(action.payload),
      })
    case GET_PRODUCTS_ERROR:
      return state.merge({
        loading: initialState.get('loading'),
        error: action.payload,
      })
    case OPEN_PRODUCT_DIALOG:
      return state.merge({
        openDialog: true,
        selectedProduct: state.get('products').get(action.payload.toString()),
      })
    case CLOSE_PRODUCT_DIALOG:
      return state.merge({
        openDialog: initialState.get('openDialog'),
      })
    case EXIT_PRODUCT_DIALOG:
      return state.merge({
        selectedProduct: initialState.get('selectedProduct'),
      })
    default:
      return state;
  }
}

export default productsReducer;
