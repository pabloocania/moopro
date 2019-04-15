/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from "react";
import {
  withStyles, MenuItem, TextField, Typography, Paper, Chip
} from "@material-ui/core";
import Select from "react-select";
import classNames from "classnames";
import Animated from "react-select/lib/animated";
import { emphasize } from "@material-ui/core/styles/colorManipulator";
import CancelIcon from "@material-ui/icons/Cancel";
import PropTypes from "prop-types";
import MainTheme from "../layouts/theme/MainTheme";

const styles = theme => ({
  input: {
    display: "flex",
    padding: 0
  },
  valueContainer: {
    display: "flex",
    flexWrap: "wrap",
    flex: 1,
    alignItems: "center",
    overflow: "hidden"
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === "light" ? theme.palette.grey[300] : theme.palette.grey[700],
      0.08
    )
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  placeholder: {
    position: "absolute",
    left: 2,
    fontSize: 16
  },
  paper: {
    position: "absolute",
    zIndex: 1,
    left: 0,
    right: 0
  },
  divider: {
    height: theme.spacing.unit * 2
  },
  label: {
    color: "#000000"
  }
});

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props) {
  console.log(props);
  return (
    <TextField
      fullWidth
      placeholder="PH"
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps
        }
      }}
      {...props.selectProps.textFieldProps}
    />
  );
}

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function ValueContainer(props) {
  return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function MultiValue(props) {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={classNames(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused
      })}
      color="primary"
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  );
}

function Menu(props) {
  return (
    <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  );
}

const components = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  ValueContainer
};

class CategoriesPicker extends React.Component {
  state = {
    multi: null
  };

  handleChange = name => (value) => {
    this.setState({
      [name]: value
    });
  };

  render() {
    const { classes, label, suggestionsStrings } = this.props;

    const selectStyles = {
      input: base => ({
        ...base,
        color: MainTheme.palette.text.primary,
        "& input": {
          font: "inherit"
        }
      })
    };
    return (
      <div>
        <Select
          classes={classes}
          styles={selectStyles}
          options={suggestionsStrings.map(s => ({ value: s, label: s }))}
          components={components}
          value={this.state.multi}
          onChange={this.handleChange("multi")}
          isMulti
          textFieldProps={{
            label
          }}
          placeholder=""
        />
      </div>
    );
  }
}

CategoriesPicker.propTypes = {
  classes: PropTypes.object.isRequired,
  label: PropTypes.object.isRequired,
  suggestionsStrings: PropTypes.object.isRequired
};

export default withStyles(styles)(CategoriesPicker);
