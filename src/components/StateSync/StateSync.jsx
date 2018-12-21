import * as React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "components/CustomButtons/Button";

type Props = {
    state: string,
    onCancel: () => void,
    onRestart: () => void,
    classes: {}
};
const StateSync = ({state, onCancel, onRestart, classes}: Props) => (
    <div className={classes.container}>
        {state ?  <div>
            <div className={classes.content}>
            { state === "START" ?
                <div className={classes.iconActive}/> : <div className={classes.iconInactive}/>
                }
                <p className={classes.state}>{state === "START" ? "Syncronisation activé" : "Syncronisation désactivé"}</p>
            </div>
                <Button
                    onClick={state === "START" ? onCancel : onRestart}
                    size={"sm"}
                    color={"white"}
                >
                    {state === "START" ? "Désactiver" : "Activer"}
                </Button>
            </div>
         : null}

    </div>
);

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center',
        margin: 15,
    },
    content: {
        display: 'flex',
        flexDirection: 'row'
    },
    state: {
        color: 'white',
        margin: 0,
        marginLeft: 5
    },
    iconActive: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: "#56AE5B"

    },
    iconInactive: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: "#EB4743"

    },
}

export default withStyles(styles)(StateSync);
