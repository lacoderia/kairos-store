import { fromJS, List } from 'immutable';
import {
  GET_ORDERS_FETCH,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_ERROR,
} from 'src/actions';

const initialState = fromJS({
  loading: false,
  error: '',
  orders: List(),
});

function ordersReducer(state = initialState, action) {
  switch(action.type){
    case GET_ORDERS_FETCH:
      return state.merge({
        loading: true,
        error: initialState.get('error'),
        orders: initialState.get('orders'),
      })
    case GET_ORDERS_SUCCESS:
      return state.merge({
        loading: initialState.get('loading'),
        orders: fromJS(action.payload),
      })
    case GET_ORDERS_ERROR:
      return state.merge({
        loading: initialState.get('loading'),
        error: action.payload,
      })
    default:
      return state;
  }
}

export default ordersReducer;
