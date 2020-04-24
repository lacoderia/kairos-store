import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
import { generateStoreUrl } from 'services/store';

import { 
  Paper,
  Typography,
  Button,
  Divider,
  withStyles
} from '@material-ui/core';

const styles = theme => ({
  title: {
    display: 'flex',
    alignItems: 'baseline',
    fontWeight: 500,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    paddingLeft: theme.spacing(4),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingLeft: 0,
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(3),
    },
  },
  paper: {
    border: `1px solid ${theme.palette.custom.lightGrey}`,
    padding: theme.spacing(3, 4),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(5, 3),
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