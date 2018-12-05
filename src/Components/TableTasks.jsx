import React from 'react';
import {
  Table, TableBody, TableCell, TableHead, TableRow, Paper,
} from '@material-ui/core';
import { secondsToHms } from '../Utils/TimeHelper';

type Props = {
    data: [],
};

function TableTasks(props: Props) {
  const { data } = props;

  return (
    <Paper className="rootPaper">
      <Table className="table">
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
                {n.id}
              </TableCell>
              <TableCell>{n.title}</TableCell>
              <TableCell>{n.status}</TableCell>
              <TableCell>{n.assignee}</TableCell>
              <TableCell>{n.estimated}</TableCell>
              <TableCell>{n.inputed}</TableCell>
              <TableCell>{n.raf}</TableCell>
              <TableCell>{n.avancement}</TableCell>
              <TableCell className={n.derapage > 0 ? "derapageBad" : "derapageGood"}>
                {`${n.derapage < 0 ? '-' : ''}${secondsToHms(n.derapage)}`}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default TableTasks;
