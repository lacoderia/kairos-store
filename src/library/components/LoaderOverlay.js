import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { LinearProgress, withStyles } from '@material-ui/core';

const styles = theme => ({
  overlay: {
    background: '#fafafa',
    bottom: 0,
    left: 0,
    opacity: '0.5',
    outline: 'none',
    position: 'absolute',
    top: 5,
    width: '100%',
    zIndex: theme.zIndex.snackbar + 1,
  },
  progress: {
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: theme.zIndex.snackbar + 2,
  }
});

class LoaderOverlay extends Component {

  render(){
    const { classes, loading } = this.props;

    return(
      <>
        { loading && (
          <>
            <LinearProgress className={classes.progress}/>
            <div className={classes.overlay}></div>
          </>
        )}
      </>
    )
  }
}

LoaderOverlay.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default withStyles(styles)(LoaderOverlay);