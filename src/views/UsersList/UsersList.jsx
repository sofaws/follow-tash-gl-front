import React from "react";
import api from "../../utils/Api.js";
import withStyles from "@material-ui/core/es/styles/withStyles";
import { withRouter } from "react-router-dom";
import FilterText from "components/Filters/FilterText";
import { default as CardMaterial } from "@material-ui/core/es/Card/Card";
import Typography from "@material-ui/core/es/Typography/Typography";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import Grid from "@material-ui/core/es/Grid/Grid";
import Avatar from "@material-ui/core/es/Avatar/Avatar";
import CardHeader from "components/Card/CardHeader";
import CardBody from "components/Card/CardBody";
import Card from "components/Card/Card";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";

const styles = () => ({
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    padding: 10
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
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>
                  {"Liste des développeurs"}
                </h4>
                <p className={classes.cardCategoryWhite}>
                  Pour trouver sa cible très facilement.
                </p>
              </CardHeader>
              <CardBody>
                <FilterText
                  name={filter}
                  handleChange={this.handleChangeFilter}
                />
                <Grid container spacing={24}>
                  {usersFilter.map(user => {
                    return (
                      <Grid key={user.id} item xs={3}>
                        <CardMaterial
                          key={user.id}
                          onClick={() => history.push(`/user/${user.id}`)}
                          className={classes.card}
                        >
                          <div className={classes.details}>
                            <CardContent className={classes.content}>
                              <Typography component="h5" variant="h5">
                                {user.name}
                              </Typography>
                              <Typography
                                variant="subtitle1"
                                color="textSecondary"
                              >
                                {user.username}
                              </Typography>
                            </CardContent>
                            <div className={classes.controls} />
                          </div>
                          <Avatar
                            className={classes.avatar}
                            src={user.avatarUrl}
                          />
                        </CardMaterial>
                      </Grid>
                    );
                  })}
                </Grid>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(UsersContainer));
