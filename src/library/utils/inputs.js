import React from 'react';
import { TextField } from '@material-ui/core';

export const renderTextField = ({
  label,
  input,
  meta: { touched, invalid, error },
  helperText,
  ...custom
}) => (
  <TextField
    label={label}
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error ? error : helperText}
    {...input}
    {...custom}
  />
)

const inputs = {
  renderTextField,
};

export default inputs;
