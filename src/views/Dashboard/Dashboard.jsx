import React from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
import Store from "@material-ui/icons/Store";
import Accessibility from "@material-ui/icons/Accessibility";

// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import { getStatus } from "utils/TaskHelper";
import { connect } from "react-redux";
import { getAllTasks, getTotalConsumed, getNotAssignedUsers, getTotalCost } from "reducers/index.reducer";
import {secondsToHms} from "utils/TimeHelper";

class Dashboard extends React.Component {
  memberIsAssigned = member => {
    let isAssignee = false;
    this.props.tasks.forEach(task => {
      if (task.assigneeId === member.id) isAssignee = true;
    });
    return isAssignee;
  };

  render() {
    const { classes, history, tasks, usersNotAssigned, totalConsumedTime, totalCost } = this.props;
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
                    usersNotAssigned.length
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
                  data={usersNotAssigned}
                  onPressItem={user => history.push(`user/${user.member.id}`)}
                  tableHeaderColor="warning"
                  tableHead={["ID", "Nom", "Pseudo"]}
                  tableData={usersNotAssigned.map(user => [
                    user.member.id,
                    user.member.name,
                    user.member.username
                  ])}
                />
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="success">
                <h4 className={classes.cardTitleWhite}>Des chiffres</h4>
                <p className={classes.cardCategoryWhite}>
                  Mais pas de lettres..
                </p>
              </CardHeader>
              <CardBody>
                <div className={classes.boxNumbersStats}>
                  <h3 className={classes.cardTitle}>
                    {secondsToHms(totalConsumedTime)}
                  </h3>
                  <p className={classes.titleNumberStats}>
                  heures de consommées sur le projet.
                  </p>
                </div>
                <div className={classes.boxNumbersStats}>
                  <h3 className={classes.cardTitle}>
                    {totalCost} euros
                  </h3>
                  <p className={classes.titleNumberStats}>
                    consommés sur le projet.
                  </p>
                </div>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    tasks: getAllTasks(state),
    usersNotAssigned: getNotAssignedUsers(state),
    totalConsumedTime: getTotalConsumed(state),
    totalCost: getTotalCost(state),
  };
}

export default connect(
  mapStateToProps,
  null
)(withRouter(withStyles(dashboardStyle)(Dashboard)));
