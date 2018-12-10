import React from 'react';
import {withStyles} from '@material-ui/core/styles/index';
import classnames from 'classnames';
import _ from 'lodash';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/es/Chip/Chip';
import ImputationCard from '../../Components/task/ImputationCard';
import api from '../../Utils/Api';
import {getStatus, getTypeTask} from '../../Utils/TaskHelper';
import {secondsToHms} from '../../Utils/TimeHelper';
import {getPourcentProgress, getSumConsomned} from '../../Utils/ManagementHelper';
import {getSkid} from "../../Utils/ManagementHelper";

const styles = theme => ({
    card: {
        maxWidth: 1500,
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
    chip: {
        margin: 5,
    },

    chipDerapageBad: {
        margin: 5,
        color: 'white',
        backgroundColor: '#E57373',

    },
});


type
Props = {
    classes: {},
    match: {
        params: {
            id: number
        }
    }
};

class TaskContainer extends React.Component<Props> {
    state = {expanded: false, task: {}, isLoad: false};

    async componentDidMount() {
        const task = await api.get(`tasks/${this.props.match.params.id}`).json();
        console.log(task);
        this.setState({
            task,
            isLoad: true,
        });
    }

    handleExpandClick = () => {
        this.setState(state => ({expanded: !state.expanded}));
    };

    render() {
        const {classes} = this.props;
        const {task, isLoad} = this.state;

        if (!isLoad) return null;
        return (
            <Card className={classes.card}>
                <CardHeader
                    avatar={(
                        task.assignee && <Avatar src={task.assignee.avatarUrl}/>
                    )}
                    title={task.title}
                    subheader={task.assignee ? task.assignee.name : "Aucun assigné"}
                />
                <CardContent>
                    <Typography component="p">
                        {task.description}
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
                        label={task.remainingTime || task.remainingTime === 0
                            ? `${secondsToHms(task.remainingTime)} RAF`
                            : 'RAF non renseigné'}
                        className={classes.chip}
                        variant="outlined"
                    />
                    <Chip
                        label={task.remainingTime || task.remainingTime === 0
                            ? `${getPourcentProgress(getSumConsomned(task.consumedTime), task.remainingTime)} d'avancement`
                            : 'Impossible de calculer l\'avancement'}
                        className={classes.chip}
                        variant="outlined"
                    />

                    <Chip
                        label={`${secondsToHms(getSkid(task.estimatedTime, getSumConsomned(task.consumedTime), task.remainingTime))} de dérapage`}
                        className={getSkid(task.estimatedTime, getSumConsomned(task.consumedTime), task.remainingTime) > 0 && classes.chipDerapageBad}
                    />

                    <IconButton
                        className={classnames(classes.expand, {
                            [classes.expandOpen]: this.state.expanded,
                        })}
                        onClick={this.handleExpandClick}
                        aria-expanded={this.state.expanded}
                        aria-label="Show more"
                    >
                        <ExpandMoreIcon/>
                    </IconButton>
                </CardActions>
                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography variant="h6">
                            Liste des imputations
                        </Typography>
                        {task.consumedTime ? _.map(task.consumedTime, (task) =>
                            <ImputationCard key={task.user.id} {...task} />
                        ) : <Typography component="p">
                            Aucunes imputations pour cette tâche
                        </Typography>
                        }
                    </CardContent>

                </Collapse>
            </Card>
        );
    }
}

export default withStyles(styles)(TaskContainer);
