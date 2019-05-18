import React, { useState } from "react";
import {
  Select,
  MenuItem,
  Input,
  Chip,
  withStyles,
  FormControl,
  InputLabel
} from "@material-ui/core";
import { days } from "../lists/lists";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const styles = theme => ({
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: theme.spacing.unit / 4
  }
});
function daysPicker(props) {
  const [value, setValue] = useState([]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const { classes } = props;
  return (
    <FormControl className={classes.formControl} fullWidth>
      <InputLabel htmlFor="select-multiple-chip">Solo los dias</InputLabel>
      <Select
        fullWidth
        multiple
        value={value}
        onChange={handleChange}
        input={<Input id="select-multiple-chip" />}
        renderValue={selected => (
          <div className={classes.chips}>
            {selected.map(name => (
              <Chip key={name} label={name} className={classes.chip} />
            ))}
          </div>
        )}
        MenuProps={MenuProps}
      >
        {days.map(day => (
          <MenuItem key={day.id} value={day.value}>
            {day.value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default withStyles(styles)(daysPicker);
