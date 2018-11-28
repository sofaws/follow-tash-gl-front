import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/es/Card/Card';
import CardContent from '@material-ui/core/es/CardContent/CardContent';
import Avatar from '@material-ui/core/es/Avatar/Avatar';
import Typography from '@material-ui/core/es/Typography/Typography';
import red from '@material-ui/core/colors/red';

const styles = {
  contentImputation: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: red[500],
  },
  cardImputation: {
    margin: 10,
    marginLeft: 30,
    marginRight: 30,
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
  classes, name, date, imputation,
}: Props) {
  return (
    <Card className={classes.cardImputation}>
      <CardContent className={classes.contentImputation}>
        <Avatar aria-label="Recipe" className={classes.avatar}>
                    M
        </Avatar>
        <div>
          <Typography variant="overline">
                        Maxime CHABERT
          </Typography>
          <Typography component="p">
                        27/11/2018 à 18h28
          </Typography>
        </div>
        <Typography variant="button">
                    02h20
        </Typography>
      </CardContent>
    </Card>
  );
}


export default withStyles(styles)(ImputationCard);
