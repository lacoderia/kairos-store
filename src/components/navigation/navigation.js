import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { generateStoreUrl, getStoreAssetUrl } from 'services/store';
import clsx from 'clsx';

import { 
  Hidden,
  AppBar,
  Grid,
  Toolbar,
  Button,
  Typography,
  IconButton,
  withStyles
} from '@material-ui/core';
import { 
  Menu as MenuIcon,
  ShoppingCart as ShoppingCartIcon
} from '@material-ui/icons';

import { toggleMenu } from './navigationActions';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.custom.navigation + ' !important',
    zIndex: theme.zIndex.drawer + 1,
  },
  main: {
    width: '100%',
    [theme.breakpoints.up('lg')]: {
      width: '90%',
    },
    [theme.breakpoints.up('xl')]: {
      width: '75%',
    },
  },
  logoContainer: {
    flex: 1,
  },
  logo: {
    display: 'inline-block',
  },
  img: {
    height: 40,
  },
  menuButton: {
    margin: 0,
  },
  actionButton: {
    backgroundColor: theme.palette.primary.dark,
    '&:hover': {
      backgroundColor: '#27648C',
    },
  },
  cartButton: {
    margin: 0,
    color: 'white',
  },
  cartText: {
    color: 'white',
    marginLeft: 8,
  },
  cartButtonWithItems: {
    backgroundColor: theme.palette.custom.cartButton,
  }
});

class Navigation extends Component {

  toggleMenu = event => {
    this.props.toggleMenu();
  };

  render() {
    const { classes, isAuthenticated } = this.props;
    const productsCount = this.props.products.reduce((sum, item) => sum + item.get('quantity'), 0);

    return (
      <AppBar 
        position="relative"
        elevation={0}
        className={classes.root}
      >
        <Grid container justify="center">
          <Grid item className={classes.main}>
            <Toolbar>
              <div className={classes.logoContainer}>
                <Link to={generateStoreUrl('/')} className={classes.logo}>
                  <img src={getStoreAssetUrl('images', 'logo.png')} className={classes.img} alt="Logo Tienda"/>
                </Link>
              </div>
              <Hidden mdUp>
                {isAuthenticated && (
                  <div>
                    <IconButton
                      aria-label="Menu"
                      onClick={this.toggleMenu}
                      className={classes.menuButton}
                      color="inherit"
                    >
                      <MenuIcon />
                    </IconButton>
                  </div>
                )}
              </Hidden>
              { isAuthenticated && (
                <Button 
                  component={Link} 
                  to={generateStoreUrl('/cart')}
                  aria-label="Cart"
                  className={clsx(
                    classes.cartButton,
                    productsCount > 0 ? classes.cartButtonWithItems : undefined
                  )}
                >
                  <ShoppingCartIcon />
                  <Typography variant="h6" className={classes.cartText}>{productsCount}</Typography>
                </Button>
              )}
            </Toolbar>
          </Grid>
        </Grid>
      </AppBar>
    );
  }
}

const mapStateToProps = function mapStateToProps(state, props) {
  return {
    isAuthenticated: state.get('session').get('isAuthenticated'),
    products: state.get('cart').get('products'),
  };
};

function mapDispatchToProps(dispatch) {
  return Object.assign({},
    bindActionCreators({ toggleMenu }, dispatch),
  );
}

export default withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation));
