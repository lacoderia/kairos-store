import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Form } from 'redux-form/immutable';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import PasswordField from '../common/passwordField';

const styles = theme => ({
  error: {
    color: theme.palette.error.main,
    marginTop: theme.spacing.unit,
    textAlign: 'left'
  },
  buttonContainer: {
    marginTop: theme.spacing.unit * 4,
    marginLeft: theme.spacing.unit * -2,
    textAlign: 'right',
  },
});

const validate = values => {
  const errors = {}
  if (!values.get('password')) {
    errors.password = 'Introduce una nueva contraseña para tu cuenta';
  } else if (values.get('password').length < 8) {
    errors.password = 'Usa al menos 8 caracteres';
  }
  return errors;
}

const form = {
  form: 'resetPassword',
  validate
}

class ResetPasswordForm extends Component {

  render() {
    const { classes, handleSubmit, formError } = this.props;

    return(
      <Form onSubmit={handleSubmit}>
        <div>
          <Typography variant="body2" align="left">
            Introduce la nueva contraseña que deseas usar para iniciar sesión
          </Typography>
        </div>
        <div>
          <PasswordField 
            name="password"
            label="Contraseña"
            margin="normal"
            helperText=" "
            autoFocus={true}
          />
        </div>
        <Typography variant="body2" className={classes.error}>
          {formError}
        </Typography>
        <div className={classes.buttonContainer}>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
          >
            Actualizar contraseña
          </Button>
        </div>
      </Form>
    )
  }
}

const mapStateToProps = function mapStateToProps(state, props) {
  return {
    formError: state.get('forgot').get('error'),
  };
};

function mapDispatchToProps(dispatch) {
  return {}
}

export default withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm(form)(ResetPasswordForm)));