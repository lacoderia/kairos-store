import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
import { generateStoreUrl } from 'services/store';

import { 
  Paper,
  Typography,
  Button,
  TextField,
  MenuItem,
  withStyles
} from '@material-ui/core';

import {
  removeProduct, 
  updateProductQuantity, 
  updateProductDisplayQuantity,
  resetProductQuantity,
} from './cartActions';

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
      padding: theme.spacing(5, 4),
    },
  },
  noResultsText: {
    textAlign: 'center',
  },
  continueShoppingButton: {
    marginTop: 16,
  },
  productListHeader: {
    display: 'none',
    paddingLeft: 16,
    paddingRight: 16,
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
  },
  productListCell70: {
    [theme.breakpoints.up('sm')]: {
      textAlign: 'right',
    },
    width: 70,
  },
  productListCell100: {
    [theme.breakpoints.up('sm')]: {
      textAlign: 'right',
    },
    width: 100,
  },
  productListCell120: {
    [theme.breakpoints.up('sm')]: {
      textAlign: 'right',
    },
    width: 120,
  },
  productContainer: {
    display: 'flex',
  },
  pictureContainer: {
    marginRight: 24,
    padding: 8,
    width: 100,
  },
  picture: {
    objectFit: 'cover',
    maxWidth: '100%',
  },
  productInfo: {
    alignItems: 'baseline',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    padding: 16,
    [theme.breakpoints.up('sm')]: {
      alignItems: 'center',
      flexDirection: 'row',
    },
  },
  productTitle: {
    flex: 1,
  },
  productQuantityContainer: {
    width: 120,
    [theme.breakpoints.up('sm')]: {
      textAlign: 'right',
    }
  },
  productQuantity: {
    width: 60,
  },
  menuItem: {
    '&:last-child': {
      borderTop: '1px solid rgba(0, 0, 0, 0.12)',
    },
  },
  input: {
    textAlign: 'center',
  },
  productPrice: {
    color: theme.palette.primary.dark,
    fontWeight: 500,
    width: 100,
  },
  marginDense: {
    paddingBottom: 8,
    paddingTop: 8,
  },
  deleteItemButton: {
    color: theme.palette.custom.mediumGrey,
    '&:hover': {
      color: theme.palette.custom.darkBlue,
    },
    display: 'block',
    width: 100,
    [theme.breakpoints.up('sm')]: {
      textAlign: 'right',
    }
  },
});

const quantities = [1,2,3,4,5,6,7,8,9,'10 +'];

class Cart extends Component {

  handleDisplayQuantityChange = (event, id) => {
    this.props.updateProductDisplayQuantity(id, event.target.value);
  };

  handleQuantityChange = (event, id) => {
    const quantity = parseInt(event.target.value);

    this.props.updateProductQuantity(id, quantity);
    if (quantity == 10) {
      this.props.updateProductDisplayQuantity(id, quantity);
    }
  };

  handleQuantityChangeBlur = (event, id) => {
    const quantity = parseInt(event.target.value);

    if (isNaN(quantity)) {
      this.props.resetProductQuantity(id);
    } else {
      if(quantity === 0) {
        this.props.removeProduct(id);
      } else {
        this.props.updateProductQuantity(id, parseInt(event.target.value));
      }
    }
  };

  handleQuantityChangeKeyPress = (event, id) => {
    if(event.keyCode == 13){
      event.target.blur();
    }
  };

  removeProduct = (event, id) => {
    event.preventDefault();
    this.props.removeProduct(id);
  }

