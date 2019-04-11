import React from 'react';

import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

import Navigation from '../components/navigation/navigation';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    width: '100%',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    backgroundColor: theme.palette.custom.lightGrey,
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    flex: 1,
    minWidth: 0, // So the Typography noWrap works
    position: 'relative',
  },
  background: {
    height: '50%',
    position: 'absolute',
    backgroundColor: theme.palette.custom.background,
    width: '100%',
  },
  grid: {
    flexGrow: 1
  },
});

const PublicTemplate = (props) => {
  const { classes } = props;
    
  return (
    <div className={classes.root}>
      <Navigation />
      <div className={classes.toolbar} />
      <main className={classes.content}>
        <div className={classes.background}></div>
        <Grid 
          container
          alignItems="center"
          justify="center"
          className={classes.grid}
        >
          { props.children }
        </Grid>
      </main>
    </div>
  )

};

export default withStyles(styles)(PublicTemplate);