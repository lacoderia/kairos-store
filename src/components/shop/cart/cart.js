import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import { updateProductQuantity, removeProduct, addProductToCart } from '../cart/cartActions';

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
  noResultsText: {
    textAlign: 'center',
  },
  continueShoppingButton: {
    marginTop: 16,
  },
  upperCell: {
    borderBottom: 'none',
  },
  productContainer: {
    display: 'flex',
  },
  pictureContainer: {
    padding: 16,
    width: 150,
  },
  picture: {
    objectFit: 'cover',
    maxWidth: '100%',
  },
  productInfo: {
    padding: 16,
    display: 'flex',
    alignItems: 'center',
  },
  quiantityField: {
    width: 60,
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
  },
});

const CustomTableCell = withStyles(theme => ({
  head: {
    borderTop: '1px solid rgba(224, 224, 224, 1)',
    color: theme.palette.common.black,
    fontSize: 14,
    paddingBottom: 16,
    paddingTop: 16,
  },
  body: {
    fontSize: 13,
  },
}))(TableCell);

const quantities = [1,2,3,4,5,6,7,8,9,10];

class Cart extends Component {

  handleQuantityChange = (event, id) => {
    this.props.updateProductQuantity(id, event.target.value);
  };

  removeProduct = (event, id) => {
    event.preventDefault();
    this.props.removeProduct(id);
  }

  componentDidMount() {
    this.props.addProductToCart(
      {id: 10, title: "Madhuri Monk Fruit", price: 398, picture: "/images/shop/ayni-madhuri.png", quantity: 2}
    );
    this.props.addProductToCart(
      {id: 11, title: "Madhuri Monk Fruit", price: 398, picture: "/images/shop/ayni-madhuri.png", quantity: 1}
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
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <CustomTableCell>Producto</CustomTableCell>
                    <CustomTableCell align="right">Cantidad</CustomTableCell>
                    <CustomTableCell align="right">Precio</CustomTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {productsIdArray && productsIdArray.map(id => {
                    const product = products[id];

                    return(
                      <React.Fragment key={product.id}>
                        <TableRow>
                          <CustomTableCell component="th" scope="row" className={classes.upperCell}>
                            <div className={classes.productContainer}>
                              <div className={classes.pictureContainer}>
                                <img src={product.picture} className={classes.picture}></img>
                              </div>
                              <div className={classes.productInfo}>
                                <div>{product.title}</div>
                              </div>
                            </div>
                          </CustomTableCell>
                          <CustomTableCell align="right" className={classes.upperCell}>
                            <TextField
                              select
                              className={classes.quiantityField}
                              value={product.quantity}
                              onChange={(event) => this.handleQuantityChange(event, product.id)}
                              InputProps={{
                                classes: {
                                  inputMarginDense: classes.marginDense,
                                },
                              }}
                              margin="dense"
                              variant="outlined"
                            >
                              {quantities.map(quantity => (
                                <MenuItem key={quantity} value={quantity}>
                                  {quantity}
                                </MenuItem>
                              ))}
                            </TextField>
                          </CustomTableCell>
                          <CustomTableCell align="right" className={classes.upperCell}>$ {product.price * product.quantity} MXN</CustomTableCell>
                        </TableRow>
                        <TableRow>
                          <CustomTableCell align="right" colSpan={3}>
                            <Typography variant="body2" align="right">
                              <a 
                                aria-label="Delete item"
                                className={classes.deleteItemButton}
                                href="#"
                                onClick={(event) => this.removeProduct(event, product.id)}
                              >
                                Eliminar
                              </a>
                            </Typography>
                          </CustomTableCell>
                        </TableRow>
                      </React.Fragment>
                    )
                  })}
                </TableBody>
              </Table>
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
  );
}

export default withStyles(styles)((connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart)));