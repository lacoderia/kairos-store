import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { generateStoreUrl } from 'services/store';

import PublicTemplate from 'templates/publicTemplate';
import Login from 'components/login/login';

class LoginView extends Component {
  
  render() {
    const { from } = this.props.location.state || { from: { pathname: generateStoreUrl('/shop') } };

    if (this.props.redirectToReferrer) {
      return <Redirect to={from} />;
    }
    
    return (
      <PublicTemplate>
        <Login/>
      </PublicTemplate>
    )
  }
}

const mapStateToProps = function mapStateToProps(state, props) {
  return {
    redirectToReferrer: state.get('loginView').get('redirectToReferrer'),
  };
};

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginView);