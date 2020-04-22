import React, { Component } from 'react';
import { Field } from 'redux-form/immutable';
import { TextField } from 'redux-form-material-ui';

import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const styles = theme => ({
  input: {
    height: '1.1875em'
  },
});

class PasswordField extends Component {
  state = {
    showPassword: false,
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  render() {
    const { classes, name, label, margin, variant, autoFocus, helperText } = this.props;

    return(
      <Field
        name={name}
        component={TextField}
        type={this.state.showPassword ? 'text' : 'password'}
        label={label}
        margin={margin}
        variant={variant}
        autoFocus={autoFocus}
        helperText={helperText}
        inputProps={{
          className: classes.input,
        }}
        InputProps={{
          endAdornment: <InputAdornment position="end">
                          <IconButton
                            aria-label="Activar/desactivar visibilidad del password"
                            onClick={this.handleClickShowPassword}
                            onMouseDown={this.handleMouseDownPassword}
                            tabIndex="-1"
                          >
                            {this.state.showPassword ? <VisibilityOff style={{ fontSize: 20 }} /> : <Visibility style={{ fontSize: 20 }} />}
                          </IconButton>
                        </InputAdornment>,
        }}
      />
    )
  }
}

export default withStyles(styles)(PasswordField);