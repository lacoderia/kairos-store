import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field, Form } from 'redux-form/immutable';

import { 
  Button,
  DialogContent,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  MenuItem,
  withStyles
} from '@material-ui/core';
import { Close } from '@material-ui/icons';

import { renderTextField } from 'library/utils/inputs';
import { updateAddress } from './addressActions';

const styles = theme => ({
  flex: {
    flex: 1,
  },
  dialogContent: {
    padding: theme.spacing(6),
    paddingBottom: theme.spacing(7),
    maxWidth: '100%',
    width: 500,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  selectfield: {
    textAlign: 'start',
    '&:focus': {
      background: 'transparent',
    },
  },
  error: {
    color: theme.palette.error.main,
    marginTop: theme.spacing(3),
    textAlign: 'left'
  },
});

const validate = values => {
  const errors = {}
  if (!values.get('name')) {
    errors.name = 'Requerido';
  }
  if (!values.get('address')) {
    errors.address = 'Requerido';
  }
  if (!values.get('streets')) {
    errors.streets = 'Requerido';
  }
  if (!values.get('city')) {
    errors.city = 'Requerido';
  }
  if (!values.get('state')) {
    errors.state = 'Requerido';
  }
  if (!values.get('zip')) {
    errors.zip = 'Requerido';
  } else if (isNaN(Number(values.get('zip'))) || values.get('zip').length < 3 || values.get('zip').length > 8 ) {
    errors.zip = 'Por favor introduce un código postal válido';
  }
  if (!values.get('country')) {
    errors.country = 'Requerido';
  }
  if (!values.get('phone')) {
    errors.phone = 'Requerido';
  } else if (!/^[0-9 ]{7,20}$/i.test(values.get('phone'))) {
    errors.phone = 'Introduce sólo números y espacios';
  }
  return errors;
}

const form = {
  form: 'editAddress',
  enableReinitialize: true,
  validate
}

class EditAddress extends Component {

  handleSubmit = (values) => {
    this.props.updateAddress(values);
  };

  render() {
    const { classes, handleClose, handleSubmit, formError } = this.props;

    return (
      <Form onSubmit={handleSubmit(this.handleSubmit)} className={classes.form}>
        <AppBar position="relative">
          <Toolbar>
            <IconButton color="inherit" onClick={handleClose} aria-label="Close">
              <Close />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.flex}>
              Editar dirección
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
              component={renderTextField}
              label="Nombre de quien recibe *"
              margin="dense"
              autoFocus={true}
              helperText=" "
            />
          </div>
          <div>
            <Field
              name="address"
              component={renderTextField}
              label="Calle, número y colonia *"
              margin="dense"
              helperText=" "
            />
          </div>
          <div>
            <Field
              name="streets"
              component={renderTextField}
              label="Entre calles *"
              margin="dense"
              helperText=" "
            />
          </div>
          <div>
            <Field
              name="reference"
              component={renderTextField}
              label="Referencia"
              margin="dense"
              helperText=" "
            />
          </div>
          <div>
            <Field
              name="city"
              component={renderTextField}
              label="Ciudad *"
              margin="dense"
              helperText=" "
            />
          </div>
          <div>
            <Field
              name="state"
              component={renderTextField}
              label="Estado *"
              margin="dense"
              helperText=" "
            />
          </div>
          <div>
            <Field
              name="zip"
              component={renderTextField}
              label="Código postal *"
              margin="dense"
              helperText=" "
            />
          </div>
          <div>
            <Field
              name="country"
              component={renderTextField}
              label="País *"
              inputProps={{
                className: classes.selectfield
              }}
              margin="dense"
              helperText=" "
              select
            >
              <MenuItem value="México">México</MenuItem>
              {/* <MenuItem value="Colombia">Colombia</MenuItem>
              <MenuItem value="España">España</MenuItem>
              <MenuItem value="Otro">Otro</MenuItem> */}
            </Field>
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
          <Typography variant="body1" className={classes.error}>
            {formError}
          </Typography>
        </DialogContent>
      </Form>
    );
  }
}

const mapStateToProps = function mapStateToProps(state, props) {
  return {
    formError: state.get('address').get('error'),
    initialValues: state.get('address').get('addresses').get(state.get('address').get('selectedAddressId')),
  };
};

function mapDispatchToProps(dispatch) {
  return Object.assign({},
    bindActionCreators({ updateAddress }, dispatch),
  );
}
 
export default withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm(form)(EditAddress)));