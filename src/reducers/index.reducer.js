import { combineReducers } from "redux";
import tasksReducer, * as fromTasks from "./tasks.reducer";
import usersReducer, * as fromUsers from "./users.reducer";
import syncReducer, * as fromSync from "./sync.reducer";
import { createSelector } from "reselect";

export default combineReducers({
  tasks: tasksReducer,
  users: usersReducer,
  sync: syncReducer
});


//////////////////////////
//  SHORTCUT SELECTORS  //
//////////////////////////

export const getAllTasks = state => fromTasks.getAllTasks(state.tasks);
export const getTaskById = (state, props) =>
  fromTasks.getTaskById(state.tasks, props);

export const getAllUsers = state => fromUsers.getAllUsers(state.users);
export const getUserById = (state, props) =>
  fromUsers.getUserById(state.users, props);

export const getStateSync = state => fromSync.getStateSync(state.sync);
export const getSyncLoading = state => fromSync.getSyncLoading(state.sync);


/////////////////////////
//  COMMONS SELECTORS  //
////////////////////////

export const getNotAssignedUsers = createSelector(
  [getAllUsers, getAllTasks],
  (users, tasks) => {
    return users.filter(user => !tasks.find(task => task.assigneeId === user.member.id));
  }
);

export const getActiveTaskAtUser = createSelector(
  [getUserById, getAllTasks],
  (user, tasks) => {
    if (!user) return [];
    return tasks.filter(task => task.assigneeId === user.member.id);
  }
);
