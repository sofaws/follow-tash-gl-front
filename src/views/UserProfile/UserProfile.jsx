import React from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography/Typography";
import moment from "moment";
import "moment/locale/fr"; // without this line it didn't work
import TableTasks from "components/Table/TableTasks";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";

import {connect} from "react-redux";
import {getActiveTaskAtUser, getConsumedByUser, getCostByUser, getUserById} from "reducers/index.reducer";
import {secondsToHms} from "utils/TimeHelper";
import Chip from "@material-ui/core/Chip";
import {DESCRIPTION_DEFAULT, DESCRIPTION_MEMBER} from "../../config";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  containCards: {
    padding: 25
  },
  chip: {
    margin: "10px"
  },
  valueImportant: {
    color: "#3C4858",
    fontWeight: "600",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif"
  }
};

class UserProfile extends React.Component {
  render() {
    if (!this.props.user) return null;

    const {
      classes,
      user: { member, tasks, lastDateImputation },
      assignedTasks,
      totalConsumedTime,
      totalCost
    } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>{"Suivi d'activité"}</h4>
                <p className={classes.cardCategoryWhite}>
                  Que fait-il ? un Babyfoot? une tâche importante?
                </p>
              </CardHeader>
              <CardBody>
                <Typography variant="h6" gutterBottom component="h3">
                  Tâches assignées
                </Typography>
                {assignedTasks.length ? (
                  <TableTasks tasks={assignedTasks} />
                ) : (
                  <p>Aucune tâches assignées</p>
                )}
                <Typography variant="h6" gutterBottom component="h3">
                  Toutes les tâches
                </Typography>
                {tasks.length ? (
                  <TableTasks tasks={tasks} />
                ) : (
                  <p>Aucune tâche liée au déveleppeur</p>
                )}
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card profile>
              <CardAvatar profile>
                <img src={member.avatarUrl} alt="..." />
              </CardAvatar>
              <CardBody profile>
                <h6 className={classes.cardCategory}>@{member.username}</h6>
                <h4 className={classes.cardTitle}>{member.name}</h4>
                <h4 className={classes.cardTitle}>
                  {lastDateImputation
                    ? `Dernière imputation : ${moment(lastDateImputation)
                        .locale("fr")
                        .format("LLL")}`
                    : "Aucune imputation"}
                </h4>
                <Chip
                  className={classes.chip}
                  label={
                    <p>
                      <span className={classes.valueImportant}>
                        {secondsToHms(totalConsumedTime)}
                      </span>{" "}
                      de consommées sur le projet
                    </p>
                  }
                  variant="outlined"
                />
                <Chip
                  className={classes.chip}
                  label={
                    <p>
                      Coût de{" "}
                      <span className={classes.valueImportant}>
                        {totalCost}
                      </span>{" "}
                      euros
                    </p>
                  }
                  variant="outlined"
                />
                <p className={classes.description}>
                  {DESCRIPTION_MEMBER[member.username] || DESCRIPTION_DEFAULT}
                </p>
                <a href={`https://gitlab.com/${member.username}`}>
                  <Button color="primary" round>
                    Profil Gitlab
                  </Button>
                </a>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    user: getUserById(state, { id: props.match.params.id }),
    assignedTasks: getActiveTaskAtUser(state, { id: props.match.params.id }),
    totalConsumedTime: getConsumedByUser(state, { id: props.match.params.id }),
    totalCost: getCostByUser(state, { id: props.match.params.id })
  };
}

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(UserProfile));
