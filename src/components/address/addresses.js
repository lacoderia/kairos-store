import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import ListWrapper from '../common/listWrapper';
import DialogWrapper from '../common/dialogWrapper';
import EditAddressForm from './editAddressForm';
import AddAddressForm from './addAddressForm';
import DeleteAddress from './deleteAddress';
import { getAddresses, openDialog, closeDialog, exitDialog } from './addressActions';
import { dialogs } from './addressConstants';

const styles = theme => ({
  paper: {
    border: `1px solid ${theme.palette.custom.lightGrey}`,
    padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 4}px`,
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.spacing.unit * 5}px ${theme.spacing.unit * 6}px`,
    },
  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    marginBottom: theme.spacing.unit * 3,
  },
  dataContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: `${theme.spacing.unit * 2}px 0`,
    '&:first-child': {
      marginTop: 0,
    }
  },
  dataTitle: {
    fontWeight: 500,
  },
  data: {
    color: 'rgba(0, 0, 0, 0.54)',
  },
  delete: {
    color: theme.palette.custom.red,
    '&:hover': {
      backgroundColor: 'rgba(255, 90, 95, 0.08)',
    },
  },
  addAddressContainer: {
    marginTop: theme.spacing.unit * 4,
    textAlign: 'right',
  },
});

class Addresses extends Component {

  handleDialogOpen = (dialog, id) => {
    this.props.openDialog(dialog, id);
  }

  handleDialogClose = () => {
    this.props.closeDialog();
  }

  handleDialogExited = () => {
    this.props.exitDialog();
  }

  componentDidMount() {
    this.props.getAddresses();
  }

  render() {    
    const { classes, loading, error, dialog, dialogLoading, open } = this.props;

    const addresses = this.props.addresses ? this.props.addresses.toJS() : null;
    const addressesIdArray = this.props.addresses ? Object.keys(addresses) : null;

    return (
      <Paper elevation={0} className={classes.paper}>
        <div className={classes.titleContainer}>
          <Typography variant="h6" className={classes.title}>
            Direcciones
          </Typography>
        </div> 
        <ListWrapper
          list={addressesIdArray}
          loading={loading} 
          error={error} 
          noResultsText="Aun no tienes direcciones registradas"
        >
          { 
            addressesIdArray && addressesIdArray.map((id, index) => {
              const item = addresses[id];
              return(
                <React.Fragment key={item.id}>
                  <div className={classes.dataContainer}>
                    <div>
                      <Typography variant="body1" className={classes.dataTitle}>
                        {item.name}
                      </Typography>
                      <Typography variant="body2" className={classes.data}>
                        {item.address}
                      </Typography>
                      {item.streets && (
                        <Typography variant="body2" className={classes.data}>
                          Entre: {item.streets}
                        </Typography>
                      )}
                      <Typography variant="body2" className={classes.data}>
                        {item.reference}
                      </Typography>
                      <Typography variant="body2" className={classes.data}>
                        {item.city}, {item.state}
                      </Typography>
                      <Typography variant="body2" className={classes.data}>
                        {item.zip}, {item.country}
                      </Typography>
                      {item.phone && (
                        <Typography variant="body2" className={classes.data}>
                          Teléfono: {item.phone}
                        </Typography>
                      )}
                    </div>
                    <div>
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => this.handleDialogOpen(dialogs.EDIT_ADDRESS_DIALOG, id)}
                      >
                        Editar
                      </Button>
                      <Button
                        color="primary"
                        onClick={() => this.handleDialogOpen(dialogs.DELETE_ADDRESS_DIALOG, id)}
                        className={classes.delete}
                      >
                        Eliminar
                      </Button>
                    </div>
                  </div>
                  { index != (addressesIdArray.length - 1) && (
                    <Divider />
                  )}
                </React.Fragment>
              )
            })
          }
        </ListWrapper>
        <DialogWrapper 
          loading={dialogLoading} 
          open={open} 
          handleClose={this.handleDialogClose} 
          handleExited={this.handleDialogExited}
          disableFullScreen={dialog == dialogs.DELETE_ADDRESS_DIALOG}>
          {{
            [dialogs.ADD_ADDRESS_DIALOG]: (
              <AddAddressForm handleClose={this.handleDialogClose} />
            ),
            [dialogs.EDIT_ADDRESS_DIALOG]: (
              <EditAddressForm handleClose={this.handleDialogClose} />
            ),
            [dialogs.DELETE_ADDRESS_DIALOG]: (
              <DeleteAddress handleClose={this.handleDialogClose} />
            ),
          }[dialog]}
        </DialogWrapper>
        <div className={classes.addAddressContainer}>
          <Button
            size="small"
            color="primary"
            onClick={() => this.handleDialogOpen(dialogs.ADD_ADDRESS_DIALOG)}
          >
            Agregar dirección
          </Button>
        </div>
      </Paper>
    )
  }
}

const mapStateToProps = function mapStateToProps(state, props) {
  return {
    loading: state.get('address').get('getAddressesLoading'),
    error: state.get('address').get('getAddressesError'),
    dialog: state.get('address').get('dialog'),
    dialogLoading: state.get('address').get('dialogLoading'),
    open: state.get('address').get('openDialog'),
    addresses: state.get('address').get('addresses'),
  };
};

function mapDispatchToProps(dispatch) {
  return Object.assign({},
    bindActionCreators({ getAddresses }, dispatch),
    bindActionCreators({ openDialog }, dispatch),
    bindActionCreators({ closeDialog }, dispatch),
    bindActionCreators({ exitDialog }, dispatch),
  );
}

export default withStyles(styles)((connect(
  mapStateToProps,
  mapDispatchToProps
)(Addresses)));