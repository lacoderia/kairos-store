import React, { Component } from 'react';

import { withStyles } from '@material-ui/core';

import PrivateTemplate from '../../templates/privateTemplate';
import Products from '../../components/shop/products/products';

const styles = theme => ({

});

class ProductsView extends Component {

  render() {
    const { classes } = this.props;

    return (
      <PrivateTemplate>
        <Products></Products>
      </PrivateTemplate>
    )
  }
 
}

export default withStyles(styles)(ProductsView);