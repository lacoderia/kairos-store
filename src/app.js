import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';

import StorePicker from 'components/store/storePicker';
import StoreView from 'views/store/storeView';

import defaultTheme from 'styles/defaultTheme';
import omeinTheme from 'styles/omeinTheme';
import pranaTheme from 'styles/pranaTheme';

class App extends Component {

  render() {
    const { selectedStore } = this.props;
    let theme = defaultTheme;

    switch(selectedStore) {
      case 'omein':
        theme = omeinTheme;
        break;
      case 'prana':
        theme = pranaTheme;
        break;
      default:
        break;
    }

    return(
      <MuiThemeProvider theme={createMuiTheme(theme)}>
        <Switch>
          <Route path="/:store(omein|prana)" component={StoreView} />
          <Route path="/select-store" component={StorePicker} />
          <Redirect to="/select-store" />
        </Switch>
      </MuiThemeProvider>
    )
  }
}

const mapStateToProps = function mapStateToProps(state, props) {
  return {
    selectedStore: state.get('store').get('store'),
  };
};

function mapDispatchToProps(dispatch) {
  return Object.assign({},
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(App);
