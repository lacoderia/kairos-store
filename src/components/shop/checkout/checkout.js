import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import { generateStoreUrl } from '../../../services/store';

import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';

import DialogWrapper from '../../common/dialogWrapper';
import CheckoutAddressesList from './checkoutAddressList';
import AddCheckoutAddressForm from './addCheckoutAddressForm';
import CheckoutCardsList from './checkoutCardsList';
import AddCheckoutCardForm from './addCheckoutCardForm';
import PlaceOrderConfirmation from './placeOrderConfirmation';
import LoaderOverlay from '../../common/loaderOverlay';

import {  getAddresses, 
          getCards,
          changeActiveSection,
          getShippingCost,
          placeOrder,
          openDialog, 
          closeDialog,
          exitDialog } from './checkoutActions';
import { dialogs, sections } from './checkoutConstants';

const styles = theme => ({
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
      padding: `${theme.spacing.unit * 5}px ${theme.spacing.unit * 6}px`,
    },
    position: 'relative',
  },
  sectionTitleContainer: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 16,
    marginTop: 16,
  },
  sectionTitle: {
    color: theme.palette.custom.mediumGrey,
  },
  activeSectionTitle: {
    color: 'black',
    '&:after': {
      backgroundColor: 'black',
      content: '""',
      display: 'block',
      height: 4,
      marginTop: 4,
      marginBottom: 8,
      width: 50,
    }
  },
  sectionContent: {
    marginBottom: 16,
    marginLeft: 16,
  },
  anchor: {
    color: theme.palette.custom.mediumGrey,
    '&:hover': {
      color: theme.palette.custom.darkBlue,
    },
  },
  loaderContainer: {
    padding: `${theme.spacing.unit * 5}px !important`,
    textAlign: 'center',
    width: '100%',
  },
  sectionErrorContainer: {
    color: theme.palette.error.main,
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px !important`,
    textAlign: 'right',
    width: '100%',
  },
  errorContainer: {
    color: theme.palette.error.main,
    padding: `${theme.spacing.unit * 5}px ${theme.spacing.unit * 4}px !important`,
    textAlign: 'center',
    width: '100%',
  },
  noResultsContainer: {
    textAlign: 'left',
    marginLeft: 4,
    marginTop: 32,
  },
  noResultsText: {
    color: '#777',
  },
  actionsContainer: {
    marginLeft: -4,
    marginTop: 16,
  },
  bold: {
    fontWeight: 500,
  },
  buttonContainer: {
    textAlign: 'right',
  },
  capitalize: {
    textTransform: 'capitalize',
  },
  paymentContainer : {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.up('md')]: {
      justifyContent: 'normal',
    },
  },
  imgContainer: {
  },
  img: {
    height: 24,
    [theme.breakpoints.up('md')]: {
      height: 32,
      marginLeft: 40,
    },
  },
  note: {
    marginTop: 24,
  },
});

class Checkout extends Component {

  handleDialogOpen = dialog => {
    this.props.openDialog(dialog);
  }

  handleDialogClose = () => {
    this.props.closeDialog();
  }

  handleDialogExited = () => {
    this.props.exitDialog();
  }

  editShippingAddress = event => {
    event.preventDefault();
    this.props.changeActiveSection(sections.SHIPPING_ADDRESS_SECTION);
  }

  getShippingCost = () => {
    const shippingAddress = this.props.shippingAddress ? this.props.shippingAddress.toJS() : null;
    const products = this.props.products ? this.props.products.toJS() : null;
    this.props.getShippingCost(shippingAddress.id, products)
    .then(
      (response) => {
        this.props.changeActiveSection(sections.PAYMENT_METHOD_SECTION);
      },
      (e) => {}
    )
  }

  isActiveSection = section => {
    return section == this.props.activeSection;
  }

  placeOrder = () => {
    const shippingAddress = this.props.shippingAddress ? this.props.shippingAddress.toJS() : null;
    const selectedCard = this.props.selectedCard ? this.props.selectedCard.toJS() : null;
    const products = this.props.products ? this.props.products.toJS() : null;
    const shippingCost = this.props.shippingCost ? this.props.shippingCost : 0;

    if (shippingAddress && selectedCard && products) {
      this.props.placeOrder(shippingAddress.id, selectedCard.id, products, shippingCost)
      .then(
        (response) => {
          window.location.href = response.data.order.redirect_url;
        },
        (e) => {}
      )
    }
    
  }

  componentDidMount() {
    this.props.getAddresses();
    this.props.getCards();
    this.props.changeActiveSection(sections.SHIPPING_ADDRESS_SECTION);
  }

  render() {
    const { classes, addressesLoading, addressesError, cardsLoading, cardsError, dialog, dialogLoading, open, products, loading, getShippingCostError, shippingMessage, placeOrderError } = this.props;

    const touchedSections = this.props.touchedSections ? this.props.touchedSections.toJS() : [];

    const addresses = this.props.addresses ? this.props.addresses.toJS() : null;
    const addressesIdArray = this.props.addresses ? Object.keys(addresses) : null;
    const shippingAddress = this.props.shippingAddress ? this.props.shippingAddress.toJS() : undefined;

    const cards = this.props.cards ? this.props.cards.toJS() : null;
    const cardsIdArray = this.props.cards ? Object.keys(cards) : null;
    const selectedCard = this.props.selectedCard ? this.props.selectedCard.toJS() : undefined;

    if (!products.size) {
      return <Redirect to={generateStoreUrl('/cart')} />;
    }

    return (
      <React.Fragment>
        <div className={classes.title}>
          <Typography variant="h5" style={{ display: 'inline-block' }}>
            Completar compra
          </Typography>
        </div>
        <Paper elevation={0} className={classes.paper}>
          <LoaderOverlay loading={loading} />
          <Divider />
          <section>
            <div className={classes.sectionTitleContainer}>
              <Typography 
                variant="h6" 
                className={classNames(
                  classes.sectionTitle,
                  this.isActiveSection(sections.SHIPPING_ADDRESS_SECTION) ? classes.activeSectionTitle : undefined
                )}
              >
                1. Dirección de envío
              </Typography>
              { !this.isActiveSection(sections.SHIPPING_ADDRESS_SECTION) && (
                <Typography variant="body2" align="right">
                  <a 
                    aria-label="Delete item"
                    className={classes.anchor}
                    href="#"
                    onClick={(event) => this.editShippingAddress(event)}
                  >
                    Cambiar
                  </a>
                </Typography>
              ) }
            </div>
            <div className={classes.sectionContent}>
              { this.isActiveSection(sections.SHIPPING_ADDRESS_SECTION) ? (
                <React.Fragment>
                  { addressesLoading ? (
                    <div className={classes.loaderContainer}>
                      <CircularProgress size={40} />
                    </div>
                  ) : (
                    addressesError ? (
                      <div className={classes.errorContainer}>
                        <Typography variant="body2" color="inherit">{addressesError}</Typography>
                      </div>
                    ) : (
                      <React.Fragment>
                        { shippingAddress && (
                          <div>
                            <Typography variant="body1" className={classes.bold}>
                              {shippingAddress.name}
                            </Typography>
                            <Typography variant="body2">
                              {shippingAddress.address}
                            </Typography>
                            {shippingAddress.streets && (
                              <Typography variant="body2">
                                Entre: {shippingAddress.streets}
                              </Typography>
                            )}
                            <Typography variant="body2">
                              {shippingAddress.reference}
                            </Typography>
                            <Typography variant="body2">
                              {shippingAddress.city}{shippingAddress.state && (
                                <React.Fragment>, {shippingAddress.state}</React.Fragment>
                              )}
                            </Typography>
                            <Typography variant="body2">
                              {shippingAddress.zip}{shippingAddress.country && (
                                <React.Fragment>, {shippingAddress.country}</React.Fragment>
                              )}
                            </Typography>
                            {shippingAddress.phone && (
                              <Typography variant="body2">
                                Teléfono: {shippingAddress.phone}
                              </Typography>
                            )}
                          </div>
                        )}
                        { addressesIdArray && addressesIdArray.length == 0 && (
                          <div className={classes.noResultsContainer} >
                            <Typography variant="body2" className={classes.noResultsText}>
                              Aun no tienes direcciones registradas
                            </Typography>
                          </div>  
                        )}
                        <div className={classes.actionsContainer}>
                          <Button
                            color="primary"
                            onClick={() => this.handleDialogOpen(dialogs.ADD_ADDRESS_DIALOG)}
                          >
                            Agregar nueva dirección
                          </Button>
                          { addressesIdArray && addressesIdArray.length != 0 && (
                            <Button
                              color="primary"
                              onClick={() => this.handleDialogOpen(dialogs.ADDRESS_PICKER_DIALOG)}
                            >
                              Elegir dirección existente
                            </Button>
                          )}
                        </div>
                        <div className={classes.buttonContainer}>
                          <Button 
                            color="primary"
                            variant="contained"
                            disabled={!shippingAddress}
                            onClick={this.getShippingCost}
                          >
                            CONTINUAR
                          </Button>
                        </div>
                      </React.Fragment>
                    )
                  )}
                </React.Fragment>
              ) : (
                <div>
                  { shippingAddress && (
                    <React.Fragment>
                      <div>
                        <Typography variant="body1" className={classes.bold}>
                          {shippingAddress.name}
                        </Typography>
                        <Typography variant="body2">
                          {shippingAddress.address}
                        </Typography>
                        <Typography variant="body2">
                          {shippingAddress.streets}
                        </Typography>
                        <Typography variant="body2">
                          {shippingAddress.reference}
                        </Typography>
                        <Typography variant="body2">
                          {shippingAddress.city}{shippingAddress.state && (
                            <React.Fragment>, {shippingAddress.state}</React.Fragment>
                          )}
                        </Typography>
                        <Typography variant="body2">
                          {shippingAddress.zip}{shippingAddress.country && (
                            <React.Fragment>, {shippingAddress.country}</React.Fragment>
                          )}
                        </Typography>
                        <Typography variant="body2">
                          Teléfono: {shippingAddress.phone}
                        </Typography>
                      </div>
                      { shippingMessage && (
                        <Typography variant="body2" className={classes.note}>
                          * Nota: {shippingMessage}
                        </Typography>
                      )}
                    </React.Fragment>
                  )}
                </div>
              )}
            </div>
            <div className={classes.sectionErrorContainer}>
              <Typography variant="body2" color="inherit">{getShippingCostError}</Typography>
            </div>
          </section>
          <Divider />
          <section className={classes.payment}>
            <div className={classes.sectionTitleContainer}>
              <Typography 
                variant="h6" 
                className={classNames(
                  classes.sectionTitle,
                  this.isActiveSection(sections.PAYMENT_METHOD_SECTION) ? classes.activeSectionTitle : undefined
                )}
              >
                2. Método de pago
              </Typography>
            </div>
            <div className={classes.sectionContent}>
              { this.isActiveSection(sections.PAYMENT_METHOD_SECTION) ? (
                <React.Fragment>
                  { cardsLoading ? (
                    <div className={classes.loaderContainer}>
                      <CircularProgress size={40} />
                    </div>
                  ) : (
                    cardsError ? (
                      <div className={classes.errorContainer}>
                        <Typography variant="body2" color="inherit">{cardsError}</Typography>
                      </div>
                    ) : (
                      <React.Fragment>
                        { selectedCard && (
                          <div className={classes.paymentContainer}>
                            <div>
                              <Typography variant="body1" className={classes.bold}>
                                <span className={classes.capitalize}>{selectedCard.brand}</span> terminada en {selectedCard.cardNumber.slice(-4)} 
                              </Typography>
                              <Typography variant="body1">
                                {selectedCard.name}
                              </Typography>
                              <Typography variant="body1">
                                Vencimiento: {selectedCard.expiration}
                              </Typography>
                            </div>
                            <div className={classes.imgContainer}>
                              <img src="/images/logo-openpay.png" className={classes.img}/>
                            </div>
                          </div>
                        )}
                        { cardsIdArray && cardsIdArray.length == 0 && (
                          <div className={classes.noResultsContainer} >
                            <Typography variant="body2" className={classes.noResultsText}>
                              Aun no tienes métodos de pago registrados
                            </Typography>
                          </div>  
                        )}
                        <div className={classes.actionsContainer}>
                          <Button
                            color="primary"
                            onClick={() => this.handleDialogOpen(dialogs.ADD_CARD_DIALOG)}
                          >
                            Agregar método de pago
                          </Button>
                          { cardsIdArray && cardsIdArray.length != 0 && (
                            <Button
                              color="primary"
                              onClick={() => this.handleDialogOpen(dialogs.CARD_PICKER_DIALOG)}
                            >
                              Cambiar método de pago
                            </Button>
                          )}
                        </div>
                        <div className={classes.buttonContainer}>
                          <Button 
                            color="primary"
                            variant="contained"
                            disabled={!selectedCard}
                            onClick={() => this.handleDialogOpen(dialogs.PLACE_ORDER_CONFIRMATION)}
                          >
                            FINALIZAR PEDIDO
                          </Button>
                        </div>
                      </React.Fragment>
                    )
                  )}
                </React.Fragment>
              ) : (
                <div>
                  { selectedCard && touchedSections.includes(sections.PAYMENT_METHOD_SECTION) && (
                    <div className={classes.paymentContainer}>
                      <div>
                        <Typography variant="body1" className={classes.bold}>
                          <span className={classes.capitalize}>{selectedCard.brand}</span> terminada en {selectedCard.cardNumber.slice(-4)} 
                        </Typography>
                        <Typography variant="body1">
                          {selectedCard.name}
                        </Typography>
                        <Typography variant="body1">
                          Vencimiento: {selectedCard.expiration}
                        </Typography>
                      </div>
                      <div className={classes.imgContainer}>
                        <img src="/images/logo-openpay.png" className={classes.img}/>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className={classes.sectionErrorContainer}>
              <Typography variant="body2" color="inherit">{placeOrderError}</Typography>
            </div>
          </section>
          <Divider />
        </Paper>
        <DialogWrapper 
          loading={dialogLoading} 
          open={open} 
          handleClose={this.handleDialogClose}
          handleExited={this.handleDialogExited}
          disableFullScreen={dialog == dialogs.PLACE_ORDER_CONFIRMATION}
          disableBackdropClick={dialog == dialogs.PLACE_ORDER_CONFIRMATION}
        >
          {{
            [dialogs.ADD_ADDRESS_DIALOG]: (
              <AddCheckoutAddressForm handleClose={this.handleDialogClose} />
            ),
            [dialogs.ADDRESS_PICKER_DIALOG]: (
              <CheckoutAddressesList handleClose={this.handleDialogClose} />
            ),
            [dialogs.ADD_CARD_DIALOG]: (
              <AddCheckoutCardForm handleClose={this.handleDialogClose} />
            ),
            [dialogs.CARD_PICKER_DIALOG]: (
              <CheckoutCardsList handleClose={this.handleDialogClose} />
            ),
            [dialogs.PLACE_ORDER_CONFIRMATION]: (
              <PlaceOrderConfirmation handleClose={this.handleDialogClose} handleContinue={this.placeOrder} />
            ),
          }[dialog]}
        </DialogWrapper>
      </React.Fragment>
    )
  }
  
};

const mapStateToProps = function mapStateToProps(state, props) {
  return {
    addressesLoading: state.get('checkout').get('getAddressesLoading'),
    addressesError: state.get('checkout').get('getAddressesError'),
    cardsLoading: state.get('checkout').get('getCardsLoading'),
    cardsError: state.get('checkout').get('getCardsError'),
    dialogLoading: state.get('checkout').get('dialogLoading'),
    dialog: state.get('checkout').get('dialog'),
    open: state.get('checkout').get('openDialog'),
    activeSection: state.get('checkout').get('activeSection'),
    touchedSections: state.get('checkout').get('touchedSections'),
    addresses: state.get('checkout').get('addresses'),
    shippingAddress: state.get('checkout').get('selectedShippingAddress'),
    cards: state.get('checkout').get('cards'),
    selectedCard: state.get('checkout').get('selectedCard'),
    loading: state.get('checkout').get('loading'),
    shippingCost: state.get('checkout').get('shippingCost'),
    shippingMessage: state.get('checkout').get('shippingMessage'),
    getShippingCostError: state.get('checkout').get('getShippingCostError'),
    placeOrderError: state.get('checkout').get('placeOrderError'),
    products: state.get('cart').get('products'),
  };
};

function mapDispatchToProps(dispatch) {
  return Object.assign({},
    bindActionCreators({ getAddresses }, dispatch),
    bindActionCreators({ getCards }, dispatch),
    bindActionCreators({ changeActiveSection }, dispatch),
    bindActionCreators({ getShippingCost }, dispatch),
    bindActionCreators({ placeOrder }, dispatch),
    bindActionCreators({ openDialog }, dispatch),
    bindActionCreators({ closeDialog }, dispatch),
    bindActionCreators({ exitDialog }, dispatch),
  );
}

export default withStyles(styles)(withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Checkout)));