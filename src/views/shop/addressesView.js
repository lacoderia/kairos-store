import React, { Component } from 'react';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

import PrivateTemplate from '../../templates/privateTemplate';
import Addresses from '../../components/address/addresses';

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
});

class AddressesView extends Component {

  render() {
    const { classes } = this.props;

    return (
      <PrivateTemplate>
        <Grid container 
          justify="center"
          className={classNames(classes.root, classes.container)}
        >
          <Grid item xs={12} xl={9}>
            <Grid 
              container 
              alignContent="stretch"
              spacing={32}
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