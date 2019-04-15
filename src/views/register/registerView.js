import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import queryString from 'query-string';

import PublicTemplate from '../../templates/publicTemplate';
import Register from '../../components/register/register';

class RegisterView extends Component {
  
  render() {
    const params = queryString.parse(this.props.location.search);

    if (this.props.isAuthenticated) {
      return <Redirect to="/shop" />;
    }
    
    return (
      <PublicTemplate>
        <Register token={params.confirmation_token}/>
      </PublicTemplate>
    )
  }
}

const mapStateToProps = function mapStateToProps(state, props) {
  return {
    isAuthenticated: state.get('session').get('isAuthenticated'),
  };
};

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterView);
