import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import PrivateRoute from '../../privateRoute';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import storeService from '../../services/store';
import openpayService from '../../services/openpay';

import LoginView from '../login/loginView';
import ForgotView from '../forgot/forgotView';
import ProductsView from '../shop/productsView';
import CartView from '../shop/cartView';
import CheckoutView from '../shop/checkoutView';
import OrdersView from '../shop/ordersView';
import PaymentMethods from '../shop/paymentMethodsView';
import Addresses from '../shop/addressesView';
import Snackbars from '../../components/snackbars/snackbars';

import session from '../../http/session';
import { getCurrentSession } from '../../http/sessionActions';
import { setStore } from '../../components/store/storeActions';

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

class StoreView extends Component {

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

    this.props.setStore(this.props.match.params.store);
    storeService.setStore(this.props.match.params.store);
    openpayService.setStore(this.props.match.params.store);
  }

  render() {
    const { classes, match } = this.props;

    return(
      <div className={classes.root}>
        {this.state.validatedSession && 
          <React.Fragment>
            <CssBaseline />
            <Switch>
              <Route path={`${match.url}/login`} component={LoginView} />
              <Route path={`${match.url}/forgot`} component={ForgotView} />
              <PrivateRoute exact path={`${match.url}/shop`} component={ProductsView}/>
              <PrivateRoute path={`${match.url}/cart`} component={CartView}/>
              <PrivateRoute path={`${match.url}/checkout`} component={CheckoutView}/>
              <PrivateRoute path={`${match.url}/orders`} component={OrdersView}/>
              <PrivateRoute path={`${match.url}/payment-methods`} component={PaymentMethods}/>
              <PrivateRoute path={`${match.url}/addresses`} component={Addresses}/>
              <Redirect to={`${match.url}/login`} />
            </Switch>
            <Snackbars />
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
    bindActionCreators({ setStore }, dispatch),
  );
}

export default withStyles(styles)(withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
  )(StoreView)));
