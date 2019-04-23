import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { closeSnackbar, exitSnackbar } from './snackbarsActions'; 
import Snackbar from './snackbar';

class Snackbars extends Component {

  onClick = snackbar => {
    if(snackbar.onClick) {
      snackbar.onClick();
    }
  }

  onClose = snackbar => {
    if(snackbar.onClose) {
      snackbar.onClose();
    }
    this.props.closeSnackbar();
  }

  onExit = snackbar => {
    if(snackbar.onExit) {
      snackbar.onExit();
    }
    this.props.exitSnackbar();
  }

  render() {
    const snackbar = this.props.snackbars ? this.props.snackbars.toJS()[0] : null;

    return (
      <React.Fragment>
        { snackbar && (
          <Snackbar 
            title={snackbar.title}
            message={snackbar.message}
            variant={snackbar.variant}
            open={snackbar.open}
            handleClose={() => this.onClose(snackbar)}
            handleExited={() => this.onExit(snackbar)}
            handleClick={() => this.onClick(snackbar)}
          />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = function mapStateToProps(state, props) {
  return {
    snackbars: state.get('snackbars').get('snackbars'),
  };
};

function mapDispatchToProps(dispatch) {
  return Object.assign({},
    bindActionCreators({ closeSnackbar }, dispatch),
    bindActionCreators({ exitSnackbar }, dispatch),
  );
}
 
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Snackbars);