import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import LayersIcon from '@material-ui/icons/Layers';
import Divider from '@material-ui/core/es/Divider/Divider';
import { Link } from 'react-router-dom';
import { HOME_PAGE_URL, TASKS_PAGE_URL, USERS_PAGE_URL } from '../../Constants/routeName';
import './navBarList.css';

export default (
  <div>
    <Link to={`/${HOME_PAGE_URL}`} className="navBar">
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
    </Link>
    <Divider />
    <Link to={`/${USERS_PAGE_URL}`} className="navBar">
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Développeurs" />
      </ListItem>
    </Link>
    <Link to={`/${TASKS_PAGE_URL}`} className="navBar">
      <ListItem button>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Suivi des tâches" />
      </ListItem>
    </Link>
  </div>
);
