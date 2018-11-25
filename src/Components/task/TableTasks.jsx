import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Table, TableBody, TableCell, TableHead, TableRow, Paper,
} from '@material-ui/core';
import { secondsToHms } from '../../Utils/TimeHelper';

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
};

type Props = {
    classes: {},
    data: [],
};

function TableTasks(props: Props) {
  const { classes, data } = props;

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
            <TableRow key={n.id}>
              <TableCell component="th" scope="row">
                {n.iid}
              </TableCell>
              <TableCell>{n.title}</TableCell>
              <TableCell>{n.state}</TableCell>
              <TableCell>{n.assignee ? n.assignee.name : 'Aucun'}</TableCell>
              <TableCell>{n.time_stats.human_time_estimate || 'Non éstimée'}</TableCell>
              <TableCell>{n.time_stats.human_time_spent || '00h00'}</TableCell>
              <TableCell>{n.raf}</TableCell>
              <TableCell>{n.avancement}</TableCell>
              <TableCell className={n.derapage > 0 ? classes.derapageBad : classes.derapageGood}>
                {`${n.derapage < 0 ? '-' : ''}${secondsToHms(n.derapage)}`}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default withStyles(styles)(TableTasks);
