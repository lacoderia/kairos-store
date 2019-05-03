import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  
});

class StorePicker extends Component {

  render() {
    const { classes, loading, formError, view, title } = this.props;

    return(
      <div>
        Elige una tienda
      </div>
    )
  }
}

const mapStateToProps = function mapStateToProps(state, props) {
  return {
  };
};

function mapDispatchToProps(dispatch) {
  return Object.assign({},
  );
}

export default withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps
)(StorePicker));
