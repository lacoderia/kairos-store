import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { 
  DialogContent,
  Button,
  AppBar,
  Toolbar,
  Typography,
  withStyles
} from '@material-ui/core';

import DialogWrapper from 'library/components/DialogWrapper';

const styles = theme => ({
  dialogContent: {
    boxSizing: 'border-box',
    padding: theme.spacing(6),
    paddingBottom: theme.spacing(7),
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
    this.props.history.push(`/${store}/`);
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

export default withStyles(styles)(withRouter(StorePicker));
