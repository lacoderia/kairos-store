import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { generateStoreUrl } from 'services/store';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return(
    <Route
      {...rest}
      render={props => {
        return rest.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: generateStoreUrl('/login'),
              state: { from: props.location }
            }}
          />
        )
      }
        
      }
    />
  )
};

const mapStateToProps = function mapStateToProps(state, props) {
  return {
    isAuthenticated: state.get('session').get('isAuthenticated'),
  };
};

function mapDispatchToProps(dispatch) {
  return {};
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PrivateRoute));