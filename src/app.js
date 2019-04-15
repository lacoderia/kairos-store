import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import PrivateRoute from './privateRoute';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';

import LoginView from './views/login/loginView';
import RegisterView from './views/register/registerView';
import ForgotView from './views/forgot/forgotView';
import ProductsView from './views/shop/productsView';
import CartView from './views/shop/cartView';
import CheckoutView from './views/shop/checkoutView';
import OrdersView from './views/shop/ordersView';
import PaymentMethods from './views/shop/paymentMethodsView';
import Addresses from './views/shop/addressesView';

import session from '../src/http/session';
import { getCurrentSession } from '../src/http/sessionActions';

const styles = {
  root: {
    display: 'flex',
    flexGrow: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    height: '100%',
  },
}

class App extends Component {

  state = {
    validatedSession: false
  }

  componentDidMount() {
    if(session.isHttpHeaders()){
      session.configHttpHeaders();
      this.props.getCurrentSession()
      .then(response => {
        this.setState({ validatedSession: true });
        return response;
      });
    } else {
      this.setState({ validatedSession: true });
    }
  }

  render() {
    const { classes } = this.props;

    return(
      <div className={classes.root}>
        {this.state.validatedSession && 
          <React.Fragment>
            <CssBaseline />
            <Switch>
              <Route exact path="/login" component={LoginView} />
              <Route path="/register" component={RegisterView} />
              <Route path="/forgot" component={ForgotView} />
              <PrivateRoute path="/shop" component={ProductsView}/>
              <PrivateRoute path="/cart" component={CartView}/>
              <PrivateRoute path="/checkout" component={CheckoutView}/>
              <PrivateRoute path="/orders" component={OrdersView}/>
              <PrivateRoute path="/payment-methods" component={PaymentMethods}/>
              <PrivateRoute path="/addresses" component={Addresses}/>
              <Redirect to="/login" />
            </Switch>
          </React.Fragment>
        }
      </div>
    )
  }
}

const mapStateToProps = function mapStateToProps(state, props) {
  return {};
};

function mapDispatchToProps(dispatch) {
  return Object.assign({},
    bindActionCreators({ getCurrentSession }, dispatch),
  );
}

export default withStyles(styles)(withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App)));