  render() {
    const { classes } = this.props;
    const products = this.props.products ? this.props.products.toJS() : null;
    const productsIdArray = this.props.products ? Object.keys(products) : [];
    const productsCount = this.props.products.reduce((sum, item) => sum + item.get('quantity'), 0);

    return (
      <>
        <div className={classes.title}>
          <Typography variant="h5" component="span">
            Carrito
          </Typography>
          <Typography variant="body1" component="span" style={{ marginLeft: 8 }}>
            ({productsCount} {productsCount == 1 ? 'producto' : 'productos'})
          </Typography>
        </div>
        <Paper elevation={0} className={classes.paper}>
          { productsIdArray.length > 0 ? (
            <div className={classes.productList}>
              <div className={classes.productListHeader}>
                <div className={classes.productTitle} />
                <div className={classes.productListCell100}>
                  <Typography variant="body1">
                    Precio
                  </Typography>
                </div>
                <div className={classes.productListCell120}>
                  <Typography variant="body1">
                    Cant.
                  </Typography>
                </div>
                <div className={classes.productListCell100} />
              </div>
              { productsIdArray?.map(id => {
                const product = products[id];

                return(
                  <div key={product.id} className={classes.productContainer}>
                    <div className={classes.pictureContainer}>
                      <img src={product.picture} className={classes.picture}></img>
                    </div>
                    <div className={classes.productInfo}>
                      <Typography variant="body1" className={classes.productTitle}>
                        {product.name}
                      </Typography>
                      <Typography variant="body1" className={classes.productListCell70}>
                        {product.volume * product.quantity} VP
                      </Typography>
                      <Typography variant="body1" className={classes.productListCell100}>
                        <CurrencyFormat 
                          value={product.price * product.quantity} 
                          displayType={'text'} 
                          thousandSeparator={true} 
                          prefix={'$'} 
                          decimalScale={2}
                          fixedDecimalScale={true}
                          className={classes.productPrice}
                        />
                      </Typography>
                      <div className={classes.productQuantityContainer}>
                        {product.quantity < 10 && (
                          <TextField
                            select
                            value={product.quantity}
                            onChange={(event) => this.handleQuantityChange(event, product.id)}
                            InputProps={{
                              classes: {
                                inputMarginDense: classes.marginDense,
                              },
                            }}
                            margin="dense"
                            variant="outlined"
                            className={classes.productQuantity}
                          >
                            {quantities.map(quantity => (
                              <MenuItem key={quantity} value={quantity} className={classes.menuItem}>
                                {quantity}
                              </MenuItem>
                            ))}
                          </TextField>
                        )}
                        {product.quantity >= 10 && (
                          <CurrencyFormat
                            customInput={TextField}
                            value={product.displayQuantity}
                            onChange={(event) => this.handleDisplayQuantityChange(event, product.id)}
                            onBlur={(event) => this.handleQuantityChangeBlur(event, product.id)}
                            onKeyDown={(event) => this.handleQuantityChangeKeyPress(event, product.id)}
                            InputProps={{
                              classes: {
                                inputMarginDense: classes.marginDense,
                              },
                            }}
                            inputProps={{
                              className: classes.input
                            }}
                            margin="dense"
                            variant="outlined"
                            className={classes.productQuantity}
                          />
                        )}
                      </div>
                      <Typography variant="body2">
                        <a 
                          aria-label="Delete item"
                          className={classes.deleteItemButton}
                          href="#"
                          onClick={(event) => this.removeProduct(event, product.id)}
                        >
                          Eliminar
                        </a>
                      </Typography>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className={classes.noResultsText}>
              <Typography variant="subtitle1" gutterBottom>
                Tu carrito de compras está vacio
              </Typography>
              <Button 
                component={Link}
                to={generateStoreUrl('/shop')}
                aria-label="Continue shopping"
                variant="contained"
                color="primary"
                className={classes.continueShoppingButton}
              >
                Continuar comprando
              </Button>
            </div>
          )}
          
        </Paper>
      </>
    )
  }
  
};

const mapStateToProps = function mapStateToProps(state, props) {
  return {
    products: state.get('cart').get('products'),
  };
};

function mapDispatchToProps(dispatch) {
  return Object.assign({},
    bindActionCreators({ removeProduct }, dispatch),
    bindActionCreators({ updateProductQuantity }, dispatch),
    bindActionCreators({ updateProductDisplayQuantity }, dispatch),
    bindActionCreators({ resetProductQuantity }, dispatch),
  );
}

export default withStyles(styles)((connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart)));