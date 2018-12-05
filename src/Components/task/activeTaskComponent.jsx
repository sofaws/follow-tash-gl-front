import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CardActions from '@material-ui/core/CardActions';
import './activeTaskStyle.css';
import { secondsToHms } from "../../Utils/TimeHelper";
import { TASK_PAGE_URL } from "../../Constants/routeName";
import {withRouter} from 'react-router-dom';
import {getRouteWithParams} from "../../Utils/RouterHelper";


interface TaskInterface {
  id: number;
  iid: number;
  title: string;
  description: string;
  labels: [];
  webUrl: string;
  estimatedTime: number;
  spentTime: number;
}
type Props = {
    task: TaskInterface,
    history: () => void,
};
const ActiveTaskComponent = ({task, history}: Props) => (
  <Card className="card">
    <CardContent>
      <Grid container alignContent="center" alignItems="center">
        <Grid item sm={11}>
          <Typography variant="h5" component="h2">
            {task.title}
          </Typography>

        </Grid>
        <Grid item sm={1}>
          <Button variant="fab" mini color="secondary" aria-label="More info"
                  onClick={() => history.push(getRouteWithParams(TASK_PAGE_URL, { id: task.id }))}>
            <Icon>show_chart</Icon>
          </Button>
        </Grid>
      </Grid>
    </CardContent>
    <CardContent>
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
      <CardActions className="shadow margin10Top">
          <Button  size="small" variant="outlined" href={task.webUrl}>
              Issue
          </Button>
          {task.labels.map((value,index) => (
              <Chip key={index} label={value}/>
          ))}
      </CardActions>
  </Card>
);

export default withRouter(ActiveTaskComponent);
