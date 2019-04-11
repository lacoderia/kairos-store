import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core';

import PrivateTemplate from '../../templates/privateTemplate';
import Dashboard from '../../components/dashboard/dashboard';
import ProfileView from './profileView';

const styles = theme => ({

});

class MembersView extends Component {

  render() {
    const { classes } = this.props;

    return (
      <PrivateTemplate>
        <Switch>
          <Route exact path="/members" component={Dashboard} />
          <Route exact path="/members/profile" component={ProfileView} />
          <Redirect to="/members" />
        </Switch>
      </PrivateTemplate>
    )
  }
 
}

export default withStyles(styles)(withRouter(MembersView));