import React from 'react';
import { activeTaskComponent as ActiveTasks} from "../../Components/task/activeTaskComponent";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const dummyData = [
    {
        name:"Tâche1",
        real:"10:40",
        estimated:"11:00",
    },
    {
        name:"Tâche2",
        real:"10:40",
        estimated:"11:00",
    },
    {
        name:"Tâche3",
        real:"10:40",
        estimated:"11:00",
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