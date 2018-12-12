import React from "react";
import api from "../../utils/Api.js";
import withStyles from "@material-ui/core/es/styles/withStyles";
import { withRouter } from "react-router-dom";
import FilterText from "components/Filters/FilterText";
import Card from "@material-ui/core/es/Card/Card";
import Typography from "@material-ui/core/es/Typography/Typography";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import Grid from "@material-ui/core/es/Grid/Grid";
import Avatar from "@material-ui/core/es/Avatar/Avatar";

const styles = () => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
  },
  card: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer"
  },
  details: {
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flex: "1 0 auto"
  },
  avatar: {
    marginRight: 10,
    width: 60,
    height: 60
  }
});

class UsersContainer extends React.Component {
  state = {
    users: [],
    filter: null
  };

  async componentDidMount() {
    const users = await api.get("members").json();
    this.setState({
      users
    });
  }

  handleChangeFilter = e => {
    this.setState({
      filter: e.target.value
    });
  };

  membersWithFilter = () => {
    const { users, filter } = this.state;
    if (!filter) return users;
    return users.filter(user => {
      return (
        user.name.toUpperCase().includes(filter.toUpperCase()) ||
        user.username.toUpperCase().includes(filter.toUpperCase())
      );
    });
  };

  render() {
    const { classes, history } = this.props;
    const { filter } = this.state;
    const usersFilter = this.membersWithFilter();

    return (
      <div className={classes.root}>
        <FilterText name={filter} handleChange={this.handleChangeFilter} />
        <Grid container spacing={24}>
          {usersFilter.map(user => {
            return (
              <Grid  key={user.id} item xs={3}>
                <Card
                  key={user.id}
                  onClick={() => history.push(`/user/${user.id}`)}
                  className={classes.card}
                >
                  <div className={classes.details}>
                    <CardContent className={classes.content}>
                      <Typography component="h5" variant="h5">
                        {user.name}
                      </Typography>
                      <Typography variant="subtitle1" color="textSecondary">
                        {user.username}
                      </Typography>
                    </CardContent>
                    <div className={classes.controls} />
                  </div>
                  <Avatar className={classes.avatar} src={user.avatarUrl} />
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(UsersContainer));
