import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form/immutable';
import { TextField } from 'redux-form-material-ui';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import LoaderButton from '../common/loaderButton';

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
    marginTop: theme.spacing.unit * 3,
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
    const { classes, handleSubmit, loading, formError } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <Field
            name="externalId"
            component={TextField}
            label="ID Omein *"
            margin="dense"
            autoFocus={true}
          />
        </div>
        <div>
          <Field
            name="sponsorExternalId"
            component={TextField}
            label="ID Omein de patrocinio *"
            margin="dense"
          />
        </div>
        <div>
          <Field
            name="placementExternalId"
            component={TextField}
            label="ID Omein de colocación *"
            margin="dense"
          />
        </div>
        <div>
          <Field
            name="iuvareId"
            component={TextField}
            label="ID Iuvare *"
            margin="dense"
          />
        </div>
        <div>
          <Field
            name="transactionNumber"
            component={TextField}
            label="Número de registro *"
            margin="dense"
          />
        </div>
        <Typography variant="body1" className={classes.error}>
          {formError}
        </Typography>
        <div className={classes.buttonContainer}>
          <LoaderButton loading={loading}>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              disabled={loading}
            >
              Crear cuenta
            </Button>
          </LoaderButton>
        </div>
      </form>
    )
  }
}

export default withStyles(styles)(reduxForm(form)(RegisterMemberForm));