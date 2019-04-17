import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  root: {
    height: 'auto',
  },
  container: {
    padding: `${theme.spacing.unit * 4}px 0`,
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing.unit * 6,
      paddingLeft: 0,
    },
  },
  title: {
    fontWeight: 500,
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 4,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing.unit * 0,
      marginTop: theme.spacing.unit,
      marginBottom: theme.spacing.unit * 3,
    },
  },
  paper: {
    border: `1px solid ${theme.palette.custom.lightGrey}`,
    padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 4}px`,
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.spacing.unit * 5}px ${theme.spacing.unit * 3}px`,
    },
  },
  buttonContainer: {
    marginTop: 32,
    textAlign: 'center',
  },
  justifiedText: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  divider: {
    marginBottom: 6,
    marginTop: 6,
  }
});

class Summary extends Component {
  
  render() {
    const { classes, showPaymentButton } = this.props;
    const cartProductsTotal = this.props.products.reduce((sum, item) => sum + item.get('quantity'), 0);
    const orderTotal = this.props.products.reduce((sum, item) => sum + item.get('quantity') * item.get('price'), 0);
    const shippingCost = this.props.shippingCost ? this.props.shippingCost : 0;

    return (
      <Grid container 
        justify="center"
        className={classNames(classes.root, classes.container)}
      >
        <Grid item xs={12} xl={9}>
          <div className={classes.title}>
            <Typography variant="h5" style={{ display: 'inline-block' }}>
              Resumen de compra
            </Typography>
          </div>
          <Paper elevation={0} className={classes.paper}>
            <div className={classes.justifiedText}>
              <Typography variant="body1" component="span" gutterBottom>Subtotal:</Typography>
              <Typography variant="body1" component="span">
                <CurrencyFormat 
                  value={orderTotal} 
                  displayType={'text'} 
                  thousandSeparator={true} 
                  prefix={'$'} 
                  decimalScale={2}
                  fixedDecimalScale={true}
                />
              </Typography>
            </div>
            <div className={classes.justifiedText}>
              <Typography variant="body1" component="span" gutterBottom>Envío:</Typography>
              <Typography variant="body1" component="span">
                <CurrencyFormat 
                  value={shippingCost} 
                  displayType={'text'} 
                  thousandSeparator={true} 
                  prefix={'$'} 
                  decimalScale={2}
                  fixedDecimalScale={true}
                />
              </Typography>
            </div>
            <Divider className={classes.divider}/>
            <div className={classes.justifiedText}>
              <Typography variant="h6" component="span">Total a pagar:</Typography>
              <Typography variant="h6" component="span">
                <CurrencyFormat 
                  value={orderTotal + shippingCost} 
                  displayType={'text'} 
                  thousandSeparator={true} 
                  prefix={'$'} 
                  decimalScale={2}
                  fixedDecimalScale={true}
                />
              </Typography>
            </div>
            {showPaymentButton && (
              <React.Fragment>
                <div className={classes.buttonContainer}>
                  <Button 
                    component={Link}
                    to="/checkout"
                    aria-label="Proceed to checkout"
                    variant="contained" 
                    color="primary" 
                    size="large"
                    disabled={cartProductsTotal == 0}
                  >
                    Proceder al pago
                  </Button>
                </div>
              </React.Fragment>
              
            )}
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = function mapStateToProps(state, props) {
  return {
    products: state.get('cart').get('products'),
    shippingCost: state.get('checkout').get('shippingCost'),
  };
};

function mapDispatchToProps(dispatch) {
  return Object.assign({},);
}

export default withStyles(styles)(withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Summary)));