import React from 'react';
import { withStyles } from '@material-ui/core/styles/index';
import TableTasks from '../../Components/TableTasks';
import FilterStatus from '../../Components/FilterStatus';
import api from '../../Utils/Api';

const styles = {
  container: {
  },
};

let id = 0;
function createData(title, status, assignee, estimated, inputed, raf, avancement, derapage) {
  id += 1;
  return {
    id, title, status, assignee, estimated, inputed, raf, avancement, derapage,
  };
}

const data = [
  createData('Création d\'un bouton inscription', 'En cours', 'Lisa Mounier', '08h00', '12h00', '02:00', '80%', 10393),
  createData('Création d\'un bouton connexion', 'En cours', 'Maxime Chabert', '08h00', '12h00', '02:00', '80%', 8293),
  createData('Création d\'un bouton déconnexion', 'Fini', 'Maxime Blanc', '08h00', '06h00', '00:00', '100%', -8392),
];


type Props = {
    classes: {},
};


class TaskContainer extends React.Component<Props> {
    state = {
      status: [],
      data: [],
    };

    async componentDidMount() {
      const res = await api.get('tasks').json();
      this.setState({
        data: res,
      });
    }

    filterData = data => data.filter(element => this.state.status.length === 0 || this.state.status.includes(element.status));

    handleChange = (event) => {
      this.setState({ status: event.target.value });
    };

    render() {
      const { classes } = this.props;
      const { status } = this.state;
      /**
         * @Todo change constante data by state data
         */
      const dataFilter = this.filterData(data);

      return (
        <div className={classes.container}>
          <FilterStatus name={status} handleChange={this.handleChange} />
          <TableTasks data={dataFilter} />
        </div>
      );
    }
}

export default withStyles(styles)(TaskContainer);
