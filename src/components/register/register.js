import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import { 
  Grid,
  Button,
  Typography,
  withStyles
} from '@material-ui/core';

import { register, confirmRegistration } from 'http/sessionActions';
import LoaderOverlay from 'library/components/LoaderOverlay';
import { CONTACT_EMAIL } from 'res/constants';
import { generateStoreUrl } from 'services/store';
import RegisterAccountForm from './registerAccountForm';
import RegisterMemberForm from './registerMemberForm';
import { changeView } from './registerActions';
import views from './registerConstants';

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

class RegisterContainer extends Component {

  state = {
    validatedToken: false
  }

  componentDidMount() {
    if(this.props.token){
      this.props.confirmRegistration(this.props.token)
      .then(
        (response) => {
          this.setState({ validatedToken: true });
          return response;
        },
        (e) => {}
      );
    } else {
      this.setState({ validatedToken: true });
      this.props.changeView({
        view: views.REGISTER_VIEW,
        // TODO - Uncomment to show register form // view: views.REGISTER_STEP_1_VIEW,
        title: 'Crear cuenta',
      });
    }
  }

  handleBack = () => {
    this.props.changeView({
      view: views.REGISTER_STEP_1_VIEW,
      title: 'Crear cuenta',
    });
  }

  handleContinue = () => {
    this.props.changeView({
      view: views.REGISTER_STEP_2_VIEW,
      title: 'Crear cuenta',
    });
  }

  handleSubmit = (values) => {
    this.props.register(values);
  }

  render() {
    const { classes, loading, formError, view, title } = this.props;

    return(
      <>
        {this.state.validatedToken &&
          <Grid container justify="center">
            <Grid item xs={10} sm={7} md={4} className={classes.mainContainer}>
              <Typography variant="h6" align="center" className={classes.title}>
                {title}
              </Typography>
              <div className={classes.formContainer}>
                <LoaderOverlay loading={loading} />
                {{
                  [views.REGISTER_STEP_1_VIEW]: (
                    <RegisterAccountForm onSubmit={this.handleContinue} formError={formError} />
                  ),
                  [views.REGISTER_STEP_2_VIEW]: (
                    <RegisterMemberForm onSubmit={this.handleSubmit} handleBack={this.handleBack} loading={loading} formError={formError} />
                  ),
                  [views.REGISTER_INSTRUCTIONS_VIEW]: (
                    <React.Fragment>
                      <Typography variant="body2" align="left">
                        Hemos enviado un correo a la dirección que proporcionaste. Sigue las instrucciones para confirmar tu correo electrónico y activar tu cuenta.
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
                    </React.Fragment>
                  ),
                  [views.REGISTER_CONFIRMATION_VIEW]: (
                    <React.Fragment>
                      <Typography variant="body2" align="left">
                        ¡Gracias por confirmar tu dirección de correo! Ya puedes iniciar sesión.
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
                    </React.Fragment>
                  ),
                  [views.REGISTER_CONFIRMATION_ERROR_VIEW]: (
                    <Typography variant="body2" align="left">
                      Hubo un error al confirmar tu dirección de correo
                    </Typography>
                  ),
                }[view]}
              </div>
              <div className={classes.footerContainer}>
                { (view == views.REGISTER_STEP_1_VIEW || view == views.REGISTER_STEP_2_VIEW) && (
                  <Typography variant="subtitle2" align="right">
                    <a href={'mailto:' + CONTACT_EMAIL} className={classes.footerLink}>Ayuda</a>
                  </Typography>
                )}
              </div>
            </Grid>
          </Grid>
        }
      </>
    )
  }
}

const mapStateToProps = function mapStateToProps(state, props) {
  return {
    loading: state.get('register').get('loading'),
    formError: state.get('register').get('error'),
    view: state.get('register').get('view'),
    title: state.get('register').get('title'),
  };
};

function mapDispatchToProps(dispatch) {
  return Object.assign({},
    bindActionCreators({ register }, dispatch),
    bindActionCreators({ confirmRegistration }, dispatch),
    bindActionCreators({ changeView }, dispatch),
  );
}

export default withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterContainer));
