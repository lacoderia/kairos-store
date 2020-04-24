import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { 
  Snackbar,
  SnackbarContent,
  IconButton,
  Slide,
  withStyles } from '@material-ui/core';
import {
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  Close
} from '@material-ui/icons';
import amber from '@material-ui/core/colors/amber';

const styles = theme => ({
  warning: {
    backgroundColor: amber[500],
  },
  icon: {
    fontSize: 20,
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  title: {
    fontWeight: 500,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
  offset: {
    [theme.breakpoints.down('sm')]: {
      bottom: 60,
    },
  },
  clickable: {
    cursor: 'pointer',
  },
  notClickable: {
    cursor: 'default'
  }
});

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class SnackbarNotification extends Component {

  handleClose = (event, reason) => {
    event.stopPropagation();

    if (reason === 'clickaway') {
      return;
    }
    this.props.handleClose();
  }

  render() {
    const { classes, title, message, open, showIcon, variant, handleExited, handleClick } = this.props;
    const Icon = variantIcon[variant];

    return(
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={open}
        onClose={this.handleClose}
        onExited={handleExited}
        onClick={handleClick}
        TransitionComponent={Transition}
      >
        <SnackbarContent 
          aria-describedby="notification-snackbar"
          message={
            <div id="notification-snackbar" className={classes.message}>
              {showIcon && <Icon className={classes.icon} />}
              <div>
                <div className={classes.title}>{title}</div>
                <div>{message}</div>
              </div>  
            </div>
          }
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <Close />
            </IconButton>,
          ]}
          className={classes[variant]}
        />
      </Snackbar>
    )
  }
}

SnackbarNotification.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string,
  message: PropTypes.string,
  open: PropTypes.bool,
  showIcon: PropTypes.bool,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
  handleClose: PropTypes.func,
  handleExited: PropTypes.func,
};

export default withStyles(styles)(SnackbarNotification);
