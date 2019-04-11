import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { withStyles } from '@material-ui/core/styles';
import DialogContent from '@material-ui/core/DialogContent';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import { updateSelectedAddress } from './checkoutActions';
import { Button } from '@material-ui/core';

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  dialogContent: {
    padding: theme.spacing.unit * 6,
    paddingBottom: theme.spacing.unit * 7,
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

class CheckoutAddressList extends React.Component {

  handleSelectedAddress = (id) => {
    this.props.updateSelectedAddress(id);
    this.props.handleClose();
  };

  render() {
    const { classes, handleClose, formError } = this.props;

    const addresses = this.props.addresses ? this.props.addresses.toJS() : null;
    const addressesIdArray = this.props.addresses ? Object.keys(addresses) : null;

    return (
      <React.Fragment>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton color="inherit" onClick={handleClose} aria-label="Close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.flex}>
              Cambiar dirección de envío
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent className={classes.dialogContent}>
          <Grid container direction="column" spacing={32}>
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
                        <Typography variant="body1">
                          {address.address}
                        </Typography>
                        <Typography variant="body1">
                          {address.city}, {address.state}
                        </Typography>
                        <Typography variant="body1">
                          {address.zip}
                        </Typography>
                        <Typography variant="body1">
                          {address.country}
                        </Typography>
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
    formError: state.get('checkout').get('error'),
    addresses: state.get('checkout').get('addresses'),
  };
};

function mapDispatchToProps(dispatch) {
  return Object.assign({},
    bindActionCreators({ updateSelectedAddress }, dispatch),
  );
}
 
export default withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckoutAddressList));