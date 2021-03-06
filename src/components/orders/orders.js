import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import CurrencyFormat from 'react-currency-format';
import clsx from 'clsx';
import { generateStoreUrl } from 'services/store';

import {
  Paper,
  Typography,
  Button,
  CircularProgress,
  withStyles
} from '@material-ui/core';

import { getOrders } from './ordersActions';

const styles = theme => ({
  flex: {
    flex: 1
  },
  title: {
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
  goShoppingButton: {
    marginTop: 16,
  },
  order: {
    backgroundColor: '#fff',
    borderRadius: 4,
    boxShadow: '0 1px 1px 0 rgba(0,0,0,.1), 0 -1px 2px 0 rgba(0,0,0,.1)',
    marginBottom: 16,
    overflow: 'hidden',
  },
  orderHeader: {
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(2, 3),
    }
  },
  orderSubheader: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  orderBody: {
    borderTop: '1px solid rgba(0, 0, 0, 0.08)',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      padding: theme.spacing(2, 3),
    },
  },
  productList: {
    flex: 1,
    flexGrow: 2,
  },
  orderSidebar: {
    flex: 1,
  },
  productContainer: {
    display: 'flex',
  },
  pictureContainer: {
    padding: 16,
    width: 100,
  },
  picture: {
    objectFit: 'cover',
    maxWidth: '100%',
  },
  productInfo: {
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  status: {
    marginBottom: 16,
  },
  lightGreyText: {
    color: 'rgba(0, 0, 0, 0.54)',
  },
  dataTitle: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontWeight: 500,
  },
  data: {
    color: 'rgba(0, 0, 0, 0.87)',
  },
  loaderContainer: {
    padding: theme.spacing(5),
    textAlign: 'center',
    width: '100%',
  },
  errorContainer: {
    color: theme.palette.error.main,
    padding: theme.spacing(5, 4),
    textAlign: 'center',
    width: '100%',
  },
  errorText: {
    color: theme.palette.error.main,
  },
  noResultsContainer: {
    border: `1px solid ${theme.palette.custom.lightGrey}`,
    padding: theme.spacing(3, 4),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(5, 6),
    },
  },
  noResultsText: {
    textAlign: 'center',
  },
});

class Orders extends Component {

  componentDidMount() {
    this.props.getOrders();
  }

  render() {
    const { classes, loading, error } = this.props;
    const orders = this.props.orders ? this.props.orders.toJS() : null;
    const ordersIdArray = this.props.orders ? Object.keys(orders) : [];

    return (
      <>
        <Typography variant="h5" className={classes.title}>
          Pedidos
        </Typography>
        { ordersIdArray.length > 0 ? (
          <>
            { ordersIdArray?.map(id => {
              const order = orders[id];

              return(
                <div className={classes.order} key={order.id}>
                  <div className={classes.orderHeader}>
                    <div>
                      <Typography variant="body1" className={classes.lightGreyText} gutterBottom>
                        Pedido no. {order.number}
                      </Typography>
                    </div>
                    <div className={classes.orderSubheader}>
                      <div>
                        <Typography variant="body1" className={classes.dataTitle}>
                          Realizado el:
                        </Typography>
                        <Typography variant="body1" className={classes.data}>
                          <Moment format="DD/MM/YYYY">{order.createdAt}</Moment>
                        </Typography>
                      </div>
                      <div>
                        <Typography variant="body1" className={classes.dataTitle}>
                          VP:
                        </Typography>
                        <Typography variant="body1" className={classes.data}>
                          {order.volume}
                        </Typography>
                      </div>
                      <div>
                        <Typography variant="body1" className={classes.dataTitle}>
                          Total:
                        </Typography>
                        <Typography variant="body1" className={classes.data}>
                          <CurrencyFormat 
                            value={order.total} 
                            displayType={'text'} 
                            thousandSeparator={true} 
                            prefix={'$'} 
                            decimalScale={2}
                            fixedDecimalScale={true}
                          />
                        </Typography>
                      </div>
                    </div>
                  </div>
                  <div className={classes.orderBody}>
                    <div className={classes.productList}>
                      {order.status && (
                        <Typography variant="h6" className={clsx(classes.status, classes.dataTitle)}>
                          {order.status}
                        </Typography>
                      )}
                      {order.products && order.products.map(product => {
                        return(
                          <div key={product.id} className={classes.productContainer}>
                            <div className={classes.pictureContainer}>
                              <img src={product.picture} className={classes.picture}></img>
                            </div>
                            <div className={classes.productInfo}>
                              <Typography variant="body1">
                                {product.name}
                              </Typography>
                              <Typography variant="body2" className={classes.data}>
                                ${product.price} x {product.quantity}
                              </Typography>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                    {order.shippingAddress && (
                      <div className={classes.orderSidebar}>
                        <div className={clsx(classes.flex, classes.lightGreyText)}>
                          <Typography variant="body1" className={classes.dataTitle}>
                            Dirección de entrega
                          </Typography>
                          <Typography variant="body2" color="inherit">
                            {order.shippingAddress.name}
                          </Typography>
                          <Typography variant="body2" color="inherit">
                            {order.shippingAddress.address}
                          </Typography>
                          {order.shippingAddress.streets && (
                            <Typography variant="body2" color="inherit">
                              Entre: {order.shippingAddress.streets}
                            </Typography>
                          )}
                          <Typography variant="body2" color="inherit">
                            {order.shippingAddress.reference}
                          </Typography>
                          <Typography variant="body2" color="inherit">
                            {order.shippingAddress.city}, {order.shippingAddress.state}
                          </Typography>
                          <Typography variant="body2" color="inherit">
                            {order.shippingAddress.zip}, {order.shippingAddress.country}
                          </Typography>
                          {order.shippingAddress.phone && (
                            <Typography variant="body2" color="inherit">
                              Teléfono: {order.shippingAddress.phone}
                            </Typography>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </>
        ) : (
          <Paper elevation={0} className={classes.noResultsContainer}>
            {loading ? (
              <div className={classes.loaderContainer}>
                <CircularProgress size={40} />
              </div>
            ) : (
              error ? (
                <div className={classes.errorContainer}>
                  <Typography variant="body2" className={classes.errorText}>{error}</Typography>
                </div>
              ) : (
                <div className={classes.noResultsText}>
                  <Typography variant="subtitle1" gutterBottom>
                    Aún no has levantado ningún pedido
                  </Typography>
                  <Button 
                    component={Link}
                    to={generateStoreUrl('/shop')}
                    aria-label="Continue shopping"
                    variant="contained"
                    color="primary"
                    className={classes.goShoppingButton}
                  >
                    Ver productos
                  </Button>
                </div>
              )
            )}
          </Paper>
        )}
      </>
    )
  }
  
};

const mapStateToProps = function mapStateToProps(state, props) {
  return {
    orders: state.get('orders').get('orders'),
    loading: state.get('orders').get('loading'),
    error: state.get('orders').get('error'),
  };
};

function mapDispatchToProps(dispatch) {
  return Object.assign({},
    bindActionCreators({ getOrders }, dispatch),
  );
}

export default withStyles(styles)((connect(
  mapStateToProps,
  mapDispatchToProps
)(Orders)));