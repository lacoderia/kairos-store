import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'src/store';
import axios from 'axios';
import Moment from 'react-moment';

import App from 'src/app';

axios.defaults.baseURL = process.env.API_ROOT;
Moment.globalLocale = 'es_MX';

ReactDOM.render(
  <Provider store={store}>
    <Router basename="/">
      <App />
    </Router>
  </Provider>, 
  document.querySelector('#root'));
