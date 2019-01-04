import React from "react";
import classnames from "classnames";
import _ from "lodash";

import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Chip from "@material-ui/core/Chip/Chip";
import ReactMarkdown from 'react-markdown';
import ImputationCard from "components/ImputationCard/ImputationCard";

import { getStatus, getTypeTask } from "utils/TaskHelper";
import { secondsToHms } from "utils/TimeHelper";
import {
  getSumConsomned,
  getSkid,
  getPourcentProgress
} from "utils/ManagementHelper";
import { connect } from "react-redux";
import { getTaskById } from "reducers/index.reducer";

const styles = theme => ({
  card: {
    maxWidth: 1500
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: "auto",
    [theme.breakpoints.up("sm")]: {
      marginRight: -8
    }
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  chip: {
    margin: 5
  },

  chipDerapageBad: {
    margin: 5,
    color: "white",
    backgroundColor: "#E57373"
  }
});

class TaskDetails extends React.Component<> {
  state = { expanded: false };


  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes } = this.props;
    const { task } = this.props;

    if (!task) return null;
    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={task.assignee && <Avatar src={task.assignee.avatarUrl} />}
          title={task.title}
          subheader={task.assignee ? task.assignee.name : "Aucun assigné"}
        />
        <CardActions className={classes.actions} disableActionSpacing>
          <Chip
            label={getStatus(task.labels, task.state)}
            className={classes.chip}
            color="secondary"
          />
          <Chip
            label={getTypeTask(task.labels) || "Aucun type"}
            className={classes.chip}
            color="primary"
          />
          <Chip
            label={
              task.estimatedTime
                ? `${secondsToHms(task.estimatedTime)} estimées`
                : "Non estimé"
            }
            className={classes.chip}
            variant="outlined"
          />
          <Chip
            label={
              task.consumedTime
                ? `${secondsToHms(
                    getSumConsomned(task.consumedTime)
                  )} consomnées`
                : "00h00 consomnées"
            }
            className={classes.chip}
            variant="outlined"
          />
          <Chip
            label={
              task.remainingTime || task.remainingTime === 0
                ? `${secondsToHms(task.remainingTime)} RAF`
                : "RAF non renseigné"
            }
            className={classes.chip}
            variant="outlined"
          />
          <Chip
            label={
              task.remainingTime || task.remainingTime === 0
                ? `${getPourcentProgress(
                    getSumConsomned(task.consumedTime),
                    task.remainingTime
                  )} d'avancement`
                : "Impossible de calculer l'avancement"
            }
            className={classes.chip}
            variant="outlined"
          />

          <Chip
            label={`${secondsToHms(
              getSkid(
                task.estimatedTime,
                getSumConsomned(task.consumedTime),
                task.remainingTime
              )
            )} de dérapage`}
            className={
              getSkid(
                task.estimatedTime,
                getSumConsomned(task.consumedTime),
                task.remainingTime
              ) > 0 && classes.chipDerapageBad
            }
          />

          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography variant="h6">Liste des imputations</Typography>
            {task.consumedTime ? (
                _.map(task.consumedTime, task => (
                    <ImputationCard key={task.user.id} {...task} />
                ))
            ) : (
                <Typography component="p">
                  Aucunes imputations pour cette tâche
                </Typography>
            )}
          </CardContent>
        </Collapse>
        <CardContent>
          <Typography component="p"><ReactMarkdown source={task.description} /></Typography>
        </CardContent>
      </Card>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    task: getTaskById(state, { id: props.match.params.id })
  };
}

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(TaskDetails));
