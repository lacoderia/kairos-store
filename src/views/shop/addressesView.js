import React, { Component } from 'react';
import clsx from 'clsx';

import { Grid, withStyles } from '@material-ui/core';

import PrivateTemplate from 'templates/privateTemplate';
import Addresses from 'components/address/addresses';

const styles = theme => ({
  root: {
    height: 'auto',
  },
  container: {
    padding: theme.spacing(4, 0),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(6),
    },
  },
});

class AddressesView extends Component {

  render() {
    const { classes } = this.props;

    return (
      <PrivateTemplate>
        <Grid container 
          justify="center"
          className={clsx(classes.root, classes.container)}
        >
          <Grid item xs={12} xl={9}>
            <Grid 
              container 
              alignContent="stretch"
              spacing={4}
            >
              <Grid item xs={12} lg={6}>
                <Addresses />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </PrivateTemplate>
    )
  }
}

export default withStyles(styles)(AddressesView);