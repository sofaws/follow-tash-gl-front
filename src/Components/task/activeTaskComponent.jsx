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
import { TASK_DETAIL_PAGE_URL } from "../../Constants/routeName";
import { Link } from 'react-router-dom';
interface TaskInterface {
  id: number;
  iid: number;
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
            <Button  size="small" variant="outlined" href={task.webUrl}>
              Issue
            </Button>
        </Grid>
        <Grid item sm={1}>
            <Link to={`/${TASK_DETAIL_PAGE_URL}/:${task.iid}`} className="navBar">
          <Button variant="fab" mini color="secondary" aria-label="More info">
            <Icon>show_chart</Icon>
          </Button>
            </Link>
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
