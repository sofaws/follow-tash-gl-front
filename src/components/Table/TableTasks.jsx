import React from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import { withRouter } from "react-router-dom";
import Avatar from "@material-ui/core/es/Avatar/Avatar";

import { getStatus } from "utils/TaskHelper";
import { secondsToHms } from "utils/TimeHelper";
import {
  getSumConsomned,
  getSkid,
  getPourcentProgress
} from "utils/ManagementHelper";

import Table from "./Table.jsx";

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
  row: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  avatar: {
    marginRight: 10,
    width: 30,
    height: 30
  }
};

function TableTasks({ classes, tasks, history }) {
  return (
    <Table
      tableHeaderColor="primary"
      tableHead={[
        "Id",
        "Titre",
        "Etat",
        "Personne assignée",
        "Estimés",
        "Consomnés",
        "Reste à faire",
        "Avancement",
        "Dérapage"
      ]}
      onPressItem={task => history.push(`/task/${task.id}`)}
      data={tasks}
      tableData={tasks.map(task => {
        return [
          task.id,
          task.title,
          getStatus(task.labels, task.state),
          task.assignee ? (
            <div className={classes.row}>
              <Avatar
                alt={task.assignee.name}
                src={task.assignee.avatarUrl}
                className={classes.avatar}
              />
              <span>{task.assignee.name}</span>
            </div>
          ) : (
            "Aucun assigné"
          ),
          task.estimatedTime ? secondsToHms(task.estimatedTime) : "Non éstimée",
          task.consumedTime
            ? secondsToHms(getSumConsomned(task.consumedTime))
            : "00h00",
          task.remainingTime || task.remainingTime === 0
            ? secondsToHms(task.remainingTime)
            : "Non renseigné",
          getPourcentProgress(
            getSumConsomned(task.consumedTime),
            task.remainingTime
          ),
          `${secondsToHms(
            getSkid(
              task.estimatedTime,
              getSumConsomned(task.consumedTime),
              task.remainingTime
            )
          )}`
        ];
      })}
    />
  );
}

export default withRouter(withStyles(styles)(TableTasks));
