import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  DialogContent,
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Typography,
  Grid,
  Divider,
  withStyles 
} from '@material-ui/core';
import { Close } from '@material-ui/icons';

import { changeCheckoutAddress } from './checkoutActions';

const styles = theme => ({
  flex: {
    flex: 1,
  },
  dialogContent: {
    padding: theme.spacing(6),
    paddingBottom: theme.spacing(7),
    maxWidth: '100%',
    width: 500,
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addressTitle: {
    fontWeight: 500,
  },
  buttonContainer: {
    marginLeft: 16,
    minWidth: 100,
    textAlign: 'right',
  }
});

class CheckoutAddressList extends Component {

  handleSelectedAddress = (id) => {
    this.props.changeCheckoutAddress(id);
    this.props.handleClose();
  };

  render() {
    const { classes, handleClose } = this.props;

    const addresses = this.props.addresses ? this.props.addresses.toJS() : null;
    const addressesIdArray = this.props.addresses ? Object.keys(addresses) : null;

    return (
      <React.Fragment>
        <AppBar position="relative">
          <Toolbar>
            <IconButton color="inherit" onClick={handleClose} aria-label="Close">
              <Close />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.flex}>
              Elegir dirección existente
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent className={classes.dialogContent}>
          <Grid container direction="column" spacing={4}>
            { addresses && (
              addressesIdArray.map((id, index) => {
                const address = addresses[id];

                return(
                  <React.Fragment key={address.id}>
                    <Grid item className={classes.listItem}>
                      <div>
                        <Typography variant="body1" className={classes.addressTitle}>
                          {address.name}
                        </Typography>
                        <Typography variant="body2">
                          {address.address}
                        </Typography>
                        {address.streets && (
                          <Typography variant="body2">
                            Entre: {address.streets}
                          </Typography>
                        )}
                        <Typography variant="body2">
                          {address.reference}
                        </Typography>
                        <Typography variant="body2">
                          {address.city}{address.state && (
                            <React.Fragment>, {address.state}</React.Fragment>
                          )}
                        </Typography>
                        <Typography variant="body2">
                          {address.zip}{address.country && (
                            <React.Fragment>, {address.country}</React.Fragment>
                          )}
                        </Typography>
                        {address.phone && (
                          <Typography variant="body2">
                            Teléfono: {address.phone}
                          </Typography>
                        )}
                      </div>
                      <div className={classes.buttonContainer}>
                        <Button 
                          color="primary" 
                          variant="outlined"
                          onClick={() => this.handleSelectedAddress(address.id)}
                        >
                          Enviar aquí
                        </Button>
                      </div>
                    </Grid>
                    { index != (addressesIdArray.length - 1) && (
                      <Divider />
                    )}
                  </React.Fragment>
                )
              })
            )}
          </Grid>
        </DialogContent>
      </React.Fragment>
    );
  }
}

const mapStateToProps = function mapStateToProps(state, props) {
  return {
    addresses: state.get('checkout').get('addresses'),
  };
};

function mapDispatchToProps(dispatch) {
  return Object.assign({},
    bindActionCreators({ changeCheckoutAddress }, dispatch),
  );
}
 
export default withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckoutAddressList));