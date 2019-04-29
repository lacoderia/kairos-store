import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';

import { deleteAddress } from './addressActions';

const styles = theme => ({
  dialogContent: {
    padding: theme.spacing.unit * 6,
    paddingBottom: theme.spacing.unit * 4,
    maxWidth: '100%',
    width: 500,
  },
  buttonContainer: {
    marginTop: theme.spacing.unit * 4,
  }
});

class DeleteAddress extends Component {

  handleDelete = () => {
    this.props.deleteAddress(this.props.selectedAddressId);
  }

  render() {
    const { classes, handleClose } = this.props;

    return (        
      <DialogContent className={classes.dialogContent}>
        <Typography variant="subtitle1">
          ¿Quieres eliminar esta dirección?
        </Typography>
        <DialogActions className={classes.buttonContainer}>
          <Button 
            variant="contained"
            color="primary"
            onClick={this.handleDelete}
          >
            Eliminar
          </Button>
          <Button 
            color="primary"
            onClick={handleClose}
          >
            Cancelar
          </Button>
        </DialogActions>
      </DialogContent>
    );
  }
}

const mapStateToProps = function mapStateToProps(state, props) {
  return {
    selectedAddressId: state.get('address').get('selectedAddressId'),
  };
};

function mapDispatchToProps(dispatch) {
  return Object.assign({},
    bindActionCreators({ deleteAddress }, dispatch),
  );
}
 
export default withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteAddress));