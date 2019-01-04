import React from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";

import TableTasks from "components/Table/TableTasks";
import ActiveTaskComponent from "components/ActiveTaskComponent/ActiveTaskComponent";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";

import { connect } from "react-redux";
import { getUserById } from "reducers/index.reducer";
import {getActiveTaskAtUser, getConsumnedByUser} from "reducers/index.reducer";
import {secondsToHms} from "utils/TimeHelper";
import Chip from "@material-ui/core/Chip";

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
  }
};

class UserProfile extends React.Component {

  render() {
    if (!this.props.user) return null;

    const { classes, user: { member, tasks }, assignedTasks, totalConsomnedTime } = this.props;
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
                <Grid
                  container
                  direction="row"
                  justify="space-evenly"
                  alignItems="center"
                  className={classes.containCards}
                >
                  {assignedTasks.length ? (
                      assignedTasks.map((value, index) => (
                      <Grid key={index} item className="padding4">
                        <ActiveTaskComponent task={value} />
                      </Grid>
                    ))
                  ) : (
                    <p>Aucune tâches assignées</p>
                  )}
                </Grid>
                <Typography variant="h6" gutterBottom component="h3">
                  Liste des tâches
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
                  <Chip
                      label={`${secondsToHms(totalConsomnedTime)} de consommée sur le projet`}
                      variant="outlined"
                  />
                <p className={classes.description}>
                  Un grand développeur ...comme tous les autres.
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
    totalConsomnedTime: getConsumnedByUser(state, { id: props.match.params.id })
  };
}

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(UserProfile));
