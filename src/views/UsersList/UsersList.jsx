import React from "react";
import { withRouter } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import { default as CardMaterial } from "@material-ui/core/Card/Card";
import Typography from "@material-ui/core/Typography/Typography";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Grid from "@material-ui/core/Grid/Grid";
import Avatar from "@material-ui/core/Avatar/Avatar";

import CardHeader from "components/Card/CardHeader";
import CardBody from "components/Card/CardBody";
import Card from "components/Card/Card";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import FilterText from "components/Filters/FilterText";

import { connect } from "react-redux";
import { getAllUsers } from "reducers/index.reducer";
import {DESCRIPTION_MEMBER} from "../../config";

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
    filter: null
  };

  handleChangeFilter = e => {
    this.setState({
      filter: e.target.value
    });
  };

  membersWithFilter = () => {
    const { filter } = this.state;
    const { users } = this.props;
    if (!filter) return users;
    return users.filter(user => {
       const descriptionUser = DESCRIPTION_MEMBER[user.member.username];
        return (
        user.member.name.toUpperCase().includes(filter.toUpperCase()) ||
        user.member.username.toUpperCase().includes(filter.toUpperCase()) ||
        (descriptionUser && descriptionUser.toUpperCase().includes(filter.toUpperCase()))
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
                  {usersFilter.map(item => {
                    const user = item.member;
                    return (
                      <Grid key={user.id} item xs={3}>
                        <CardMaterial
                          key={user.id}
                          onClick={() => history.push(`/user/${user.id}`)}
                          className={classes.card}
                        >
                          <div className={classes.details}>
                            <CardContent className={classes.content}>
                              <Typography component="h5" variant="p">
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

function mapStateToProps(state) {
  return {
    users: getAllUsers(state)
  };
}

export default connect(
  mapStateToProps,
  null
)(withRouter(withStyles(styles)(UsersContainer)));
