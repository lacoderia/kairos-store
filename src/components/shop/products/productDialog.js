import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Markup } from 'interweave';

import { withStyles } from '@material-ui/core/styles';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';

import { closeProductDialog } from './productsActions';
import { addProductToCart } from '../cart/cartActions';
import { Typography } from '@material-ui/core';

const styles = theme => ({
  overlay: {
    background: '#fafafa',
    bottom: 0,
    left: 0,
    opacity: '0.5',
    outline: 'none',
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: theme.zIndex.appBar + 1,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500],
  },
  leftColumn: {
    borderRight: '1px solid #ddd',
  },
  leftColumnContent: {
    textAlign: 'center',
    padding: 48,
  },
  rigthColumnContent: {
    padding: 48,
    paddingBottom: 60,
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  picture: {
    objectFit: 'cover',
    maxWidth: '100%',
  },
  title: {
    marginBottom: 24,
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

class ProductDialog extends React.Component {

  handleClose = () => {
    this.props.closeProductDialog();
  }

  handleAddToCart = () => {
    const product = this.props.product.toJS();

    const cartProduct = {
      id: product.id,
      title: product.title,
      price: product.price,
      picture: product.picture,
      quantity: 1,
    } 

    this.props.addProductToCart(cartProduct);
    this.props.closeProductDialog();
  }

  render() {
    const { classes, loading, open, fullScreen } = this.props;
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
            <IconButton aria-label="Close" className={classes.closeButton} onClick={this.handleClose}>
              <CloseIcon />
            </IconButton>
            <Grid container 
              justify="center"
            >
              <Grid item xs={12} md={6} className={classes.leftColumn}>
                <div className={classes.leftColumnContent}>
                  <img src={product.picture} className={classes.picture}></img>
                </div>
              </Grid>
              <Grid item xs={12} md={6}>
                <div className={classes.rigthColumnContent}>
                  <div className={classes.title}>
                    <Typography variant="h5" gutterBottom style={{ fontWeight: 500 }}>
                      {product.title}
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                      $ {product.price} MXN
                    </Typography>
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
              </Grid>
            </Grid>
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