import { combineReducers } from "redux";

import tasksReducer, * as fromTasks from "./tasks.reducer";

import { createSelector } from "reselect";

export default combineReducers({
  tasks: tasksReducer
});

export const getAllTasks = state => fromTasks.getAllTasks(state.tasks);
export const getTasksById = (state, props) =>
  fromTasks.getTasksById(state.tasks, props);
