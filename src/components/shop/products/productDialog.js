import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Markup } from 'interweave';
import CurrencyFormat from 'react-currency-format';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';

import { closeProductDialog } from './productsActions';
import { addProductToCart } from '../cart/cartActions';
import { Typography } from '@material-ui/core';

const styles = theme => ({
  flex: {
    flex: 1,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500],
  },
  columnContainer: {
    height: '100%',
    overflow: 'auto',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      flexDirection: 'row',
    } 
  },
  column: {
    borderRight: '1px solid #ddd',
    maxHeight: '100%',
    [theme.breakpoints.up('md')]: {
      flex: 1,
      overflow: 'auto',
    }
  },
  leftColumnContent: {
    textAlign: 'center',
    padding: 48,
    paddingBottom: 0,
    [theme.breakpoints.up('md')]: {
      paddingBottom: 48,
    }
  },
  rigthColumnContent: {
    flex: 1,
    padding: 48,
    paddingBottom: 60,
  },
  picture: {
    objectFit: 'cover',
    maxWidth: '60%',
    [theme.breakpoints.up('md')]: {
      maxWidth: '100%',
    }
  },
  title: {
    marginBottom: 24,
  },
  priceContainer: {
    display: 'flex',
    alignItems: 'baseline',
  },
  volume: {
    color: 'rgba(0, 0, 0, 0.54)',
    fontSize: '0.85rem',
  },
  descriptionContainer: {
    overflowY: 'auto',
  },
  buttonContainer: {
    marginTop: 24,
    textAlign: 'right',
    width: '100%',
  }
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class ProductDialog extends Component {

  handleClose = () => {
    this.props.closeProductDialog();
  }

  handleAddToCart = () => {
    const product = this.props.product.toJS();

    const cartProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      volume: product.volume,
      picture: product.picture,
      quantity: 1,
      displayQuantity: 1,
      showQuantityInput: false,
    } 

    this.props.addProductToCart(cartProduct);
    this.props.closeProductDialog();
  }

  render() {
    const { classes, open, fullScreen } = this.props;
    const product = this.props.product ? this.props.product.toJS() : undefined;

    return (
      <React.Fragment>
        { product && (
          <Dialog
            fullScreen={fullScreen}
            fullWidth={true}
            maxWidth="md"
            open={open}
            onClose={this.handleClose}
            TransitionComponent={Transition}
            disableRestoreFocus={true}
          >
            <div className={classes.columnContainer}>
              <IconButton aria-label="Close" className={classes.closeButton} onClick={this.handleClose}>
                <CloseIcon />
              </IconButton>
              <div className={classes.column}>
                <div className={classes.leftColumnContent}>
                  <img src={product.picture} className={classes.picture}></img>
                </div>
              </div>
              <div className={classes.column}>
                <div className={classes.rigthColumnContent}>
                  <div className={classes.title}>
                    <Typography variant="h5" gutterBottom style={{ fontWeight: 500 }}>
                      {product.name}
                    </Typography>
                    <div className={classes.priceContainer}>
                      <Typography variant="h5" component="span" className={classes.flex}>
                        <CurrencyFormat 
                          value={product.price} 
                          displayType={'text'} 
                          thousandSeparator={true} 
                          prefix={'$'} 
                          decimalScale={2}
                          fixedDecimalScale={true}
                        />
                      </Typography>
                      <Typography variant="h5" component="span" className={classNames(classes.flex, classes.volume)}>
                        {product.volume} VP
                      </Typography>
                    </div>
                  </div>
                  <div className={classes.descriptionContainer}>
                    <Typography variant="subtitle1" gutterBottom style={{ fontWeight: 500 }}>
                      Descripción
                    </Typography>
                    <Typography variant="body1" component="div" gutterBottom>
                      <Markup content={product.description} />
                    </Typography>
                  </div>
                  <div className={classes.buttonContainer}>
                    <Button 
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={this.handleAddToCart}
                    >
                      Agregar al carrito
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Dialog>
        )}
      </React.Fragment>
      
    );
  }
}

ProductDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

const mapStateToProps = function mapStateToProps(state, props) {
  return {
    open: state.get('products').get('openDialog'),
    product: state.get('products').get('selectedProduct'),
  };
};

function mapDispatchToProps(dispatch) {
  return Object.assign({},
    bindActionCreators({ closeProductDialog }, dispatch),
    bindActionCreators({ addProductToCart }, dispatch),
  );
}
 
export default withStyles(styles)(withMobileDialog()(connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDialog)));