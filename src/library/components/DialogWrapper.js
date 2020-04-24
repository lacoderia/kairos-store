import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { 
  Dialog,
  Slide,
  LinearProgress,
  withMobileDialog, 
  withStyles 
} from '@material-ui/core';

const styles = theme => ({
  overlay: {
    background: '#fafafa',
    bottom: 0,
    left: 0,
    opacity: '0.5',
    outline: 'none',
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: theme.zIndex.appBar + 1,
  },
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class DialogWrapper extends Component {

  onClose = () => {
    if(this.props.handleClose) {
      this.props.handleClose();
    }
  }

  onExited = () => {
    if(this.props.handleExited) {
      this.props.handleExited();
    }
  }

  render() {
    const { classes, loading, open, fullScreen } = this.props;
    const disableFullScreen = this.props.disableFullScreen || false;
    const disableBackdropClick = this.props.disableBackdropClick || false;

    return (
      <Dialog
        fullScreen={disableFullScreen ? false : fullScreen}
        open={open}
        onClose={this.onClose}
        onExited={this.onExited}
        TransitionComponent={Transition}
        disableRestoreFocus={true}
        disableBackdropClick={disableBackdropClick}
      >
        { loading && (
          <div className={classes.overlay}>
            <LinearProgress />
          </div>
        )}
        {this.props.children}
      </Dialog>
    );
  }
}

DialogWrapper.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};
 
export default withStyles(styles)(withMobileDialog()(DialogWrapper));