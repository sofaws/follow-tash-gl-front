import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import './activeTaskStyle.css';

export const activeTaskComponent = props => (
  <Card className="card">
    <CardContent>
      <Grid container alignContent="center" alignItems="center">
        <Grid item sm={11}>
          <Typography variant="h5" component="h2">
            {props.task.name}
          </Typography>
        </Grid>
        <Grid item sm={1}>
          <Button variant="fab" mini color="secondary" aria-label="More info">
            <Icon>show_chart</Icon>
          </Button>
        </Grid>
      </Grid>
    </CardContent>
    <CardContent>

      <div className="flexEvenly">
        <Chip
          label={`Estimé ${props.task.estimated}`}
          color="primary"
          className="bold"
        />
        <Chip
          label={`Réel ${props.task.real}`}
          color="secondary"
          className="bold"
        />
      </div>
    </CardContent>

  </Card>
);
