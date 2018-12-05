import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import { secondsToHms } from "../../Utils/TimeHelper";
import React from "react";
import Button from "@material-ui/core/Button/Button";
import {Link} from "react-router-dom";
import {TASK_DETAIL_PAGE_URL} from "../../Constants/routeName";

interface TaskInterface {
    id: number;
    iid: number;
    title: string;
    description: string;
    labels: [];
    webUrl: string;
    estimatedTime: number;
    spentTime: number;
    state: string;
}

type Props = {
    tasks: Array<TaskInterface>,
};

export const historyTableComponent = (props: Props) => {
    const { tasks } = props;
    return (
    <Paper className="rootPaper">
        <Table className="table">
            <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Nom de la tâche</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Estimés</TableCell>
                    <TableCell>Imputés</TableCell>
                    <TableCell>Info</TableCell>

                </TableRow>
            </TableHead>
            <TableBody>
                {tasks.map(n => (
                    <TableRow key={n.id}>
                        <TableCell component="th" scope="row">
                            {n.id}
                        </TableCell>
                        <TableCell>{n.title}</TableCell>
                        <TableCell>{n.state}</TableCell>
                        <TableCell>{secondsToHms(n.estimatedTime)}</TableCell>
                        <TableCell>{secondsToHms(n.spentTime)}</TableCell>
                        <TableCell>
                            <Link to={`/${TASK_DETAIL_PAGE_URL}/${n.iid}`} className="navBar">
                            <Button  size="small" variant="outlined">
                           Détail
                        </Button>
                            </Link>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </Paper>
    )
}
