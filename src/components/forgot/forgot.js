import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import RecoverPasswordForm from './recoverPasswordForm';
import ResetPasswordForm from './resetPasswordForm';
import LinkButton from '../common/linkButton';

import { recoverPassword, resetPassword } from '../../http/sessionActions';
import { changeView } from '../../components/forgot/forgotActions';

import views from './forgotConstants';

const styles = theme => ({
  mainContainer: {
    margin: theme.spacing.unit * 6 + 'px 0',
    zIndex: 1,
  },
  title: {
    color: theme.palette.custom.lightGrey,
    marginBottom: theme.spacing.unit * 6,
    fontWeight: 400,
  },
  formContainer: {
    backgroundColor: theme.palette.custom.white,
    borderRadius: 4,
    color: theme.palette.text.secondary,
    padding: theme.spacing.unit * 6 + 'px 15%',
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: theme.spacing.unit * 4,
    marginLeft: theme.spacing.unit * -2,
    textAlign: 'right',
  },
  footerContainer: {
    padding: theme.spacing.unit * 1.5,
    height: theme.spacing.unit * 9,
  },
  footerLink: {
    color: theme.palette.custom.darkGrey,
    display: 'inline-block',
    textDecoration: 'none',
    '&:hover': {
      color: theme.palette.custom.darkBlue,
    },
  },
});

class ForgotContainer extends Component {

  componentDidMount() {
    if(this.props.token){
      this.props.changeView({
        view: views.RESET_PASSWORD_VIEW,
        title: 'Nueva contraseña'
      });
    } else {
      this.props.changeView({
        view: views.RECOVER_PASSWORD_FORM_VIEW,
        title: 'Recuperar contraseña'
      });
    }
  }

  handleRecoverPassword = (values) => {
    this.props.recoverPassword(values);
  }

  handleResetPassword = (values) => {
    this.props.resetPassword(values, this.props.token);
  }

  render() {
    const { classes, view, title } = this.props;

    return(
      <Grid container justify="center">
        <Grid item xs={10} sm={7} md={4} className={classes.mainContainer}>
          <Typography variant="h6" align="center" className={classes.title}>
            {title}
          </Typography>
          <div className={classes.formContainer}>
            {{
              [views.RECOVER_PASSWORD_FORM_VIEW]: (
                <RecoverPasswordForm onSubmit={this.handleRecoverPassword} />
              ),
              [views.RECOVER_PASSWORD_INSTRUCTIONS_VIEW]: (
                <React.Fragment>
                  <Typography variant="body1" align="left">
                    Hemos enviado un correo a la dirección que proporcionaste. Sigue las instrucciones para poder actualizar tu contraseña.
                  </Typography>
                  <div className={classes.buttonContainer}>
                    <LinkButton to="/login">
                      <Button 
                        variant="contained" 
                        color="primary"
                      >
                        Continuar
                      </Button>
                    </LinkButton>
                  </div>
                </React.Fragment>
              ),
              [views.RESET_PASSWORD_VIEW]: (
                <ResetPasswordForm onSubmit={this.handleResetPassword} />
              ),
              [views.RESET_PASSWORD_INSTRUCTIONS_VIEW]: (
                <React.Fragment>
                  <Typography variant="body1" align="left">
                    ¡Tu contraseña ha sido actualizada! Ya puedes iniciar sesión con tu nueva contraseña.
                  </Typography>
                  <div className={classes.buttonContainer}>
                    <LinkButton to="/login">
                      <Button 
                        variant="contained" 
                        color="primary"
                      >
                        Continuar
                      </Button>
                    </LinkButton>
                  </div>
                </React.Fragment>
              ),
            }[view]}
          </div>
          <div className={classes.footerContainer}>
            { (view == views.RECOVER_PASSWORD_FORM_VIEW || view == views.RECOVER_PASSWORD_FORM_VIEW) && (
              <Typography variant="body2" align="right">
                <a href="mailto:soporte@futuranetwork.com" className={classes.footerLink}>Ayuda</a>
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
    view: state.get('forgot').get('view'),
    title: state.get('forgot').get('title'),
  };
};

function mapDispatchToProps(dispatch) {
  return Object.assign({},
    bindActionCreators({ recoverPassword }, dispatch),
    bindActionCreators({ resetPassword }, dispatch),
    bindActionCreators({ changeView }, dispatch),
  );
}

export default withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotContainer));
