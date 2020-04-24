import React, { Component } from 'react';
import { Field } from 'redux-form/immutable';

import { InputAdornment, IconButton, withStyles } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

import { renderTextField } from 'library/utils/inputs';

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
        component={renderTextField}
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