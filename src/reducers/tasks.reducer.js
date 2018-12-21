
////////////////////
//  Action types  //
////////////////////
export const TASKS_FETCH_REQUEST = "TASKS_FETCH_REQUEST";
const TASKS_FETCH_SUCCESS = "TASKS_FETCH_SUCCESS";
const TASKS_FETCH_FAILURE = "TASKS_FETCH_FAILURE";

///////////////////////
//  Action creators  //
///////////////////////
export const fetchTasks = () => {
  return { type: TASKS_FETCH_REQUEST };
};

export const fetchTasksSuccess = tasks => {
  return { type: TASKS_FETCH_SUCCESS, tasks };
};

export const fetchTasksFailure = error => {
  return { type: TASKS_FETCH_FAILURE, error };
};

///////////////
//  Reducer  //
///////////////
const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case TASKS_FETCH_SUCCESS: {
      return action.tasks;
    }
    default: {
      return [...state];
    }
  }
};

const initialState = [];

/////////////////
//  Selectors  //
/////////////////
export const getAllTasks = state => state;

export const getTaskById = (state, props) => {
  return state.find(task => task.id === Number(props.id));
};

export default tasksReducer;
