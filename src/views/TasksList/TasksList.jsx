import React from "react";
import {connect} from "react-redux";

import withStyles from "@material-ui/core/styles/withStyles";

import Grid from "@material-ui/core/Grid/Grid";

import FilterStatus from "components/Filters/FilterStatus";
import FilterText from "components/Filters/FilterText";
import FilterIlot from "components/Filters/FilterIlot";
import TableTasks from "components/Table/TableTasks";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import FilterLot from "components/Filters/FilterLot";

import { getStatus, getLotTask, getIlotTask } from "utils/TaskHelper";
import {getAllTasks} from "reducers/index.reducer";

const styles = {
    cardCategoryWhite: {
        "&,& a,& a:hover,& a:focus": {
            color: "rgba(255,255,255,.62)",
            margin: "0",
            fontSize: "14px",
            marginTop: "0",
            marginBottom: "0"
        },
        "& a,& a:hover,& a:focus": {
            color: "#FFFFFF"
        }
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none",
        "& small": {
            color: "#777",
            fontSize: "65%",
            fontWeight: "400",
            lineHeight: "1"
        }
    },
};

type Props = {
    classes: {},
    history: {},
};

class TasksList extends React.Component<Props> {
    state = {
        status: [],
        lots: [],
        filterText: '',
        ilots: [],
    };

    filterTasks = () => {
        const { status, filterText, lots, ilots } = this.state;
        const { tasks } = this.props;
        const filterTextUppercase = filterText.toUpperCase();
        return tasks.filter(
            element => (status.length === 0 || status.includes(getStatus(element.labels, element.state)))
                && (filterText === '' || element.title.toUpperCase().includes(filterTextUppercase)
                    || (element.assignee
                        && element.assignee.name.toUpperCase().includes(filterTextUppercase))
                )
                && (lots.length === 0
                    || lots.includes(getLotTask(element.labels))
                )
                && (ilots.length === 0
                    || ilots.includes(getIlotTask(element.labels))
                ),
        );
    };

    handleChangeFilter = name => (event) => {
        this.setState({ [name]: event.target.value });
    };


    render() {
        const {classes, history} = this.props;
        const {status, filterText, lots, ilots} = this.state;
        const tasksFilter = this.filterTasks();
        return (
            <Card>
                <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>Liste des tâches</h4>
                    <p className={classes.cardCategoryWhite}>
                        L'ensemble des tâches du projet avec les informations associées
                    </p>
                </CardHeader>
                <CardBody>
                    <Grid
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="center"
                    >
                        <FilterStatus name={status} handleChange={this.handleChangeFilter('status')} />
                        <FilterLot name={lots} handleChange={this.handleChangeFilter('lots')} />
                        <FilterIlot name={ilots} handleChange={this.handleChangeFilter('ilots')} />
                        <FilterText name={filterText} handleChange={this.handleChangeFilter('filterText')} />
                    </Grid>
                    <TableTasks tasks={tasksFilter} />
                </CardBody>
            </Card>
        );
    }
}

function mapStateToProps(state) {
    return {
        tasks: getAllTasks(state)
    };
}

export default connect(
    mapStateToProps,
    null
)(withStyles(styles)(TasksList));

