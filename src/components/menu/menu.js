import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { generateStoreUrl, getStoreAssetUrl } from 'services/store';
import { CONTACT_EMAIL } from 'res/constants';

import { 
  Hidden,
  Drawer,
  Typography,
  Divider,
  List,
  MenuItem,
  ListItemIcon,
  ListItemText,
  withStyles
} from '@material-ui/core';
import {
  LocalMallOutlined as ProductsIcon,
  HomeOutlined as AddressIcon,
  CreditCardOutlined as PaymentMethodsIcon,
  AssignmentOutlined as OrdersIcon,
  ExitToAppOutlined as ExitToAppIcon
} from '@material-ui/icons';

import ThreeBounceLoader from 'library/components/Loader/ThreeBounceLoader';
import { toggleMenu } from 'components/navigation/navigationActions';
import { signout } from 'http/sessionActions';

const styles = theme => ({
  root: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
  drawer: {
    height: '100%',
  },
  drawerPaper: {
    position: 'relative',
    width: 280,
  },
  profile: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(4, 3),
    paddingRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  profileText: {
    color: 'black',
  },
  menuItem: {
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  selectedMenuItem: {
    backgroundColor: `${theme.palette.secondary.main} !important`,
    '& span': {
      color: theme.palette.custom.white,
    },
    '& svg': {
      color: theme.palette.custom.white
    }
  },
  editIcon: {
    color: 'black',
    marginLeft: 'auto',
  },
  terms: {
    marginTop: 'auto',
  },
  footerItem: {
    padding: theme.spacing(1, 3),
    paddingTop: 0,
  },
  link: {
    color: theme.palette.custom.darkGrey,
    textDecoration: 'none',
    '&:hover': {
      color: theme.palette.custom.darkBlue,
    },
  },
});

const menu = [
  {
    id: 0,
    label: 'Productos',
    icon: <ProductsIcon />,
    route: '/shop',
    matchingRoutes: ['/shop'],
    value: 0,
  },
  {
    id: 1,
    label: 'Pedidos',
    icon: <OrdersIcon />,
    route: '/orders',
    matchingRoutes: ['/orders'],
    value: 1,
  },
  {
    id: 2,
    label: 'Direcciones',
    icon: <AddressIcon />,
    route: '/addresses',
    matchingRoutes: ['/addresses'],
    value: 2,
  },
  {
    id: 3,
    label: 'Métodos de pago',
    icon: <PaymentMethodsIcon />,
    route: '/payment-methods',
    matchingRoutes: ['/payment-methods'],
    value: 3,
  },
]

class Menu extends Component {
  state = {
    selectedMenu: undefined
  }

  toggleMenu = () => {
    this.props.toggleMenu();
  }

  handleMenuItemClick = route => {
    this.toggleMenu();
    this.props.history.push(generateStoreUrl(route));
  }

  handleSignoutClick = () => {
    this.props.signout()
    .then(response => {
      this.toggleMenu();
    })
    .catch(e => {});
  }

  setMenuValue = () => {
    const { location } = this.props;

    menu.map(item => {
      item.matchingRoutes.map(route => {
        if (location.pathname.includes(route)) {
          this.setState({selectedMenu: item.value});
        }
      })
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setMenuValue();
    }
  }

  componentDidMount() {
    this.setMenuValue();
  }
  
  render() {
    const { classes, mobileOpen, loading, name, lastname, externalId } = this.props;

    const drawer = (
      <div className={classes.root}>
        <div>
          <div className={classes.profile}>
            <Typography variant="body2" className={classes.profileText}>
              {name} {lastname}
            </Typography>
            <Typography variant="caption" noWrap className={classes.profileText}>
              Id: {externalId}
            </Typography>
          </div>
          <Divider />
          <List>
            { menu.map(item => {
              return(
                <MenuItem 
                  button 
                  selected={this.state.selectedMenu == item.value}
                  onClick={() => this.handleMenuItemClick(item.route)}
                  key={item.id}
                  classes={{
                    selected: classes.selectedMenuItem,
                  }}
                  className={classes.menuItem}
                >
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.label} />
                </MenuItem>
              )
            })}
          </List>
          <Divider />
          <List>
            <MenuItem 
              button 
              onClick={this.handleSignoutClick} 
              classes={{
                selected: classes.selectedMenuItem,
              }}
              className={classes.menuItem}
            >
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Salir" />
              { loading && (
                <ThreeBounceLoader />
              )}
            </MenuItem>
          </List>
        </div>
        <div className={classes.terms}>
          <Typography variant="body1" align="right" className={classes.footerItem}>
            Teléfono: <a href={'tel:5556694370'} className={classes.link}>(55) 5669 4370</a>
          </Typography>
          <Typography variant="body1" align="right" className={classes.footerItem} gutterBottom>
            <a href={'mailto:' + CONTACT_EMAIL} className={classes.link}>{CONTACT_EMAIL}</a>
          </Typography>
          <Typography variant="body1" align="right" className={classes.footerItem}>
            <a href={getStoreAssetUrl('docs', 'terminos-y-condiciones.pdf')} target="_blank" className={classes.link}>
              Términos y condiciones
            </a>
          </Typography>
          <Typography variant="body1" align="right" className={classes.footerItem} gutterBottom>
            <a href={getStoreAssetUrl('docs', 'aviso-de-privacidad.pdf')} target="_blank" className={classes.link}>
              Aviso de privacidad
            </a>
          </Typography>
        </div>
      </div>
    );

    return (
      <>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClose={this.toggleMenu}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper,
            }}
            className={classes.drawer}
          >
            {drawer}
          </Drawer>
        </Hidden>
      </>
    )
  }
}

const mapStateToProps = function mapStateToProps(state, props) {
  return {
    mobileOpen: state.get('navigation').get('mobileOpen'),
    loading: state.get('session').get('loading'),
    name: state.get('session').get('name'),
    lastname: state.get('session').get('lastname'),
    externalId: state.get('session').get('externalId'),
  };
};

function mapDispatchToProps(dispatch) {
  return Object.assign({},
    bindActionCreators({ toggleMenu }, dispatch),
    bindActionCreators({ signout }, dispatch),
  );
}

export default withStyles(styles)(withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu)));