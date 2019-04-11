import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { getProducts, getProductsMock, openProductDialog } from './productsActions';
import ProductDialog from './productDialog';

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
    this.props.getProductsMock();
  }

  render() {
    const { classes } = this.props;
    const products = this.props.products ? this.props.products.toJS() : null;
    const productsIdArray = this.props.products ? Object.keys(products) : null;

    return (
      <Grid container 
        justify="center"
        className={classNames(classes.root, classes.container)}
      >
        <Grid item xs={12} xl={9}>
          <Typography variant="h5" className={classes.title}>
            Productos
          </Typography>
          <Grid container 
            justify="flex-start"
            spacing={16}
          >
            { productsIdArray && productsIdArray.map(id => {
              const product = products[id];

              return(
                <Grid item key={product.id} xs={12} md={4} lg={3}>
                  <div className={classes.product} onClick={() => this.openProduct(product.id)}>
                    <div className={classes.pictureContainer}>
                      <img src={product.picture} className={classes.picture}></img>
                    </div>
                    <div className={classes.info}>
                      <Typography variant="h5" className={classes.price}>
                        $ {product.price}
                      </Typography>
                      <Typography variant="body1" className={classes.title}>
                        {product.title}
                      </Typography>
                      <div className={classes.actions}></div>
                    </div>
                  </div>
                  {product.name}
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
    bindActionCreators({ getProductsMock }, dispatch),
    bindActionCreators({ openProductDialog }, dispatch),
  );
}

export default withStyles(styles)((connect(
  mapStateToProps,
  mapDispatchToProps
)(Products)));