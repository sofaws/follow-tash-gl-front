import * as React from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import "./activeTaskStyle.css"

export const activeTaskComponent = (props)=> {
return(
    <Card className="card">
        <div className="flexEnd">
            <IconButton color="primary"  aria-label="More info">
                <Icon >show_chart</Icon>
            </IconButton>
        </div>
        <CardContent>
            <Typography variant="h5" component="h2">
                {props.task.name}
            </Typography>
            <Grid container spacing={24}>
                <Grid item xs={12} md={6}>
                    <Typography component="p">
                        Estimé <br/> {props.task.estimated}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography component="p">
                        Réel <br/> {props.task.real}
                    </Typography>
                </Grid>
            </Grid>
        </CardContent>

    </Card>
)
}