import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import queryString from 'query-string';
import { generateStoreUrl } from 'services/store';

import { Typography, DialogContent, withStyles } from '@material-ui/core';

import DialogWrapper from 'library/components/DialogWrapper';
import { confirmOrder } from 'components/shop/checkout/checkoutActions';
import { openSnackbar } from 'components/snackbars/snackbarsActions';

const styles = theme => ({
  dialogContent: {
    boxSizing: 'border-box',
    maxWidth: '100%',
    width: 500,
  },
});

class ConfirmOrderView extends Component {
  
  componentDidMount() {
    const params = queryString.parse(this.props.location.search);

    if(params.id) {
      this.props.confirmOrder(params.id)
      .then(
        (response) => {
          this.props.openSnackbar({
            open: true,
            title: 'Pedido recibido',
            message: 'Tu pedido es el número ' + response.data.order.order_number,
            showIcon: false,
            variant: 'info',
          })
  
          this.props.history.push(generateStoreUrl('/orders'));
        },
        (e) => {}
      ) 
    }

  }

  render() {
    const {classes, confirmOrderError} = this.props;
    
    return (
      <DialogWrapper 
        open={true}
        disableFullScreen={true}
      >
        <DialogContent className={classes.dialogContent}>
          { confirmOrderError ? (
            <Typography variant="body1">
              Error: {confirmOrderError}
            </Typography>
          ) : (
            <Typography variant="body1">
              Validando pago con Openpay...
            </Typography>
          )}
        </DialogContent>
      </DialogWrapper>
    )
  }
}

const mapStateToProps = function mapStateToProps(state, props) {
  return {
    loading: state.get('checkout').get('loading'),
    confirmOrderError: state.get('checkout').get('confirmOrderError'),
  };
};

function mapDispatchToProps(dispatch) {
  return Object.assign({},
    bindActionCreators({ confirmOrder }, dispatch),
    bindActionCreators({ openSnackbar }, dispatch),
  );
}

export default withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmOrderView));
