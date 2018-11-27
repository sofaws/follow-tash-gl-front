import React from 'react';
import { withStyles } from '@material-ui/core/styles/index';
import Grid from '@material-ui/core/es/Grid/Grid';
import TableTasks from '../../Components/task/TableTasks';
import FilterStatus from '../../Components/task/FilterStatus';
import api from '../../Utils/Api';
import FilterText from '../../Components/task/FilterText';
import { getStatus } from '../../Utils/TaskHelper';

const styles = {
  container: {
  },
};


type Props = {
    classes: {},
};

class TasksContainer extends React.Component<Props> {
    state = {
      status: [],
        tasks: [],
      filterText: '',
    };

    async componentDidMount() {
      const tasks = await api.get('tasks').json();
      this.setState({
          tasks,
      });
    }

    filterTasks = () => {
      const { tasks, status, filterText } = this.state;
      const filterTextUppercase = filterText.toUpperCase();
      return tasks.filter(
        element => (status.length === 0
            || status.includes(getStatus(element.labels, element.state)))
            && (filterText === '' || element.title.toUpperCase().includes(filterTextUppercase)
            || (element.assignee
                    && element.assignee.name.toUpperCase().includes(filterTextUppercase))
            ),
      );
    };

    handleChangeFilter = name => (event) => {
      this.setState({ [name]: event.target.value });
    };

    render() {
      const { classes } = this.props;
      const { status, filterText } = this.state;
      const tasksFilter = this.filterTasks();
      return (
        <div className={classes.container}>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
          >
            <FilterStatus name={status} handleChange={this.handleChangeFilter('status')} />
            <FilterText name={filterText} handleChange={this.handleChangeFilter('filterText')} />
          </Grid>
          <TableTasks data={tasksFilter} />
        </div>
      );
    }
}

export default withStyles(styles)(TasksContainer);
