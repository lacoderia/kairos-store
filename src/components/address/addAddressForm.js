import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field } from 'redux-form/immutable';
import { TextField } from 'redux-form-material-ui';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import MenuItem from '@material-ui/core/MenuItem';

import { addAddress } from './addressActions';

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
  selectfield: {
    textAlign: 'start',
    '&:focus': {
      background: 'transparent',
    },
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
    errors.name = 'Requerido';
  }
  if (!values.get('address')) {
    errors.address = 'Requerido';
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
  return errors;
}

const form = {
  form: 'addAddress',
  validate
}

class AddAddressForm extends React.Component {

  handleSubmit = (values) => {
    this.props.addAddress(values);
  };

  render() {
    const { classes, handleClose, handleSubmit, formError } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton color="inherit" onClick={handleClose} aria-label="Close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.flex}>
              Agregar dirección
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
              label="Nombre de quien recibe *"
              margin="dense"
              autoFocus={true}
            />
          </div>
          <div>
            <Field
              name="address"
              component={TextField}
              label="Calle, número y colonia *"
              margin="dense"
            />
          </div>
          <div>
            <Field
              name="city"
              component={TextField}
              label="Ciudad *"
              margin="dense"
            />
          </div>
          <div>
            <Field
              name="state"
              component={TextField}
              label="Estado *"
              margin="dense"
            />
          </div>
          <div>
            <Field
              name="zip"
              component={TextField}
              label="Código postal *"
              margin="dense"
            />
          </div>
          <div>
            <Field
              name="country"
              component={TextField}
              label="País *"
              inputProps={{
                className: classes.selectfield
              }}
              margin="dense"
              select
            >
              <MenuItem value="México">México</MenuItem>
              <MenuItem value="Colombia">Colombia</MenuItem>
              <MenuItem value="España">España</MenuItem>
              <MenuItem value="Otro">Otro</MenuItem>
            </Field>
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
    formError: state.get('address').get('error'),
  };
};

function mapDispatchToProps(dispatch) {
  return Object.assign({},
    bindActionCreators({ addAddress }, dispatch),
  );
}
 
export default withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm(form)(AddAddressForm)));