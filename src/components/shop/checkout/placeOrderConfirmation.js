import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CurrencyFormat from 'react-currency-format';

import { 
  Button,
  withMobileDialog,
  DialogContent,
  DialogActions,
  Typography,
  withStyles
} from '@material-ui/core';

const styles = theme => ({
  dialogContent: {
    padding: theme.spacing(6),
    paddingBottom: theme.spacing(4),
    maxWidth: '100%',
    width: 500,
  },
  buttonContainer: {
    marginTop: theme.spacing(4),
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
    },
  }
});

class PlaceOrderConfirmation extends Component {

  handleContinue = () => {
    this.props.handleContinue();
    this.props.handleClose();
  }

  render() {
    const { classes, handleClose, shippingCost } = this.props;
    const total = this.props.products.reduce((sum, item) => sum + (item.get('quantity') * item.get('price')), 0) + shippingCost;

    return (
      <DialogContent className={classes.dialogContent}>
        <Typography variant="subtitle1">
          Se realizará un cargo por <CurrencyFormat value={total} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true}/> a tu cuenta
        </Typography>
        <DialogActions className={classes.buttonContainer}>
          <Button 
            variant="contained"
            color="primary"
            onClick={this.handleContinue}
          >
            Confirmar pago
          </Button>
          <Button 
            color="primary"
            onClick={handleClose}
          >
            Cancelar
          </Button>
        </DialogActions>
      </DialogContent>
    );
  }
}

PlaceOrderConfirmation.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

const mapStateToProps = function mapStateToProps(state, props) {
  return {
    products: state.get('cart').get('products'),
    shippingCost: state.get('checkout').get('shippingCost'),
  };
};

function mapDispatchToProps(dispatch) {
  return Object.assign({},
  );
}
 
export default withStyles(styles)(withMobileDialog()(connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaceOrderConfirmation)));