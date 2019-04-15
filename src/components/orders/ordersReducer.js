import { fromJS, Map } from 'immutable';
import {
  GET_ORDERS_FETCH,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_ERROR,
} from './ordersActions';

const initialState = fromJS({
  loading: false,
  error: '',
  orders: Map(),
});

function ordersReducer(state = initialState, action) {
  switch(action.type){
    case GET_ORDERS_FETCH:
      return state.merge({
        loading: true,
        error: '',
      })
    case GET_ORDERS_SUCCESS:
      return state.merge({
        loading: false,
        orders: fromJS(action.payload),
      })
    case GET_ORDERS_ERROR:
      return state.merge({
        loading: false,
        error: action.payload,
      })
    default:
      return state;
  }
}

export default ordersReducer;
