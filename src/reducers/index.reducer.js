import { combineReducers } from "redux";
import tasksReducer, * as fromTasks from "./tasks.reducer";
import usersReducer, * as fromUsers from "./users.reducer";
import syncReducer, * as fromSync from "./sync.reducer";
import { createSelector } from "reselect";
import {getIlotTask} from "../utils/TaskHelper";

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
export const getTotalConsumed = state => fromTasks.getTotalConsumed(state.tasks);
export const getTotalCost = state => fromTasks.getTotalCost(state.tasks);
export const getTasksByLots = state => fromTasks.getTasksByLots(state.tasks);
export const getTotalProgess = state => fromTasks.getTotalProgess(state.tasks);
export const getTotalRaf = state => fromTasks.getTotalRaf(state.tasks);
export const getTotalEstimated = state => fromTasks.getTotalEstimated(state.tasks);
export const getTotalSkid = state => fromTasks.getTotalSkid(state.tasks);

export const getAllUsers = state => fromUsers.getAllUsers(state.users);
export const getUserById = (state, props) =>
  fromUsers.getUserById(state.users, props);
export const getConsumedByUser = (state, props) => fromUsers.getConsumedByUser(state.users, props);
export const getCostByUser = (state, props) => fromUsers.getCostByUser(state.users, props);

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

