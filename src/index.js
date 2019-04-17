import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import axios from 'axios';
import { API_ROOT } from './common/constants';
import Moment from 'react-moment';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import App from './app';

axios.defaults.baseURL = API_ROOT;

Moment.globalLocale = 'es_MX';

const mainColor = '#40C3FD';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#9ADFFD',
      main: mainColor,
      dark: '#05ABF3',
      contrastText: '#fff',
    },
    secondary: {
      light: '#D2F8E6',
      main: '#30D887',
      dark: '#00A958',
      contrastText: '#fff',
    },
    error: {
      main: '#ff5a5f',
    },
    custom: {
      black: '#000',
      lightGrey: '#f4f4f4',
      mediumGrey: '#777',
      darkGrey: '#111',
      white: '#fff',
      background: '#40C3FD',
      red: '#ff5a5f',
      darkBlue: '#27648C',
      lightBlue: '#F0F8FE',
      pink: '#D91D71',
    },
    background: {
      default: '#f8f8f8'
    }
  },
  typography: {
    useNextVariants: true,
    fontSize: 12,
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: 'none',
      },
      contained: {
        boxShadow: 'none',
      },
    },
    MuiInput: {
      underline: {
        '&:before': {
          borderBottom: `1px solid #999`,
        },
        '&:after': {
          borderBottom: `2px solid ${mainColor}`,
        }
      }
    },
    MuiFormLabel: {
      root: {
        color: '#999',
        '&$focused': {
          color: mainColor,
          '&$error': {
            color: '#ff5a5f',
          },
        },
        '&$error': {
          color: '#999',
        },
      },
    },
    MuiFormControl: {
      root: {
        width: '100%',
      }
    }
  },
});

render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </MuiThemeProvider>, 
  document.getElementById('root'));

