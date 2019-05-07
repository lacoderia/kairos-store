import './stylesInstaller';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import axios from 'axios';
import { API_ROOT } from './common/constants';
import Moment from 'react-moment';

import App from './app';

axios.defaults.baseURL = API_ROOT;

Moment.globalLocale = 'es_MX';

render(
  <Provider store={store}>
    <Router basename="/">
      <App />
    </Router>
  </Provider>, 
  document.getElementById('root'));

