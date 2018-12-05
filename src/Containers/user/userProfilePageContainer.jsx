import React from 'react';
import { activeTaskComponent as ActiveTasks} from "../../Components/task/activeTaskComponent";
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import api from "../../Utils/Api";
import { historyTableComponent as HistoryTableComponent } from "../../Components/user/historyTableComponent"

class UserProfilePageContainer extends React.Component {

    state = {
        user: {},
        tasks:[],
        activeTasks: [],
        pastTasks: [],
    };

    async componentDidMount() {
        const res = await api.get('members/907289').json();
        this.setState({
            user: res.member,
            tasks: res.tasks,
            activeTasks: res.tasks.filter(element => element.state === "opened" ),
            pastTasks: res.tasks.filter(element => element.state !== "opened" )
        });
    }

    render() {
        return(
            <div>
                <Grid container className="flexCenter">
                    <Grid item style={{textAlign: "center"}}>
                        <Avatar alt={this.state.user.name} src={this.state.user.avatarUrl} style={{
                            margin: 10,
                            width: 80,
                            height: 80,}}/>
                        <Typography component="h4">{this.state.user.name}</Typography>
                            <Typography  component="h4">({this.state.user.username})</Typography>
                    </Grid>
                </Grid>
                <section className="margin30TopBottom">
                <Typography variant="h4" gutterBottom component="h2">
                    Tâches en cours
                </Typography>
                <Grid
                    container
                    direction="row"
                    justify="space-evenly"
                    alignItems="center"
                >
                    {this.state.activeTasks.map((value,index) => (
                        <Grid key={index} item className="padding4">
                            <ActiveTasks task={value}/>
                        </Grid>
                    ))}
                </Grid>
                </section>
                <section className="margin30TopBottom">
                    <Typography variant="h4" gutterBottom component="h2">
                       Historique des tâches
                    </Typography>
                    <HistoryTableComponent tasks={this.state.pastTasks}> </HistoryTableComponent>
                </section>
            </div>
        )
    }

}

export default UserProfilePageContainer;
