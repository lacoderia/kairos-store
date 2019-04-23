import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import WarningIcon from '@material-ui/icons/Warning';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import amber from '@material-ui/core/colors/amber';

const styles = theme => ({
  warning: {
    backgroundColor: amber[500],
  },
  icon: {
    fontSize: 20,
    opacity: 0.9,
    marginRight: theme.spacing.unit,
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

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

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
              <CloseIcon />
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
