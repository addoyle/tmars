import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

// eslint-disable-next-line no-unused-vars
const InputComponent = ({ inputRef, ...other }) => <div {...other} />;
const FieldSet = ({ children, label, fullWidth }) => (
  <TextField
    variant="outlined"
    label={label}
    multiline
    fullWidth={fullWidth}
    InputLabelProps={{ shrink: true }}
    InputProps={{
      inputComponent: InputComponent
    }}
    inputProps={{ children }}
  />
);

InputComponent.propTypes = {
  inputRef: PropTypes.any
};

FieldSet.propTypes = {
  label: PropTypes.node,
  children: PropTypes.node,
  fullWidth: PropTypes.bool
};

export default FieldSet;
