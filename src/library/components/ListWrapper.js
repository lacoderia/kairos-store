import React, { Component } from 'react';
import clsx from 'clsx';

import { 
  Grid,
  Typography,
  CircularProgress,
  withStyles
} from '@material-ui/core';

const styles = theme => ({
  loaderContainer: {
    padding: theme.spacing(5),
    textAlign: 'center',
    width: '100%',
  },
  errorContainer: {
    color: theme.palette.error.main,
    padding: theme.spacing(5, 4),
    textAlign: 'center',
    width: '100%',
  },
  errorText: {
    color: theme.palette.error.main,
  },
  noResultsContainer: {
    padding: theme.spacing(5, 4),
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
          <CircularProgress size={40} />
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
                <div className={clsx(classes.noResultsContainer, customStyles)} >
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