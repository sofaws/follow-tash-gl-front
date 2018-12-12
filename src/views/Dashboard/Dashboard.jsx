import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Tasks from "components/Tasks/Tasks.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import Danger from "components/Typography/Danger.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import api from "../../utils/Api.js";
import { getStatus } from "utils/TaskHelper";
import { Link, withRouter } from "react-router-dom";

class Dashboard extends React.Component {
  state = {
    tasks: [],
    members: []
  };

  async componentDidMount() {
    const tasks = await api.get("tasks").json();
    const members = await api.get("members").json();
    this.setState({
      tasks,
      members
    });
  }

  memberIsAssigned = member => {
    let isAssignee = false;
    this.state.tasks.forEach(task => {
      if (task.assigneeId === member.id) isAssignee = true;
    });
    return isAssignee;
  };

  render() {
    const { classes, history } = this.props;
    const { tasks, members } = this.state;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Icon>content_copy</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Tâches totales</p>
                <h3 className={classes.cardTitle}>
                  {tasks.length} <small>Tâches</small>
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Link to={"/tasks"}>Liste des tâches</Link>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Store />
                </CardIcon>
                <p className={classes.cardCategory}>Tâches en cours</p>
                <h3 className={classes.cardTitle}>
                  {
                    tasks.filter(
                      task => getStatus(task.labels, task.state) === "Doing"
                    ).length
                  }
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>On se motive..</div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                  <Icon>info_outline</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>
                  Développeurs non assignés
                </p>
                <h3 className={classes.cardTitle}>
                  {
                    members.filter(member => !this.memberIsAssigned(member))
                      .length
                  }
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  Au dessus de 5, c'est critique !
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <Accessibility />
                </CardIcon>
                <p className={classes.cardCategory}>Tâches bloquées</p>
                <h3 className={classes.cardTitle}>
                  {
                    tasks.filter(
                      task => getStatus(task.labels, task.state) === "Blocked"
                    ).length
                  }
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>L'entraide fait la force..</div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="danger">
                <h4 className={classes.cardTitleWhite}>Développeurs</h4>
                <p className={classes.cardCategoryWhite}>
                  Liste des développeurs assignés sur aucune tâche actuellement.
                </p>
              </CardHeader>
              <CardBody>
                <Table
                  type={"user"}
                  onPressItem={history.push}
                  tableHeaderColor="warning"
                  tableHead={["ID", "Nom", "Pseudo"]}
                  tableData={members
                    .filter(member => !this.memberIsAssigned(member))
                    .map(member => [member.id, member.name, member.username])}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(dashboardStyle)(Dashboard));
