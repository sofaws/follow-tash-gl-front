import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  CssBaseline, Drawer, AppBar, Toolbar, List, Typography, Divider, IconButton, Badge,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles/index';
import mainListItems from './navbar/navbarListComponent';
import UserProfilePageContainer from '../Containers/user/userProfilePageContainer';
import HomeContainer from '../Containers/home/homeContainer';
import TasksContainer from '../Containers/tasks/tasksContainer';
import TaskContainer from '../Containers/tasks/taskContainer';
import '../Stylesheets/app.css';
import {
  HOME_PAGE_URL, TASK_PAGE_URL, TASKS_PAGE_URL, USERS_PAGE_URL,
} from '../Constants/routeName';

const drawerWidth = 240;

const styles = theme => ({
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
});

class AppComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
    };
  }

    handleDrawerOpen = () => {
      this.setState({ open: true });
    };

    handleDrawerClose = () => {
      this.setState({ open: false });
    };

    render() {
      const { classes } = this.props;
      const { open } = this.state;

      return (
        <div id="app-container" className="root">
          <CssBaseline />
          <AppBar
            position="absolute"
            className={classNames(classes.appBar, open && classes.appBarShift)}
          >
            <Toolbar disableGutters={!open} className="toolbar">
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={open ? 'hide' : 'menuButton'}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                className="grow"
              >
                            BUS 2.0
              </Typography>
              <IconButton color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            classes={{
              paper: classNames(classes.drawerPaper, !open && classes.drawerPaperClose),
            }}
            open={open}
          >
            <div className={classes.toolbarIcon}>
              <IconButton onClick={this.handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider />
            <List>{mainListItems}</List>
          </Drawer>
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <section id="container">
              <Switch>
                {this.createRoute(HOME_PAGE_URL, HomeContainer)}
                {this.createRoute(TASKS_PAGE_URL, TasksContainer)}
                {this.createRoute(USERS_PAGE_URL, UserProfilePageContainer)}
                {this.createRoute(TASK_PAGE_URL, TaskContainer)}
              </Switch>
            </section>
          </main>
        </div>
      );
    }

    createRoute = (path, subComponent) => (
      <Route
        exact
        path={`/${path}`}
        component={subComponent}
        key={path}
      />
    )
}
export default withStyles(styles)(AppComp);
