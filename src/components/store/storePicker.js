import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import storeService from 'services/store';
import { setStore } from './storeActions';

import { withStyles } from '@material-ui/core/styles';

import DialogWrapper from 'library/components/DialogWrapper';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  dialogContent: {
    boxSizing: 'border-box',
    padding: theme.spacing.unit * 6,
    paddingBottom: theme.spacing.unit * 7,
    maxWidth: '100%',
    width: 500,
  },
  buttonContainer: {
    marginTop: 24,
  },
  button: {
    marginRight: 16,
  }
});

class StorePicker extends Component {

  selectStore = store => {
    this.props.setStore(store);
    storeService.setStore(store);
    this.props.history.push(storeService.generateStoreUrl('/'));
  }

  render() {
    const { classes } = this.props;

    return(
      <DialogWrapper 
        open={true}
      >
        <AppBar position="relative">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Elige una tienda
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent className={classes.dialogContent}>
          <Typography variant="body1">
            Por favor selecciona la tienda que deseas visitar:
          </Typography>
          <div className={classes.buttonContainer}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => this.selectStore('omein')}
              className={classes.button}
            >
              Omein
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => this.selectStore('prana')}
              className={classes.button}
            >
              Prana
            </Button>
          </div>
        </DialogContent>
      </DialogWrapper>
    )
  }
}

const mapStateToProps = function mapStateToProps(state, props) {
  return {
  };
};

function mapDispatchToProps(dispatch) {
  return Object.assign({},
    bindActionCreators({ setStore }, dispatch),
  );
}

export default withStyles(styles)(withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(StorePicker)));
