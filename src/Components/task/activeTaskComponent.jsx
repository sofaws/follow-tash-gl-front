import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import './activeTaskStyle.css';
import { secondsToHms } from "../../Utils/TimeHelper";

interface TaskInterface {
  id: number;
  title: string;
  description: string;
  labels: {};
  webUrl: string;
  estimatedTime: number;
  spentTime: number;
}
type Props = {
    task: TaskInterface,
};
export const activeTaskComponent = ({task}: Props) => (
  <Card className="card">
    <CardContent>
      <Grid container alignContent="center" alignItems="center">
        <Grid item sm={11}>
          <Typography variant="h5" component="h2">
            {task.title}
          </Typography>
        </Grid>
        <Grid item sm={1}>
          <Button variant="fab" mini color="secondary" aria-label="More info" href={task.webUrl}>
            <Icon>show_chart</Icon>
          </Button>
        </Grid>
      </Grid>
    </CardContent>
    <CardContent>
        <Typography variant="body1" component="p">
            {task.description}
        </Typography>
      <div className="flexEvenly">
        <Chip
          label={`Estimé ${secondsToHms(task.estimatedTime)}`}
          color="primary"
          className="bold"
        />
        <Chip
          label={`Réel ${secondsToHms(task.spentTime)}`}
          color="secondary"
          className="bold"
        />
      </div>
    </CardContent>

  </Card>
);
