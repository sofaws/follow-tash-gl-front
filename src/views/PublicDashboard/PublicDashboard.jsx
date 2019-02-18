import React from "react";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
import Store from "@material-ui/icons/Store";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import {getStatus} from "utils/TaskHelper";
import {connect} from "react-redux";
import {
    getAllTasks,
    getNotAssignedUsers,
    getTotalConsumed,
    getTotalCost,
    getTotalEstimated,
    getTotalProgess,
    getTotalRaf,
    getTotalSkid,
    getUsersNotImputed
} from "reducers/index.reducer";
import {secondsToHms} from "utils/TimeHelper";
import {startSync} from "reducers/sync.reducer";
import Avatar from "@material-ui/core/es/Avatar/Avatar";
import TweetList from "components/TweetList/TweetList";

class PublicDashboard extends React.Component {
  memberIsAssigned = member => {
    let isAssignee = false;
    this.props.tasks.forEach(task => {
      if (task.assigneeId === member.id) isAssignee = true;
    });
    return isAssignee;
  };

  componentDidMount() {
    this.props.startSync();
  }

  render() {
    const { classes, tasks, usersNotImputed, totalProgess } = this.props;
    return (
      <div style={{ margin: "20px" }}>
        <GridContainer>
          <GridItem md={7}>
            <GridContainer>
              <GridItem xs={12} sm={6} md={6}>
                <Card>
                  <CardHeader color="warning" stats icon>
                    <CardIcon color="warning">
                      <Icon>content_copy</Icon>
                    </CardIcon>
                    <p className={classes.cardCategory}>Avancement du projet</p>
                    <h3 className={classes.cardTitle}>
                      {totalProgess} <small>%</small>
                    </h3>
                  </CardHeader>
                  <CardFooter stats>
                    <div className={classes.stats}>Allez on donne tout :D</div>
                  </CardFooter>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={6} md={6}>
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
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <Card>
                  <CardHeader color="danger">
                    <h4 className={classes.cardTitleWhite}>Wall of shame</h4>
                    <p className={classes.cardCategoryWhite}>
                      Si tu es dans cette liste alors impute vite tes temps,
                      avant que Jérémy te trouve ! :O
                    </p>
                  </CardHeader>
                  <CardBody>
                    Tu es trop souvent dans cette liste ? Alors ramène des
                    croissants pour te faire pardonner :D
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        margin: "10px",
                        flexWrap: "wrap"
                      }}
                    >
                      {usersNotImputed.map(user => (
                        <div
                          key={user.member.id}
                          style={{
                            margin: "25px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column"
                          }}
                        >
                          <Avatar
                            className={classes.avatar}
                            src={user.member.avatarUrl}
                          />
                          <p>{user.member.name}</p>
                        </div>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
          </GridItem>
          <GridItem md={5}>
            <h1>#SpeedCodingG4</h1>
            <TweetList />
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

PublicDashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    tasks: getAllTasks(state),
    usersNotImputed: getUsersNotImputed(state),
    totalProgess: getTotalProgess(state)
  };
}

export default connect(
  mapStateToProps,
  {
    startSync
  }
)(withRouter(withStyles(dashboardStyle)(PublicDashboard)));
