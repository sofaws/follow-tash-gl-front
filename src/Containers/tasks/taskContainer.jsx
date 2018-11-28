import React from 'react';
import { withStyles } from '@material-ui/core/styles/index';
import classnames from 'classnames';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/es/Chip/Chip';
import ImputationCard from '../../Components/task/ImputationCard';
import api from '../../Utils/Api';
import { getStatus, getTypeTask } from '../../Utils/TaskHelper';
import { secondsToHms } from '../../Utils/TimeHelper';
import { getPourcentProgress, getSumConsomned } from '../../Utils/ManagementHelper';

const styles = theme => ({
  card: {
    maxWidth: 1000,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  chip: {
    margin: 5,
  },
});


type Props = {
    classes: {},
    match: {
        params: {
            id: number
        }
    }
};

class TaskContainer extends React.Component<Props> {
    state = { expanded: false, task: {}, isLoad: false };

    async componentDidMount() {
      const task = await api.get(`tasks/${this.props.match.params.id}`).json();
      console.log(task);
      this.setState({
        task,
        isLoad: true,
      });
    }

    handleExpandClick = () => {
      this.setState(state => ({ expanded: !state.expanded }));
    };

    render() {
      const { classes } = this.props;
      const { task, isLoad } = this.state;

      if (!isLoad) return null;
      return (
        <Card className={classes.card}>
          <CardHeader
            avatar={(
              <Avatar aria-label="Recipe" className={classes.avatar}>
                            R
              </Avatar>
                    )}
            title={task.title}
            subheader="Maxime Chabert"
          />
          <CardContent>
            <Typography component="p">
              { task.description }
            </Typography>
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
            <Chip
              label={getStatus(task.labels, task.state)}
              className={classes.chip}
              color="secondary"
            />
            <Chip
              label={getTypeTask(task.labels) || 'Aucun type'}
              className={classes.chip}
              color="primary"
            />
            <Chip
              label={task.estimatedTime
                ? `${secondsToHms(task.estimatedTime)} estimées`
                : 'Non estimé'}
              className={classes.chip}
              variant="outlined"
            />
            <Chip
              label={task.consumedTime
                ? `${secondsToHms(getSumConsomned(task.consumedTime))} consomnées`
                : '00h00 consomnées'}
              className={classes.chip}
              variant="outlined"
            />
            <Chip
              label={task.remainingTime
                ? `${secondsToHms(task.remainingTime)} RAF`
                : 'RAF non renseigné'}
              className={classes.chip}
              variant="outlined"
            />
            <Chip
              label={task.remainingTime
                ? `${getPourcentProgress(getSumConsomned(task.consumedTime), task.remainingTime)} d'avancement`
                : 'Impossible de calculer l\'avancement'}
              className={classes.chip}
              variant="outlined"
            />

            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.expanded,
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
              <Typography variant="h6">
                Liste des imputations
              </Typography>
            </CardContent>
            <ImputationCard />
            <ImputationCard />
          </Collapse>
        </Card>
      );
    }
}

export default withStyles(styles)(TaskContainer);
