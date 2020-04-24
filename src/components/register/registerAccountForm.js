import React, { Component } from 'react';
import { reduxForm, Field, Form } from 'redux-form/immutable';

import { 
  Button,
  Typography,
  withStyles
} from '@material-ui/core';

import PasswordField from 'library/components/PasswordField';
import { renderTextField } from 'library/utils/inputs';

const validate = values => {
  const errors = {}
  if (!values.get('name')) {
    errors.name = 'Requerido';
  }
  if (!values.get('lastname')) {
    errors.lastname = 'Requerido';
  }
  if (!values.get('email')) {
    errors.email = 'Introduce una dirección de correo electrónico'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.get('email'))) {
    errors.email = 'Introduce un correo electrónico válido';
  }
  if (!values.get('phone')) {
    errors.phone = 'Requerido';
  } else if (!/^[0-9 ]{7,20}$/i.test(values.get('phone'))) {
    errors.phone = 'Introduce sólo números y espacios';
  }
  if (!values.get('password')) {
    errors.password = 'Requerido';
  } else if (values.get('password').length < 8) {
    errors.password = 'Usa al menos 8 caracteres';
  }
  return errors;
}

const form = {
  form: 'register',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
}

const styles = theme => ({
  error: {
    color: theme.palette.error.main,
    marginTop: theme.spacing(1),
    textAlign: 'left'
  },
  buttonContainer: {
    marginTop: theme.spacing(4),
    marginLeft: theme.spacing(-2),
    textAlign: 'right',
  },
});

class RegisterUserForm extends Component {

  render() {
    const { classes, handleSubmit, formError } = this.props;

    return (
      <Form onSubmit={handleSubmit}>
        <div>
          <Field
            name="name"
            component={renderTextField}
            label="Nombre *"
            margin="dense"
            helperText=" "
            autoFocus={true}
          />
        </div>
        <div>
          <Field
            name="lastname"
            component={renderTextField}
            label="Apellido(s) *"
            margin="dense"
            helperText=" "
          />
        </div>
        <div>
          <Field
            name="email"
            type="email"
            component={renderTextField}
            label="Correo electrónico *"
            margin="dense"
            helperText=" "
          />
        </div>
        <div>
          <Field
            name="phone"
            component={renderTextField}
            label="Teléfono *"
            inputProps={{
              maxLength: 15,
            }}
            margin="dense"
            helperText="Sólo números y espacios"
          />
        </div>
        <div>
          <PasswordField 
            name="password"
            label="Contraseña"
            margin="dense"
            helperText=" "
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
            Siguiente
          </Button>
        </div>
      </Form>
    )
  }
}

export default withStyles(styles)(reduxForm(form)(RegisterUserForm));