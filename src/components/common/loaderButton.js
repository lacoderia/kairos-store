import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = theme => ({
  buttonContainer: {
    display: 'inline-block',
    position: 'relative'
  },
  loaderContainer: {
    position: 'absolute',
    bottom: 1,
    left: 4,
    width: `calc(100% - 8px)`,
  },
  loader: {
    height: '2px'
  }
});

class LoaderButton extends Component {

  render(){
    const { classes, loading } = this.props;

    return(
      <div className={classes.buttonContainer}>
        {this.props.children}
        <Fade
          in={loading}
          style={{
            transitionDelay: loading ? '500ms' : '0ms',
          }}
          unmountOnExit
        >
          <div className={classes.loaderContainer}>
            <LinearProgress className={classes.loader}/>
          </div>
        </Fade>
      </div>
    )
  }
}

export default withStyles(styles)(LoaderButton);