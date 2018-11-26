import React from 'react';
import { activeTaskComponent as ActiveTasks} from "../../Components/task/activeTaskComponent";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const dummyData = [
    {
        id: 45,
        title:"Tâche1",
        description: "looool",
        webUrl: "https://gitlab.com/institut-g4-lyon/on-teste-des-trucs/issues/3",
        spentTime: 5400,
        estimatedTime: 7200,
    },
    {
        title:"Tâche2",
        description: "looool",
        webUrl: "https://gitlab.com/institut-g4-lyon/on-teste-des-trucs/issues/3",
        spentTime: 5400,
        estimatedTime:7200,
    },
    {
        title:"Tâche3",
        webUrl: "https://gitlab.com/institut-g4-lyon/on-teste-des-trucs/issues/3",
        spentTime:5400,
        estimatedTime:7200,
    },
]
class UserProfilePageContainer extends React.Component {
    render() {
        return(
            <div>
                <Typography variant="h4" gutterBottom component="h2">
                    Tâches en cours
                </Typography>
                <Grid
                    container
                    direction="row"
                    justify="space-evenly"
                    alignItems="center"
                >
                    {dummyData.map((value,index) => (
                        <Grid key={index} item className="padding4">
                            <ActiveTasks task={value}/>
                        </Grid>
                    ))}
                </Grid>
            </div>
        )
    }

}

export default UserProfilePageContainer;