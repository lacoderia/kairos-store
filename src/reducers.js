import navigation from './components/navigation/navigationReducer';
import loginView from './views/login/loginViewReducer';
import login from './components/login/loginReducer';
import registerView from './views/register/registerViewReducer';
import register from './components/register/registerReducer';
import forgotView from './views/forgot/forgotViewReducer';
import forgot from './components/forgot/forgotReducer';
import session from './http/sessionReducer';
import dashboard from './components/dashboard/dashboardReducer';
import account from './components/account/accountReducer';
import address from './components/address/addressReducer';
import cards from './components/cards/cardsReducer';
import products from './components/shop/products/productsReducer';
import cart from './components/shop/cart/cartReducer';
import checkout from './components/shop/checkout/checkoutReducer';
import { reducer as reduxFormReducer } from 'redux-form/immutable';
import { combineReducers } from 'redux-immutable';

const reducers = combineReducers({
  navigation,
  loginView,
  login,
  registerView,
  register,
  forgotView,
  forgot,
  session,
  dashboard,
  account,
  address,
  cards,
  products,
  cart,
  checkout,
  form: reduxFormReducer,
});

export default reducers;
