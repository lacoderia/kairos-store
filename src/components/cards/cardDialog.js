import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { withStyles } from '@material-ui/core/styles';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';

import LoaderOverlay from '../common/loaderOverlay';
import { closeDialog } from './cardsActions';

const styles = theme => ({
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class CardDialog extends React.Component {

  handleClose = () => {
    this.props.closeDialog();
  };

  render() {
    const { classes, loading, openDialog, fullScreen } = this.props;

    return (
      <Dialog
        fullScreen={fullScreen}
        open={openDialog}
        onClose={this.handleClose}
        TransitionComponent={Transition}
        disableRestoreFocus={true}
      >
        <LoaderOverlay loading={loading} />
        {this.props.children}
      </Dialog>
    );
  }
}

CardDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

const mapStateToProps = function mapStateToProps(state, props) {
  return {
    loading: state.get('cards').get('dialogLoading'),
    openDialog: state.get('cards').get('openDialog'),
  };
};

function mapDispatchToProps(dispatch) {
  return Object.assign({},
    bindActionCreators({ closeDialog }, dispatch),
  );
}
 
export default withStyles(styles)(withMobileDialog()(connect(
  mapStateToProps,
  mapDispatchToProps
)(CardDialog)));