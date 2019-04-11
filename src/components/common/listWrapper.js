import React, { Component } from 'react';

import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import classNames from 'classnames';

const styles = theme => ({
  loaderContainer: {
    padding: `${theme.spacing.unit * 5}px !important`,
    textAlign: 'center',
    width: '100%',
  },
  errorContainer: {
    color: theme.palette.error.main,
    padding: `${theme.spacing.unit * 5}px ${theme.spacing.unit * 4}px !important`,
    textAlign: 'center',
    width: '100%',
  },
  errorText: {
    color: theme.palette.error.main,
  },
  noResultsContainer: {
    padding: `${theme.spacing.unit * 5}px ${theme.spacing.unit * 4}px`,
    textAlign: 'center',
  },
  noResultsText: {
    color: '#777',
  },
});

class ListWrapper extends Component {

  render() {
    const {classes, list, loading, error, noResultsText, customStyles} = this.props;
    
    return(
      loading ? (
        <div className={classes.loaderContainer}>
          <CircularProgress className={classes.progress} size={40} />
        </div>
      ) : (
        error ? (
          <div className={classes.errorContainer}>
            <Typography variant="body2" className={classes.errorText}>{error}</Typography>
          </div>
        ) : (
          list && (
            list.length ? (
              this.props.children
            ) : (
              <Grid item>
                <div className={classNames(classes.noResultsContainer, customStyles)} >
                  <Typography variant="body2" className={classes.noResultsText}>{noResultsText}</Typography>
                </div>  
              </Grid>
            )  
          )
        )
      )
    )
  }
}

export default withStyles(styles)(ListWrapper);

