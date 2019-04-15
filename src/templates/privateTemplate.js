import React from 'react';

import { withStyles } from '@material-ui/core';

import Navigation from '../components/navigation/navigation';
import Menu from '../components/menu/menu';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
  },
  main: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    minWidth: 0, // So the Typography noWrap works,
    height: 'calc(100% - 57px)',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    overflow: 'auto',
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
          { props.children }
        </div>
      </div>
    </div>
  )

};

export default withStyles(styles)(PrivateTemplate);