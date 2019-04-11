import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core';

import ShopTemplate from '../../templates/privateTemplate';
import Products from '../../components/shop/products/products';

const styles = theme => ({

});

class ProductsView extends Component {

  render() {
    const { classes } = this.props;

    return (
      <ShopTemplate>
        <Switch>
          <Route path="/shop" component={Products} />
          <Redirect to="/shop" />
        </Switch>
      </ShopTemplate>
    )
  }
 
}

export default withStyles(styles)(withRouter(ProductsView));