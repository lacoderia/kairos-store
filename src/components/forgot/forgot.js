import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { CONTACT_EMAIL } from 'res/constants';
import { generateStoreUrl } from 'services/store';

import {
  Grid,
  Button,
  Typography,
  withStyles
} from '@material-ui/core';

import LoaderOverlay from 'library/components/LoaderOverlay';
import RecoverPasswordForm from './recoverPasswordForm';
import ResetPasswordForm from './resetPasswordForm';
import { recoverPassword, resetPassword } from 'http/sessionActions';
import { changeView } from './forgotActions';
import views from './forgotConstants';

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
    position: 'relative',
    padding: theme.spacing(6) + 'px 15%',
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: theme.spacing(4),
    marginLeft: theme.spacing(-2),
    textAlign: 'right',
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
    const { classes, loading, view, title } = this.props;

    return(
      <Grid container justify="center">
        <Grid item xs={12} sm={8} md={5} lg={4} className={classes.mainContainer}>
          <Typography variant="h6" align="center" className={classes.title}>
            {title}
          </Typography>
          <div className={classes.formContainer}>
            <LoaderOverlay loading={loading} />
            {{
              [views.RECOVER_PASSWORD_FORM_VIEW]: (
                <RecoverPasswordForm onSubmit={this.handleRecoverPassword} />
              ),
              [views.RECOVER_PASSWORD_INSTRUCTIONS_VIEW]: (
                <>
                  <Typography variant="body2" align="left">
                    Hemos enviado un correo a la dirección que proporcionaste. Sigue las instrucciones para poder actualizar tu contraseña.
                  </Typography>
                  <div className={classes.buttonContainer}>
                    <Button 
                      component={Link}
                      to={generateStoreUrl('/login')}
                      variant="contained" 
                      color="primary"
                    >
                      Continuar
                    </Button>
                  </div>
                </>
              ),
              [views.RESET_PASSWORD_VIEW]: (
                <ResetPasswordForm onSubmit={this.handleResetPassword} />
              ),
              [views.RESET_PASSWORD_INSTRUCTIONS_VIEW]: (
                <>
                  <Typography variant="body2" align="left">
                    ¡Tu contraseña ha sido actualizada! Ya puedes iniciar sesión con tu nueva contraseña.
                  </Typography>
                  <div className={classes.buttonContainer}>
                    <Button 
                      component={Link}
                      to={generateStoreUrl('/login')}
                      variant="contained" 
                      color="primary"
                    >
                      Continuar
                    </Button>
                  </div>
                </>
              ),
            }[view]}
          </div>
          <div className={classes.footerContainer}>
            { (view == views.RECOVER_PASSWORD_FORM_VIEW || view == views.RECOVER_PASSWORD_FORM_VIEW) && (
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
    loading: state.get('forgot').get('loading'),
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
