import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

const StoreWrapper = Component => (props) => {
  const { storeName, dispatch, ...rest } = props;

  return <Component {...rest} storeName={storeName} />;
}

const mapStateToProps = function mapStateToProps(state, props) {
  return {
    storeName: state.get('store').get('store'),
  };
};

const composedStoreWrapper = compose(
  connect(mapStateToProps, null),
  StoreWrapper
)

export default composedStoreWrapper;
