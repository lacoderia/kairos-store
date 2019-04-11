import { fromJS, Map } from 'immutable';
import {
  ADD_PRODUCT_TO_CART,
  REMOVE_PRODUCT_FROM_CART,
  UPDATE_PRODUCT_QUANTITY,
} from './cartActions';

const initialState = fromJS({
  products: Map(),
});

function cartReducer(state = initialState, action) {
  switch(action.type){
    case ADD_PRODUCT_TO_CART:
      return state.merge({
        products: state.get('products').get(action.payload.id.toString()) ? 
          state.get('products').setIn([action.payload.id.toString(), 'quantity'], state.getIn(['products', action.payload.id.toString(), 'quantity']) + 1) : 
          state.get('products').set(action.payload.id.toString(), fromJS(action.payload)),
      })
    case REMOVE_PRODUCT_FROM_CART:
      return state.merge({
        products: state.get('products').delete(action.payload.toString()),
      })
    case UPDATE_PRODUCT_QUANTITY:
      return state.merge({
        products: state.get('products').setIn([action.payload.id.toString(), 'quantity'], action.payload.quantity),
      })
    default:
      return state;
  }
}

export default cartReducer;
