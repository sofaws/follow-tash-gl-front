import React from 'react';
import { withStyles } from '@material-ui/core/styles/index';
import Grid from '@material-ui/core/es/Grid/Grid';
import TableTasks from '../../Components/task/TableTasks';
import FilterStatus from '../../Components/task/FilterStatus';
import api from '../../Utils/Api';
import FilterText from '../../Components/task/FilterText';

const styles = {
  container: {
  },
};


type Props = {
    classes: {},
};

class TaskContainer extends React.Component<Props> {
    state = {
      status: [],
      data: [],
      filterText: '',
    };

    async componentDidMount() {
      const res = await api.get('tasks').json();
      this.setState({
        data: res,
      });
    }

    filterData = () => {
      const { data, status, filterText } = this.state;
      const filterTextUppercase = filterText.toUpperCase();
      return data.filter(
        element => (status.length === 0 || status.includes(element.state))
            && (filterText === '' || element.title.toUpperCase().includes(filterTextUppercase)
            || (element.assignee
                    && element.assignee.name.toUpperCase().includes(filterTextUppercase))
            ),
      );
    }

    handleChangeFilter = name => (event) => {
      this.setState({ [name]: event.target.value });
    };


    render() {
      const { classes } = this.props;
      const { status, filterText } = this.state;

      const dataFilter = this.filterData();

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
          <TableTasks data={dataFilter} />
        </div>
      );
    }
}

export default withStyles(styles)(TaskContainer);
