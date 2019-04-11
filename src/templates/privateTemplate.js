import React from 'react';

import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

import Navigation from '../components/navigation/navigation';
import Menu from '../components/menu/menu';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100%',
  },
  toolbar: theme.mixins.toolbar,
  main: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    flex: 1,
    minWidth: 0, // So the Typography noWrap works,
  },
  content: {
    width: '100%',
    overflow: 'hidden',
    overflowY: 'auto',
  }
});

const PrivateTemplate = (props) => {
  const { classes } = props;
    
  return (
    <div className={classes.root}>
      <Navigation />
      <div className={classes.main}>
        <Menu />
        <div className={classes.content}>
          <div className={classes.toolbar} />
          { props.children }
        </div>
      </div>
    </div>
  )

};

export default withStyles(styles)(PrivateTemplate);