import React, { Component } from 'react';

import { withStyles, withWidth } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

import Navigation from '../../components/navigation/navigation';
import Cart from '../../components/shop/cart/cart';
import Summary from '../../components/shop/summary/summary';

const styles = theme => ({
  root: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
  main: {
    display: 'flex',
    flex: 1,
    overflow: 'auto',
  },
  container: {
    maxHeight: '100%',
    overflow: 'hidden',
    overflowY: 'auto',
    paddingTop: 8,
    [theme.breakpoints.up('sm')]: {
      maxHeight: 'none',
      padding: 48,
      paddingTop: 32,
    },
  },
  gridContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    maxHeight: '100%',
    [theme.breakpoints.up('md')]: {
      maxHeight: 'none',
    },
  },
});

class CartView extends Component {

  render() {
    const { classes, width } = this.props;

    return (
      <div className={classes.root}>
        <Navigation />
        <div className={classes.main}>
          <Grid 
            container 
            justify="center"
            className={classes.container}
          >
            <Grid item xs={12} xl={10} className={classes.gridContainer}>
              <Grid container 
                justify="center"
                spacing={width == 'xs' ? 16 : 40}
              >
                <Hidden mdUp>
                  <Grid item xs={12} md={4} lg={3}>
                    <Summary showPaymentButton={true}/>
                  </Grid>
                </Hidden>
                <Grid item xs={12} md={8} lg={9}>
                  <Cart />
                </Grid>
                <Hidden smDown>
                  <Grid item xs={12} md={4} lg={3}>
                    <Summary showPaymentButton={true}/>
                  </Grid>
                </Hidden>
              </Grid>
            </Grid>
          </Grid>       
        </div>
      </div>
    )
  }
 
}

export default withWidth()(withStyles(styles)(CartView));