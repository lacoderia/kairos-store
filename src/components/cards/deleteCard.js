import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';

import { deleteCard } from './cardsActions';

const styles = theme => ({
  dialogContent: {
    padding: theme.spacing.unit * 6,
    paddingBottom: theme.spacing.unit * 4,
    maxWidth: '100%',
    width: 500,
  },
  error: {
    color: theme.palette.error.main,
    marginTop: theme.spacing.unit * 3,
    textAlign: 'left'
  },
  buttonContainer: {
    marginTop: theme.spacing.unit * 4,
  }
});

class DeleteCard extends React.Component {

  handleDelete = () => {
    this.props.deleteCard(this.props.selectedCardId);
  }

  render() {
    const { classes, handleClose, formError } = this.props;

    return (        
      <DialogContent className={classes.dialogContent}>
        <Typography variant="subtitle1">
          ¿Quieres eliminar esta tarjeta?
        </Typography>
        <Typography variant="body1" className={classes.error}>
          {formError}
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
    formError: state.get('cards').get('dialogError'),
    selectedCardId: state.get('cards').get('selectedCardId'),
  };
};

function mapDispatchToProps(dispatch) {
  return Object.assign({},
    bindActionCreators({ deleteCard }, dispatch),
  );
}
 
export default withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteCard));