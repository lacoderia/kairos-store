import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { getOrders, getOrdersMock } from './ordersActions';

const styles = theme => ({
  flex: {
    flex: 1
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
    border: `1px solid rgba(0, 0, 0, 0.12)`,
    padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 1.5}px`,
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.spacing.unit * 5}px ${theme.spacing.unit * 6}px`,
    },
  },
  noResultsText: {
    textAlign: 'center',
  },
  goShoppingButton: {
    marginTop: 16,
  },
  order: {
    border: '1px solid rgba(0, 0, 0, 0.08)',
    borderRadius: 4,
    marginBottom: 16,
  },
  orderHeader: {
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
    borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px`,
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px`,
    }
  },
  orderSubheader: {
    display: 'flex',
  },
  orderBody: {
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px`,
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px`,
    }
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
    alignItems: 'center',
  },
  orderFooter: {
    display: 'flex',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px`,
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px`,
    }
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
});

class Orders extends Component {

  componentDidMount() {
    this.props.getOrdersMock();
  }

  render() {
    const { classes } = this.props;
    const orders = this.props.orders ? this.props.orders.toJS() : null;
    const ordersIdArray = this.props.orders ? Object.keys(orders) : [];

    return (
      <React.Fragment>
        <Typography variant="h5" className={classes.title}>
          Pedidos
        </Typography>
        <Paper elevation={0} className={classes.paper}>
          { ordersIdArray.length > 0 ? (
            <React.Fragment>
              {ordersIdArray && ordersIdArray.map(id => {
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
                        <div className={classes.flex}>
                          <Typography variant="body1" className={classes.dataTitle}>
                            Realizado el:
                          </Typography>
                          <Typography variant="body1" className={classes.data}>
                            <Moment format="DD MMMM">{order.createdAt}</Moment>
                          </Typography>
                        </div>
                        <div className={classes.flex}>
                          <Typography variant="body1" className={classes.dataTitle}>
                            Total:
                          </Typography>
                          <Typography variant="body1" className={classes.data}>
                            ${order.total} MXN
                          </Typography>
                        </div>
                      </div>
                    </div>
                    <div className={classes.orderBody}>
                      <Typography variant="h6" className={classes.dataTitle}>
                        {order.status}
                      </Typography>
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
                                Cant. {product.quantity}
                              </Typography>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                    <div className={classes.orderFooter}>
                      <div className={classNames(classes.flex, classes.lightGreyText)}>
                        <Typography variant="body1" className={classes.dataTitle}>
                          Dirección de entrega
                        </Typography>
                        <Typography variant="body1" color="inherit">
                          {order.shippingAddress.address}
                        </Typography>
                        <Typography variant="body1" color="inherit">
                          {order.shippingAddress.city}, {order.shippingAddress.state}
                        </Typography>
                        <Typography variant="body1" color="inherit">
                          {order.shippingAddress.zip}
                        </Typography>
                        <Typography variant="body1" color="inherit">
                          {order.shippingAddress.country}
                        </Typography>
                      </div>
                      <div className={classNames(classes.flex, classes.lightGreyText)}>
                        <Typography variant="body1" className={classes.dataTitle}>
                          Método de pago
                        </Typography>
                      </div>
                    </div>
                  </div>
                )
              })}
            </React.Fragment>
          ) : (
            <div className={classes.noResultsText}>
              <Typography variant="subtitle1" gutterBottom>
                Aún no has levantado ningún pedido
              </Typography>
              <Button 
                component={Link}
                to="/shop"
                aria-label="Go shopping"
                variant="contained"
                color="primary"
                className={classes.goShoppingButton}
              >
                Ver productos
              </Button>
            </div>
          )}
        </Paper>
      </React.Fragment>
    )
  }
  
};

const mapStateToProps = function mapStateToProps(state, props) {
  return {
    orders: state.get('orders').get('orders'),
  };
};

function mapDispatchToProps(dispatch) {
  return Object.assign({},
    bindActionCreators({ getOrders }, dispatch),
    bindActionCreators({ getOrdersMock }, dispatch),
  );
}

export default withStyles(styles)((connect(
  mapStateToProps,
  mapDispatchToProps
)(Orders)));