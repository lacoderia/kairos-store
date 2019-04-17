import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import { 
  updateProductQuantity, 
  updateProductDisplayQuantity, 
  removeProduct, 
  addProductToCart 
} from '../cart/cartActions';

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
      padding: `${theme.spacing.unit * 5}px ${theme.spacing.unit * 4}px`,
    },
  },
  noResultsText: {
    textAlign: 'center',
  },
  continueShoppingButton: {
    marginTop: 16,
  },
  productListHeader: {
    display: 'flex',
    paddingLeft: 16,
    paddingRight: 16,
  },
  productListHeaderCell100: {
    textAlign: 'right',
    width: 100,
  },
  productListHeaderCell120: {
    textAlign: 'right',
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
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    padding: 16,
  },
  productTitle: {
    flex: 1,
  },
  productQuantityContainer: {
    textAlign: 'right',
    width: 120,
  },
  productQuantity: {
    width: 60,
  },
  input: {
    textAlign: 'center',
  },
  productPrice: {
    color: theme.palette.primary.dark,
    fontWeight: 500,
    marginLeft: 40,
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
    textAlign: 'right',
    width: 100,
  },
});

const quantities = [1,2,3,4,5,6,7,8,9,10];

class Cart extends Component {

  handleDisplayQuantityChange = (event, id) => {
    this.props.updateProductDisplayQuantity(id, event.target.value);
  };

  handleQuantityChange = (event, id) => {
    if(event.target.value) {
      this.props.updateProductQuantity(id, parseInt(event.target.value));
    } else {
      this.props.removeProduct(id);
    }
    
  };

  handleQuantityChangeKeyPress = (event, id) => {
    if(event.keyCode == 13){
      this.props.updateProductQuantity(id, parseInt(event.target.value));
      event.target.blur();
    }
  };

  removeProduct = (event, id) => {
    event.preventDefault();
    this.props.removeProduct(id);
  }

  componentDidMount() {
    // MOCK
    this.props.addProductToCart(
      {id: 10, title: "Madhuri Monk Fruit", price: 398, picture: "/images/shop/ayni-madhuri.png", quantity: 12, displayQuantity: 12}
    );
    this.props.addProductToCart(
      {id: 11, title: "Madhuri Monk Fruit", price: 398, picture: "/images/shop/ayni-madhuri.png", quantity: 1, displayQuantity: 1}
    )
  }

  render() {
    const { classes } = this.props;
    const products = this.props.products ? this.props.products.toJS() : null;
    const productsIdArray = this.props.products ? Object.keys(products) : [];
    const cartProductsTotal = this.props.products.reduce((sum, item) => sum + item.get('quantity'), 0);

    return (
      <Grid container 
        justify="center"
        className={classNames(classes.root, classes.container)}
      >
        <Grid item xs={12} xl={9}>
          <div className={classes.title}>
            <Typography variant="h5" style={{ display: 'inline-block' }}>
              Carrito
            </Typography>
            <Typography variant="body1" style={{ display: 'inline-block', marginLeft: 8 }}>
              ({cartProductsTotal} {cartProductsTotal == 1 ? 'producto' : 'productos'})
            </Typography>
          </div>
          <Paper elevation={0} className={classes.paper}>
            { productsIdArray.length > 0 ? (
              <div className={classes.productList}>
                <div className={classes.productListHeader}>
                  <div className={classes.productTitle} />
                  <div className={classes.productListHeaderCell100}>
                    <Typography variant="body1">
                      Precio
                    </Typography>
                  </div>
                  <div className={classes.productListHeaderCell120}>
                    <Typography variant="body1">
                      Cant.
                    </Typography>
                  </div>
                  <div className={classes.productListHeaderCell100} />
                </div>
                {productsIdArray && productsIdArray.map(id => {
                  const product = products[id];

                  return(
                    <div key={product.id} className={classes.productContainer}>
                      <div className={classes.pictureContainer}>
                        <img src={product.picture} className={classes.picture}></img>
                      </div>
                      <div className={classes.productInfo}>
                        <Typography variant="body1" className={classes.productTitle}>
                          {product.title}
                        </Typography>
                        <Typography variant="body1">
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
                                <MenuItem key={quantity} value={quantity}>
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
                              onBlur={(event) => this.handleQuantityChange(event, product.id)}
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
                  to="/shop"
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
        </Grid>
      </Grid>
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
    bindActionCreators({ addProductToCart }, dispatch),
    bindActionCreators({ removeProduct }, dispatch),
    bindActionCreators({ updateProductQuantity }, dispatch),
    bindActionCreators({ updateProductDisplayQuantity }, dispatch),
  );
}

export default withStyles(styles)((connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart)));