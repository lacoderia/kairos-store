import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CurrencyFormat from 'react-currency-format';
import clsx from 'clsx';

import { 
  Grid,
  Typography,
  withStyles } from '@material-ui/core';

import ProductDialog from './productDialog';
import { getProducts, openProductDialog } from './productsActions';

const styles = theme => ({
  flex: {
    flex: 1,
  },
  root: {
    height: 'auto',
  },
  container: {
    padding: theme.spacing(4, 0),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(6),
    },
  },
  title: {
    fontWeight: 500,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(3),
    },
  },
  priceContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  volume: {
    color: 'rgba(0, 0, 0, 0.54)',
    textAlign: 'right',
  },
  product: {
    backgroundColor: '#fff',
    borderRadius: 4,
    boxShadow: '0 1px 1px 0 rgba(0,0,0,.1), 0 -1px 2px 0 rgba(0,0,0,.1)',
    color: '#333',
    cursor: 'pointer',
    overflow: 'hidden',
  },
  pictureContainer: {
    padding: 24,
    textAlign: 'center',
  },
  picture: {
    objectFit: 'cover',
    maxWidth: '100%',
  },
  info: {
    borderTop: '1px solid rgba(51,51,51,.1)',
    padding: 16,
  }
});

class Products extends Component {

  openProduct = (id) => {
    this.props.openProductDialog(id);
  }

  componentDidMount() {
    this.props.getProducts();
  }

  render() {
    const { classes } = this.props;
    const products = this.props.products ? this.props.products.toJS() : null;
    const productsIdArray = this.props.products ? Object.keys(products) : null;

    return (
      <Grid container 
        justify="center"
        className={clsx(classes.root, classes.container)}
      >
        <Grid item xs={12} xl={9}>
          <Typography variant="h5" className={classes.title}>
            Productos
          </Typography>
          <Grid container 
            justify="flex-start"
            spacing={2}
          >
            { productsIdArray?.map(id => {
              const product = products[id];

              return(
                <Grid item key={product.id} xs={6} md={4} lg={3}>
                  <div className={classes.product} onClick={() => this.openProduct(product.id)}>
                    <div className={classes.pictureContainer}>
                      <img src={product.picture} className={classes.picture}></img>
                    </div>
                    <div className={classes.info}>
                      <div className={classes.priceContainer}>
                        <Typography variant="h5" component="span">
                          <CurrencyFormat 
                            value={product.price} 
                            displayType={'text'} 
                            thousandSeparator={true} 
                            prefix={'$'} 
                            decimalScale={2}
                            fixedDecimalScale={true}
                          />
                        </Typography>
                        <Typography variant="body1" component="span" className={classes.volume}>
                          {product.volume} VP
                        </Typography>
                      </div>
                      <Typography variant="body1" className={classes.title}>
                        {product.name}
                      </Typography>
                      <div className={classes.actions}></div>
                    </div>
                  </div>
                </Grid>
              )
            })}
          </Grid>
          <ProductDialog />
        </Grid>
      </Grid>
    )
  }
  
};

const mapStateToProps = function mapStateToProps(state, props) {
  return {
    products: state.get('products').get('products'),
  };
};

function mapDispatchToProps(dispatch) {
  return Object.assign({},
    bindActionCreators({ getProducts }, dispatch),
    bindActionCreators({ openProductDialog }, dispatch),
  );
}

export default withStyles(styles)((connect(
  mapStateToProps,
  mapDispatchToProps
)(Products)));