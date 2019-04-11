import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { withStyles } from '@material-ui/core/styles';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import LinearProgress from '@material-ui/core/LinearProgress';

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

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class CustomDialog extends React.Component {

  render() {
    const { classes, loading, open, handleClose, fullScreen } = this.props;
    const disableFullScreen = this.props.disableFullScreen || false;
    const disableBackdropClick = this.props.disableBackdropClick || false;

    return (
      <Dialog
        fullScreen={disableFullScreen ? false : fullScreen}
        open={open}
        onClose={handleClose}
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

CustomDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

const mapStateToProps = function mapStateToProps(state, props) {
  return {};
};

function mapDispatchToProps(dispatch) {
  return {};
}
 
export default withStyles(styles)(withMobileDialog()(connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomDialog)));