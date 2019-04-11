import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field, Form } from 'redux-form/immutable';
import { TextField } from 'redux-form-material-ui';
import { createTextMask } from 'redux-form-input-masks';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import CloseIcon from '@material-ui/icons/Close';

import { addCard } from './checkoutActions';
import { maxLength } from '../../../common/normalize';

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
  twoColumns: {
    display: 'flex',
    marginLeft: `-${theme.spacing.unit * 2}px`,
    marginRight: `-${theme.spacing.unit * 2}px`,
  },
  twoColumnsItem: {
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
  },
  cvvHelper: {
    height: 30,
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

const validate = (values, props) => {
  const errors = {}
  if (!values.get('name')) {
    errors.name = 'Ingrese el nombre del titular de la tarjeta';
  }
  if (!values.get('cardNumber') || values.get('cardNumber').toString().length < 15 || values.get('cardNumber').toString().length > 16) {
    errors.cardNumber = 'Verifica el número de tu tarjeta';
  }
  if (!values.get('validThrough') || values.get('validThrough').toString().length != 4) {
    errors.validThrough = 'Ingrese una fecha válida';
  }
  if (!values.get('cvv') || values.get('cvv').toString().length < 3 || values.get('cvv').toString().length > 4) {
    errors.cvv = 'Verifica el código de seguridad';
  }
  return errors;
}

const form = {
  form: 'addCheckoutCard',
  validate
}

const cardNumberMask = createTextMask({
  pattern: '9999 9999 9999 9999',
  guide: false,
});

const validThroughMask = createTextMask({
  pattern: '99 / 99',
  guide: false,
});

class AddCheckoutCardForm extends React.Component {

  handleSubmit = (values) => {
    this.props.addAddress(values);
  };

  render() {
    const { classes, handleClose, handleSubmit, formError } = this.props;

    return (
      <Form onSubmit={handleSubmit(this.handleSubmit)}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton color="inherit" onClick={handleClose} aria-label="Close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.flex}>
              Agregar método de pago
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
              label="Nombre en la tarjeta"
              margin="normal"
              autoFocus={true}
              helperText=" "
            />
          </div>
          <div>
            <Field
              name="cardNumber"
              component={TextField}
              label="Número de tarjeta"
              margin="normal"
              {...cardNumberMask}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                startAdornment: <InputAdornment><img src="/images/card.png" className={classes.cvvHelper} alt="Card helper"/>&nbsp;</InputAdornment>,
              }}
              helperText=" "
            />
          </div>
          <div className={classes.twoColumns}>
            <Field
              name="validThrough"
              component={TextField}
              label="Fecha de vencimiento"
              margin="normal"
              {...validThroughMask}
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="MM/AA"
              className={classes.twoColumnsItem}
              helperText=" "
            />
            <Field
              name="cvv"
              component={TextField}
              type="password"
              label="CVV"
              margin="normal"
              normalize={maxLength(4)}
              placeholder="***"
              InputLabelProps={{
                shrink: true,
              }}
              className={classes.twoColumnsItem}
              helperText=" "
              InputProps={{
                endAdornment: <InputAdornment position="end">
                                <img src="/images/cvv.png" className={classes.cvvHelper} alt="CVV helper"/>
                              </InputAdornment>,
              }}
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
    formError: state.get('checkout').get('dialogError'),
  };
};

function mapDispatchToProps(dispatch) {
  return Object.assign({},
    bindActionCreators({ addCard }, dispatch),
  );
}
 
export default withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm(form)(AddCheckoutCardForm)));