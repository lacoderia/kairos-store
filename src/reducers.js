import navigation from './components/navigation/navigationReducer';
import loginView from './views/login/loginViewReducer';
import login from './components/login/loginReducer';
import register from './components/register/registerReducer';
import forgot from './components/forgot/forgotReducer';
import session from './http/sessionReducer';
import orders from './components/orders/ordersReducer';
import address from './components/address/addressReducer';
import cards from './components/cards/cardsReducer';
import products from './components/shop/products/productsReducer';
import cart from './components/shop/cart/cartReducer';
import checkout from './components/shop/checkout/checkoutReducer';
import snackbars from './components/snackbars/snackbarsReducer';
import { reducer as reduxFormReducer } from 'redux-form/immutable';
import { combineReducers } from 'redux-immutable';

const reducers = combineReducers({
  navigation,
  loginView,
  login,
  register,
  forgot,
  session,
  orders,
  address,
  cards,
  products,
  cart,
  checkout,
  snackbars,
  form: reduxFormReducer,
});

export default reducers;
