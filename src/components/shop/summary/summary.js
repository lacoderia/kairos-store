import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
import classNames from 'classnames';
import { generateStoreUrl } from 'services/store';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  title: {
    display: 'flex',
    alignItems: 'baseline',
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
  },
  vpText: {
    fontSize: '0.9rem',
  }
});

class Summary extends Component {
  
  render() {
    const { classes, isCartView } = this.props;
    const productsCount = this.props.products.reduce((sum, item) => sum + item.get('quantity'), 0);
    const orderTotal = this.props.products.reduce((sum, item) => sum + item.get('quantity') * item.get('price'), 0);
    const orderVPTotal = this.props.products.reduce((sum, item) => sum + item.get('quantity') * item.get('volume'), 0);
    const shippingCost = this.props.shippingCost ? this.props.shippingCost : 0;

    return (
      <React.Fragment>
        <div className={classes.title}>
          <Typography variant="h5" component="span">
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
          { !isCartView && (
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
          )}
          <Divider className={classes.divider}/>
          <div className={classes.justifiedText}>
            <Typography variant="h6" component="span" gutterBottom>Total a pagar:</Typography>
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
          <div className={classes.justifiedText}>
            <Typography variant="h6" component="span" className={classes.vpText}>VP total:</Typography>
            <Typography variant="h6" component="span" className={classes.vpText}>
              {orderVPTotal} VP
            </Typography>
          </div>
          <div className={classes.buttonContainer}>
            { isCartView && (
              <div>
                <Button 
                  component={Link}
                  to={generateStoreUrl('/checkout')}
                  aria-label="Proceed to checkout"
                  variant="contained" 
                  color="primary" 
                  disabled={productsCount == 0}
                >
                  Proceder al pago
                </Button>
              </div>
            )}
            <div>
              <Button 
                component={Link}
                to={generateStoreUrl('/shop')}
                aria-label="Continue shopping"
                color="primary"
                className={classes.continueShoppingButton}
                style={{marginTop: 16}}
              >
                Continuar comprando
              </Button>
            </div>
          </div>
        </Paper>
      </React.Fragment>
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

export default withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps
)(Summary));