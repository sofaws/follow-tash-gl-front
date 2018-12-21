import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import {
    FormControl, TextField,
} from '@material-ui/core';

const styles = {
    formControl: {
        minWidth: 120,
        width: 200,
        margin: '15px',
    },
    textField: {
        width: 250,
    },
};

type Props = {
    classes: {},
    name: string,
    handleChange: () => void,
};
function FilterText({ classes, name, handleChange }: Props) {
    return (
        <FormControl className={classes.formControl}>
            <TextField
                id="standard-name"
                label="Recherche textuelle"
                className={classes.textField}
                value={name}
                onChange={handleChange}
                margin="normal"
                autoFocus
            />
        </FormControl>
    );
}


export default withStyles(styles)(FilterText);
