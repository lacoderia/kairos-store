import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';

import CustomDialog from '../../common/customDialog';
import CheckoutAddressesList from './checkoutAddressList';
import AddCheckoutAddressForm from './addCheckoutAddressForm';
import CheckoutCardsList from './checkoutCardsList';
import AddCheckoutCardForm from './addCheckoutCardForm';
import PlaceOrderConfirmation from './placeOrderConfirmation';
import {  getAddresses, 
          getCards,
          updateActiveSection,
          placeOrder,
          openDialog, 
          closeDialog } from './checkoutActions';
//MOCK
import { addProductToCart } from '../cart/cartActions';
import { dialogs, sections } from './checkoutConstants';

const styles = theme => ({
  root: {
    height: 'auto',
  },
  container: {
    padding: `${theme.spacing.unit * 4}px 0`,
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing.unit * 6,
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
      padding: `${theme.spacing.unit * 5}px ${theme.spacing.unit * 6}px`,
    },
  },
  shippingAdress:{

  },
  payment: {

  },
  sectionTitleContainer: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 24,
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
  errorContainer: {
    color: theme.palette.error.main,
    padding: `${theme.spacing.unit * 5}px ${theme.spacing.unit * 4}px !important`,
    textAlign: 'center',
    width: '100%',
  },
  errorText: {
    color: theme.palette.error.main,
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
});

class Checkout extends Component {

  handleDialogClose = () => {
    this.props.closeDialog();
  }

  handleDialogOpen = dialog => {
    this.props.openDialog(dialog);
  }

  editShippingAddress = event => {
    event.preventDefault();
    this.props.updateActiveSection(sections.SHIPPING_ADDRESS_SECTION);
  }

  editPaymentMethod = () => {
    this.props.updateActiveSection(sections.PAYMENT_METHOD_SECTION);
  }

  isActiveSection = section => {
    return section == this.props.activeSection;
  }

  placeOrder = () => {
    const shippingAddress = this.props.shippingAddress ? this.props.shippingAddress.toJS() : null;
    const selectedCard = this.props.selectedCard ? this.props.selectedCard.toJS() : null;
    const products = this.props.products ? this.props.products.toJS() : null;

    if (shippingAddress && selectedCard && products) {
      this.props.placeOrder(shippingAddress.id, selectedCard.id, products);
    }
    
  }

  componentDidMount() {
    this.props.getAddresses();
    this.props.getCards();
    this.props.updateActiveSection(sections.SHIPPING_ADDRESS_SECTION);

    //MOCK
    this.props.addProductToCart(
      {id: 10, title: "Madhuri Monk Fruit", price: 398, picture: "/images/shop/ayni-madhuri.png", quantity: 2}
    );
    //MOCK
    this.props.addProductToCart(
      {id: 11, title: "Madhuri Monk Fruit", price: 398, picture: "/images/shop/ayni-madhuri.png", quantity: 1}
    )
  }

  render() {
    const { classes, addressesLoading, addressesError, cardsLoading, cardsError, dialog, dialogLoading, open } = this.props;

    const addresses = this.props.addresses ? this.props.addresses.toJS() : null;
    const addressesIdArray = this.props.addresses ? Object.keys(addresses) : null;
    const shippingAddress = this.props.shippingAddress ? this.props.shippingAddress.toJS() : undefined;

    const cards = this.props.cards ? this.props.cards.toJS() : null;
    const cardsIdArray = this.props.cards ? Object.keys(cards) : null;
    const selectedCard = this.props.selectedCard ? this.props.selectedCard.toJS() : undefined;

    return (
      <Grid container 
        justify="center"
        className={classNames(classes.root, classes.container)}
      >
        <Grid item xs={12} xl={9}>
          <div className={classes.title}>
            <Typography variant="h5" style={{ display: 'inline-block' }}>
              Completar compra
            </Typography>
          </div>
          <Paper elevation={0} className={classes.paper}>
            <Divider />
            <section className={classes.shippingAdress}>
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
                        <CircularProgress className={classes.progress} size={40} />
                      </div>
                    ) : (
                      addressesError ? (
                        <div className={classes.errorContainer}>
                          <Typography variant="body2" className={classes.errorText}>{addressesError}</Typography>
                        </div>
                      ) : (
                        <React.Fragment>
                          { shippingAddress && (
                            <div>
                              <Typography variant="body1" className={classes.bold}>
                                {shippingAddress.name}
                              </Typography>
                              <Typography variant="body1">
                                {shippingAddress.address}
                              </Typography>
                              <Typography variant="body1">
                                {shippingAddress.city}, {shippingAddress.state}
                              </Typography>
                              <Typography variant="body1">
                                {shippingAddress.zip}
                              </Typography>
                              <Typography variant="body1">
                                {shippingAddress.country}
                              </Typography>
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
                              Agregar dirección
                            </Button>
                            { addressesIdArray && addressesIdArray.length != 0 && (
                              <Button
                                color="primary"
                                onClick={() => this.handleDialogOpen(dialogs.ADDRESS_PICKER_DIALOG)}
                              >
                                Cambiar dirección
                              </Button>
                            )}
                          </div>
                          <div className={classes.buttonContainer}>
                            <Button 
                              color="primary"
                              variant="contained"
                              disabled={!shippingAddress}
                              onClick={this.editPaymentMethod}
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
                      <div>
                        <Typography variant="body1" className={classes.bold}>
                          {shippingAddress.name}
                        </Typography>
                        <Typography variant="body1">
                          {shippingAddress.address}
                        </Typography>
                        <Typography variant="body1">
                          {shippingAddress.city}, {shippingAddress.state}
                        </Typography>
                        <Typography variant="body1">
                          {shippingAddress.zip}
                        </Typography>
                        <Typography variant="body1">
                          {shippingAddress.country}
                        </Typography>
                      </div>
                    )}
                  </div>
                )}
                
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
                        <CircularProgress className={classes.progress} size={40} />
                      </div>
                    ) : (
                      cardsError ? (
                        <div className={classes.errorContainer}>
                          <Typography variant="body2" className={classes.errorText}>{cardsError}</Typography>
                        </div>
                      ) : (
                        <React.Fragment>
                          { selectedCard && (
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
                    { selectedCard && (
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
                    )}
                  </div>
                )}
              </div>
            </section>
            <Divider />
          </Paper>
          <CustomDialog 
            loading={dialogLoading} 
            open={open} 
            handleClose={this.handleDialogClose}
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
          </CustomDialog>
        </Grid>
      </Grid>
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
    addresses: state.get('checkout').get('addresses'),
    shippingAddress: state.get('checkout').get('selectedShippingAddress'),
    cards: state.get('checkout').get('cards'),
    selectedCard: state.get('checkout').get('selectedCard'),
    products: state.get('cart').get('products'),
  };
};

function mapDispatchToProps(dispatch) {
  return Object.assign({},
    bindActionCreators({ getAddresses }, dispatch),
    bindActionCreators({ getCards }, dispatch),
    bindActionCreators({ updateActiveSection }, dispatch),
    bindActionCreators({ placeOrder }, dispatch),
    bindActionCreators({ openDialog }, dispatch),
    bindActionCreators({ closeDialog }, dispatch),
    //MOCK
    bindActionCreators({ addProductToCart }, dispatch),
  );
}

export default withStyles(styles)((connect(
  mapStateToProps,
  mapDispatchToProps
)(Checkout)));