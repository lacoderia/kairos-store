import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, Form } from 'redux-form/immutable';
import { TextField } from 'redux-form-material-ui';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
  if (!values.get('email')) {
    errors.email = 'Introduce una dirección de correo electrónico'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.get('email'))) {
    errors.email = 'Introduce un correo electrónico válido';
  }
  return errors;
}

const form = {
  form: 'recoverPassword',
  validate
}

class RecoverPasswordForm extends Component {

  render() {
    const { classes, handleSubmit, formError } = this.props;

    return(
      <Form onSubmit={handleSubmit}>
        <div>
          <Typography variant="body2" align="left">
            Proporciona tu correo electrónico registrado
          </Typography>
        </div>
        <div>
          <Field
            name="email"
            type="email"
            component={TextField}
            label="Correo electrónico"
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
            Recuperar contraseña
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
)(reduxForm(form)(RecoverPasswordForm)));
