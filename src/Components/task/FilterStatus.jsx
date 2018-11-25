import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  FormControl, InputLabel, Select, Input, Chip, MenuItem,
} from '@material-ui/core';

const styles = {
  formControl: {
    margin: '15px',
    minWidth: 120,
    width: 200,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: '5px',
  },
  noLabel: {
    marginTop: '5px',
  },
};


const STATUS = [
  'opened',
  'En cours',
  'Fini',
  'Bloqué',
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

type Props = {
    classes: {},
    name: string,
    handleChange: () => void,
};
function FilterStatus({ classes, name, handleChange }: Props) {
  return (
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor="select-multiple-chip">Status</InputLabel>
      <Select
        multiple
        value={name}
        onChange={handleChange}
        input={<Input id="select-multiple-chip" />}
        renderValue={selected => (
          <div className={classes.chips}>
            {selected.map(value => (
              <Chip key={value} label={value} className={classes.chip} />
            ))}
          </div>
        )}
        MenuProps={MenuProps}
      >
        {STATUS.map(status => (
          <MenuItem key={status} value={status}>
            {status}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}


export default withStyles(styles)(FilterStatus);
