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
};

class TaskContainer extends React.Component<Props> {
    state = { expanded: false };

    handleExpandClick = () => {
      this.setState(state => ({ expanded: !state.expanded }));
    };

    render() {
      const { classes } = this.props;

      return (
        <Card className={classes.card}>
          <CardHeader
            avatar={(
              <Avatar aria-label="Recipe" className={classes.avatar}>
                            R
              </Avatar>
                    )}
            title="Développer une page de connexion"
            subheader="Maxime Chabert"
          />
          <CardContent>
            <Typography component="p">
                        Description de l'issue, ici on donne plein d'informations sur comment accomplir la tache, le
                        fonctionnel, le technique etc.
            </Typography>
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
            <Chip
              label="Todo"
              className={classes.chip}
              color="secondary"
            />
            <Chip label="Front" className={classes.chip} variant="outlined" />
            <Chip label="Ilôt 1" className={classes.chip} variant="outlined" />
            <Chip label="2h00 estimées" className={classes.chip} variant="outlined" />
            <Chip label="3h45 consomnées" className={classes.chip} variant="outlined" />
            <Chip label="89% avancement" className={classes.chip} variant="outlined" />
            <Chip label="2h30 RAF" className={classes.chip} variant="outlined" />
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
