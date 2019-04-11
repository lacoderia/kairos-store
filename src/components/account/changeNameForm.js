import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field } from 'redux-form/immutable';
import { TextField } from 'redux-form-material-ui';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import DialogContent from '@material-ui/core/DialogContent';

import { updateAccount } from './accountActions';

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  dialogContent: {
    padding: theme.spacing.unit * 6,
    paddingBottom: theme.spacing.unit * 7,
    maxWidth: '100%',
    width: 500,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  error: {
    color: theme.palette.error.main,
    marginTop: theme.spacing.unit * 3,
    textAlign: 'left'
  },
});

const validate = values => {
  const errors = {}
  if (!values.get('name')) {
    errors.name = 'Requerido'
  }
  if (!values.get('lastname')) {
    errors.lastname = 'Requerido'
  }
  return errors;
}

const form = {
  form: 'changeAccountName',
  enableReinitialize: true,
  validate,
}
class ChangeNameForm extends React.Component {

  handleSubmit = (values) => {
    const user = {
      id: this.props.id,
      first_name: values.get('name'),
      last_name: values.get('lastname'),
    }
    this.props.updateAccount(user);
  };

  render() {
    const { classes, handleClose, handleSubmit, formError } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleSubmit)} className={classes.form}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton color="inherit" onClick={handleClose} aria-label="Close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.flex}>
              Cambiar mi nombre
            </Typography>
            <Button 
              type="submit"
              color="inherit" 
            >
              Guardar
            </Button>
          </Toolbar>
        </AppBar>
        <DialogContent className={classes.dialogContent}>
          <div>
            <Field
              name="name"
              component={TextField}
              label="Nombre"
              margin="dense"
              autoFocus={true}
            />
          </div>
          <div>
            <Field
              name="lastname"
              component={TextField}
              label="Apellido(s)"
              margin="dense"
            />
          </div>
          <Typography variant="body1" className={classes.error}>
            {formError}
          </Typography>
        </DialogContent>
      </form>
    );
  }
}

const mapStateToProps = function mapStateToProps(state, props) {
  return {
    id: state.get('session').get('id'),
    formError: state.get('account').get('error'),
    initialValues: {
      name: state.get('session').get('name'),
      lastname: state.get('session').get('lastname'),
    }
  };
};

function mapDispatchToProps(dispatch) {
  return Object.assign({},
    bindActionCreators({ updateAccount }, dispatch),
  );
}
 
export default withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm(form)(ChangeNameForm)));