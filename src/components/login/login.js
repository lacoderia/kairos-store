import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { reduxForm, formValueSelector, Field, Form } from 'redux-form/immutable';
import { CONTACT_EMAIL } from 'res/constants';
import { generateStoreUrl } from 'services/store';

import { 
  Grid,
  Button,
  Typography,
  withStyles
} from '@material-ui/core';

import LoaderOverlay from 'library/components/LoaderOverlay';
import PasswordField from 'library/components/PasswordField';
import { renderTextField } from 'library/utils/inputs';
import { login, resendConfirmationEmail } from 'http/sessionActions';
import { changeView } from './loginActions';
import views from './loginConstants';

const styles = theme => ({
  mainContainer: {
    margin: theme.spacing(4, 0),
    zIndex: 1,
  },
  title: {
    color: theme.palette.custom.lightGrey,
    marginBottom: theme.spacing(4),
    fontWeight: 500,
  },
  formContainer: {
    backgroundColor: theme.palette.custom.white,
    borderRadius: 4,
    color: theme.palette.text.secondary,
    padding: theme.spacing(6) + 'px 15%',
    position: 'relative',
    textAlign: 'center',
  },
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
  linkContainer: {
    marginTop: theme.spacing(2),
  },
  link: {
    color: theme.palette.custom.darkGrey,
    display: 'inline-block',
    textDecoration: 'none',
    '&:hover': {
      color: theme.palette.custom.darkBlue,
    },
  },
  footerContainer: {
    padding: theme.spacing(1.5),
    height: theme.spacing(9),
  },
  footerLink: {
    color: theme.palette.custom.darkGrey,
    display: 'inline-block',
    textDecoration: 'none',
    '&:hover': {
      color: theme.palette.custom.darkBlue,
    },
  },
  bold: {
    fontWeight: 500,
  },
});

const validate = values => {
  const errors = {}
  if (!values.get('email')) {
    errors.email = 'Introduce una dirección de correo electrónico'
  }
  if (!values.get('password')) {
    errors.password = 'Introduce la contraseña de tu cuenta'
  }
  return errors;
}

const form = {
  form: 'login',
  validate,
}

const selector = formValueSelector('login')

class LoginContainer extends Component {

  handleSubmit = (values) => {
    this.props.login(values);
  }

  handleResendConfirmation = () => {
    this.props.resendConfirmationEmail(this.props.email);
  }

  componentDidMount() {
    this.props.changeView({
      view: views.LOGIN_FORM_VIEW,
      title: 'Ingresa a tu cuenta'
    });
  }

  render() {
    const { classes, handleSubmit, loading, formError, view, title, email } = this.props;

    return(
      <Grid container justify="center">
        <Grid item xs={12} sm={8} md={5} lg={4} className={classes.mainContainer}>
          <Typography variant="h5" align="center" className={classes.title}>
            {title}
          </Typography>
          <div className={classes.formContainer}>
            <LoaderOverlay loading={loading} />
            {{
              [views.LOGIN_FORM_VIEW]: (
                <Form onSubmit={handleSubmit(this.handleSubmit)}>
                  <div>
                    <Field
                      name="email"
                      type="email"
                      component={renderTextField}
                      label="Correo electrónico"
                      margin="dense"
                      helperText=" "
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
                  <div className={classes.linkContainer}>
                    <Typography variant="subtitle2" align="left">
                      <Link to={generateStoreUrl('/forgot')} className={classes.link}>¿Has olvidado tu contraseña?</Link>
                    </Typography>
                  </div>
                  <Typography variant="subtitle2" className={classes.error}>
                    {formError}
                  </Typography>
                  <div className={classes.buttonContainer}>
                    <Grid
                      container
                      direction="row"
                      justify="space-between"
                    >
                      <Grid item>
                      </Grid>
                      <Grid item>
                        <Button 
                          type="submit" 
                          variant="contained" 
                          color="primary"
                        >
                          Ingresar
                        </Button>
                      </Grid>
                    </Grid>
                  </div>
                </Form>
              ),
              [views.CONFIRM_EMAIL_ERROR_VIEW]: (
                <React.Fragment>
                  <Typography variant="body2" align="left" gutterBottom>
                    Anteriormente enviamos un correo a <span className={classes.bold}>{email}</span> con las instrucciones para activar tu cuenta.
                  </Typography>
                  <Typography variant="body2" align="left">
                    Si no lo recibiste podemos volver a enviarlo.
                  </Typography>
                  <Typography variant="body2" className={classes.error}>
                    {formError}
                  </Typography>
                  <div className={classes.buttonContainer}>
                    <Button 
                      type="submit" 
                      variant="contained" 
                      color="primary"
                      disabled={loading}
                      onClick={this.handleResendConfirmation}
                    >
                      Reenviar correo
                    </Button>
                  </div>
                </React.Fragment>
              ),
              [views.CONFIRM_EMAIL_INTRUCTIONS_VIEW]: (
                <React.Fragment>
                  <Typography variant="body2" align="left">
                    En breve recibirás un correo electrónico en <span className={classes.bold}>{email}</span> con las instrucciones para activar tu cuenta.
                  </Typography>
                  <div className={classes.buttonContainer}>
                    <Button 
                      component={Link}
                      to={generateStoreUrl('/')}
                      variant="contained" 
                      color="primary"
                    >
                      Continuar
                    </Button>
                  </div>
                </React.Fragment>
              ),
            }[view]}
          </div>
          <div className={classes.footerContainer}>
            { view == views.LOGIN_FORM_VIEW && (  
              <Typography variant="subtitle2" align="right">
                <a href={'mailto:' + CONTACT_EMAIL} className={classes.footerLink}>Ayuda</a>
              </Typography>
            )}
          </div>
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = function mapStateToProps(state, props) {
  return {
    loading: state.get('login').get('loading'),
    formError: state.get('login').get('error'),
    view: state.get('login').get('view'),
    title: state.get('login').get('title'),
    email: selector(state, 'email')
  };
};

function mapDispatchToProps(dispatch) {
  return Object.assign({},
    bindActionCreators({ login }, dispatch),
    bindActionCreators({ resendConfirmationEmail }, dispatch),
    bindActionCreators({ changeView }, dispatch),
  );
}

export default withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm(form)(LoginContainer)));
