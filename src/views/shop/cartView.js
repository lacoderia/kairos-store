import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

import Navigation from '../../components/navigation/navigation';
import Cart from '../../components/shop/cart/cart';
import Summary from '../../components/shop/summary/summary';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100%',
  },
  main: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    minWidth: 0, // So the Typography noWrap works,
    height: 'calc(100% - 57px)',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    overflow: 'auto',
  }
});

class CartView extends Component {

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Navigation />
        <div className={classes.main}>
          <div className={classes.content}>
            <Grid container 
              justify="center"
            >
              <Hidden mdUp>
                <Grid item xs={12} md={3}>
                  <Summary showPaymentButton={true}/>
                </Grid>
              </Hidden>
              <Grid item xs={12} md={9}>
                <Cart />
              </Grid>
              <Hidden smDown>
                <Grid item xs={12} md={3}>
                  <Summary showPaymentButton={true}/>
                </Grid>
              </Hidden>
            </Grid>
          </div>
        </div>
      </div>
    )
  }
 
}

export default withStyles(styles)(withRouter(CartView));