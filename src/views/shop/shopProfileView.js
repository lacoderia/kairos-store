import React, { Component } from 'react';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import PrivateTemplate from '../../templates/privateTemplate';
import Addresses from '../../components/address/addresses';
import Cards from '../../components/cards/cards';

const styles = theme => ({
  root: {
    height: 'auto',
  },
  container: {
    padding: `${theme.spacing.unit * 4}px 0`,
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing.unit * 6,
    },
  },
  title: {
    fontWeight: 500,
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 4,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing.unit * 0,
      marginTop: theme.spacing.unit,
      marginBottom: theme.spacing.unit * 3,
    },
  },
});

class ShopProfileView extends Component {

  render() {
    const { classes } = this.props;

    return (
      <PrivateTemplate>
        <Grid container 
          justify="center"
          className={classNames(classes.root, classes.container)}
        >
          <Grid item xs={12} xl={9}>
            <Typography variant="h5" className={classes.title}>
              Mis datos
            </Typography>
            <Grid 
              container 
              alignContent="stretch"
              spacing={32}
            >
              <Grid item xs={12} lg={6}>
                <Addresses />
              </Grid>
              <Grid item xs={12} lg={6}>
                <Cards />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </PrivateTemplate>
    )
  }
}

export default withStyles(styles)(ShopProfileView);