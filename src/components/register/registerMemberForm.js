import React, { Component } from 'react';
import { reduxForm, Field, Form } from 'redux-form/immutable';
import { TextField } from 'redux-form-material-ui';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const validate = values => {
  const errors = {}
  if (!values.get('externalId')) {
    errors.externalId = 'Requerido';
  } else if (isNaN(Number(values.get('externalId')))) {
    errors.externalId = 'Por favor introduce un ID Omein válido';
  }
  if (!values.get('sponsorExternalId')) {
    errors.sponsorExternalId = 'Requerido';
  } else if (isNaN(Number(values.get('sponsorExternalId')))) {
    errors.sponsorExternalId = 'Por favor introduce un ID Omein de patrocinio válido';
  }
  if (!values.get('placementExternalId')) {
    errors.placementExternalId = 'Requerido';
  } else if (isNaN(Number(values.get('placementExternalId')))) {
    errors.placementExternalId = 'Por favor introduce un ID Omein de colocación válido';
  }
  if (!values.get('iuvareId')) {
    errors.iuvareId = 'Requerido';
  }
  if (!values.get('transactionNumber')) {
    errors.transactionNumber = 'Requerido';
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
    marginTop: theme.spacing.unit,
    textAlign: 'left'
  },
  buttonContainer: {
    marginTop: theme.spacing.unit * 4,
    marginLeft: theme.spacing.unit * -2,
    textAlign: 'right',
  },
});

class RegisterMemberForm extends Component {

  render() {
    const { classes, handleSubmit, formError } = this.props;

    return (
      <Form onSubmit={handleSubmit}>
        <div>
          <Field
            name="externalId"
            component={TextField}
            label="ID Omein *"
            margin="dense"
            autoFocus={true}
            helperText=" "
          />
        </div>
        <div>
          <Field
            name="sponsorExternalId"
            component={TextField}
            label="ID Omein de patrocinio *"
            margin="dense"
            helperText=" "
          />
        </div>
        <div>
          <Field
            name="placementExternalId"
            component={TextField}
            label="ID Omein de colocación *"
            margin="dense"
            helperText=" "
          />
        </div>
        <div>
          <Field
            name="iuvareId"
            component={TextField}
            label="ID Iuvare *"
            margin="dense"
            helperText=" "
          />
        </div>
        <div>
          <Field
            name="transactionNumber"
            component={TextField}
            label="Número de registro *"
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
            Crear cuenta
          </Button>
        </div>
      </Form>
    )
  }
}

export default withStyles(styles)(reduxForm(form)(RegisterMemberForm));