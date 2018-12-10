import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Table, TableBody, TableCell, TableHead, TableRow, Paper, Avatar,
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { secondsToHms } from '../../Utils/TimeHelper';
import { getStatus } from '../../Utils/TaskHelper';
import { getRouteWithParams } from '../../Utils/RouterHelper';
import { TASK_PAGE_URL } from '../../Constants/routeName';
import { getPourcentProgress, getSkid, getSumConsomned } from '../../Utils/ManagementHelper';

const styles = {
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  derapageBad: {
    color: 'red',
  },
  derapageGood: {
    color: 'green',
  },
  avatar: {
    marginRight: 10,
    width: 30,
    height: 30,
  },
  row: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  tableRow: {
    cursor: 'pointer',
  },
};

type Props = {
    classes: {},
    data: [],
    history: () => void,
};


function TableTasks(props: Props) {
  const { classes, data, history } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nom de la tâche</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Personne assignée</TableCell>
            <TableCell>Estimés</TableCell>
            <TableCell>Imputés</TableCell>
            <TableCell>Reste à faire</TableCell>
            <TableCell>Avancement</TableCell>
            <TableCell>Dérapage</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(n => (
            <TableRow className={classes.tableRow} key={n.id} onClick={() => history.push(getRouteWithParams(TASK_PAGE_URL, { id: n.id }))} hover>
              <TableCell component="th" scope="row">
                {n.iid}
              </TableCell>
              <TableCell>{n.title}</TableCell>
              <TableCell>{getStatus(n.labels, n.state)}</TableCell>
              <TableCell>
                {n.assignee ? (
                  <div className={classes.row}>
                    <Avatar alt={n.assignee.name} src={n.assignee.avatarUrl} className={classes.avatar} />
                    <span>{n.assignee.name}</span>
                  </div>
                ) : 'Aucun assigné'}
              </TableCell>
              <TableCell>{n.estimatedTime ? secondsToHms(n.estimatedTime) : 'Non éstimée'}</TableCell>
              <TableCell>{n.consumedTime ? secondsToHms(getSumConsomned(n.consumedTime)) : '00h00'}</TableCell>
              <TableCell>{n.remainingTime || n.remainingTime === 0 ? secondsToHms(n.remainingTime) : 'Non renseigné'}</TableCell>
              <TableCell>
                {getPourcentProgress(getSumConsomned(n.consumedTime), n.remainingTime)}
              </TableCell>
              <TableCell className={getSkid(n.estimatedTime, getSumConsomned(n.consumedTime), n.remainingTime) > 0 ? classes.derapageBad : classes.derapageGood}>
                {`${secondsToHms(getSkid(n.estimatedTime, getSumConsomned(n.consumedTime), n.remainingTime))}`}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default withRouter(withStyles(styles)(TableTasks));
