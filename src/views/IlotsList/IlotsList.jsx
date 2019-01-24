import React from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {connect} from "react-redux";
import {getTasksByLots, getTasksByIlots} from "reducers/index.reducer";
import TableTasks from "components/Table/TableTasks";
import Chip from "@material-ui/core/es/Chip/Chip";
import {secondsToHms} from "../../utils/TimeHelper";
import {getPourcentProgress, getSkid} from "../../utils/ManagementHelper";

const styles = theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    title: {
        fontSize: theme.typography.pxToRem(20),
        fontWeight: theme.typography.fontWeightRegular,
    },
    chip: {
        margin: 5,
        marginBottom: 15
    },
    chipDerapageBad: {
        margin: 5,
        marginBottom: 15,
        color: "white",
        backgroundColor: "#E57373"
    }
});

class IlotsList extends React.Component<> {
    render() {
        const {classes, ilots} = this.props;
        return (
            <div className={classes.root}>
                {ilots.map(ilot =>
                    <ExpansionPanel key={ilot.title}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                            <Typography className={classes.heading}>{ilot.title}</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <div>
                                <Chip
                                    label={
                                        ilot.estimateTotal
                                            ? `${secondsToHms(ilot.estimateTotal)} estimées`
                                            : "Non estimé"
                                    }
                                    className={classes.chip}
                                    variant="outlined"
                                />
                                <Chip
                                    label={
                                        ilot.consumedTotal
                                            ? `${secondsToHms(ilot.consumedTotal)} consomnées`
                                            : "00h00 consomnées"
                                    }
                                    className={classes.chip}
                                    variant="outlined"
                                />
                                <Chip
                                    label={
                                        ilot.remainingTime || ilot.remainingTime === 0
                                            ? `${secondsToHms(ilot.remainingTime)} RAF`
                                            : "RAF non renseigné"
                                    }
                                    className={classes.chip}
                                    variant="outlined"
                                />
                                <Chip
                                    label={
                                        ilot.remainingTime || ilot.remainingTime === 0
                                            ? `${getPourcentProgress(ilot.consumedTotal,
                                            ilot.remainingTime
                                            )} d'avancement`
                                            : "Impossible de calculer l'avancement"
                                    }
                                    className={classes.chip}
                                    variant="outlined"
                                />

                                <Chip
                                    label={`${secondsToHms(
                                        getSkid(
                                            ilot.estimateTotal,
                                            ilot.consumedTotal,
                                            ilot.remainingTime
                                        )
                                    )} de dérapage`}
                                    className={
                                        getSkid(
                                            ilot.estimateTotal,
                                            ilot.consumedTotal,
                                            ilot.remainingTime
                                        ) > 0 ? classes.chipDerapageBad : classes.chip
                                    }
                                />

                                <Chip
                                    label={`${ilot.totalCost} euros consomnés`}
                                    className={classes.chip}
                                    variant="outlined"
                                />

                                <Typography className={classes.title}>
                                   Liste des tâches
                                </Typography>
                                <TableTasks tasks={ilot.tasks} />
                            </div>
                        </ExpansionPanelDetails>

                    </ExpansionPanel>
                )}
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        ilots: getTasksByIlots(state)
    };
}

export default connect(
    mapStateToProps,
    null
)(withStyles(styles)(IlotsList));
