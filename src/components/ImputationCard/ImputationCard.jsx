import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import Card from '@material-ui/core/Card/Card';
import CardContent from '@material-ui/core/CardContent/CardContent';
import Avatar from '@material-ui/core/Avatar/Avatar';
import Typography from '@material-ui/core/Typography/Typography';
import {secondsToHms} from "utils/TimeHelper";

const styles = {
  contentImputation: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardImputation: {
    margin: 10,
    maxWidth: 350,
  },
};

type Props = {
    classes: {},
    name: string,
    date: Date,
    imputation: string,
};
function ImputationCard({
  classes, id, user, time
}: Props) {
  return (
    <Card key={id} className={classes.cardImputation}>
      <CardContent className={classes.contentImputation}>
        <Avatar src={user.avatarUrl} />
        <div>
          <Typography variant="overline">
              {user.name}
          </Typography>

        </div>
        <Typography variant="button">
            {secondsToHms(time)}
        </Typography>
      </CardContent>
    </Card>
  );
}


export default withStyles(styles)(ImputationCard);
