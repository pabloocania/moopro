import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import moment from "moment";
import PropTypes from "prop-types";

function CustomDatePicker(props) {
  const {
    label, name, onDateSelection, value
  } = props;

  const onChange = (e) => {
    if (onDateSelection) {
      const date = moment(e.target.value).format("DD-MM-YYYY");
      onDateSelection(date, e.target.name);
    }
  };

  return (
    <TextField
      id="date"
      name={name}
      label={label}
      type="date"
      defaultValue={moment(value).format("YYYY-MM-DD")}
      fullWidth
      onChange={onChange}
      InputLabelProps={{
        shrink: true
      }}
    />
  );
}

CustomDatePicker.defaultProps = {
  value: new Date(),
  onDateSelection: null
};

CustomDatePicker.propTypes = {
  value: PropTypes.object,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onDateSelection: PropTypes.func
};

export default CustomDatePicker;
