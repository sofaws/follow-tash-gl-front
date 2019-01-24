import { createSelector } from "reselect";
import {getSumConsumed} from "utils/ManagementHelper";
import {DEFAULT_COST_BY_HOUR, OTHERS_COST} from "../config";
import {calculCost} from "utils/ManagementHelper";

////////////////////
//  Action types  //
////////////////////
export const USERS_FETCH_REQUEST = "USERS_FETCH_REQUEST";
const USERS_FETCH_SUCCESS = "USERS_FETCH_SUCCESS";
const USERS_FETCH_FAILURE = "USERS_FETCH_FAILURE";

///////////////////////
//  Action creators  //
///////////////////////
export const fetchUsers = () => {
  return { type: USERS_FETCH_REQUEST };
};

export const fetchUsersSuccess = users => {
  return { type: USERS_FETCH_SUCCESS, users };
};

export const fetchUsersFailure = error => {
  return { type: USERS_FETCH_FAILURE, error };
};

///////////////
//  Reducer  //
///////////////
const uniqify = (array, key, subKey) => array.reduce((prev, curr) => prev.find(a => a[key][subKey] === curr[key][subKey]) ? prev : prev.push(curr) && prev, []);

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case USERS_FETCH_SUCCESS: {
      return uniqify(action.users, 'member', 'id');
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
export const getAllUsers = state => state;

export const getUserById = (state, props) => {
  return state.find(user => user.member.id === Number(props.id));
};

export const getConsumedByUser = createSelector(
    [getUserById],
    (user) => {
      if (!user) return 0;
      return user.tasks.reduce((acc, task) => {
          if(!task.consumedTime || !task.consumedTime[user.member.username]) return acc;
          return acc + task.consumedTime[user.member.username].time
      }, 0)
    }
);

export const getCostByUser = createSelector(
    [getConsumedByUser, getUserById],
    (consomned, user) => {
        if (!user) return 0;
        return calculCost(consomned, OTHERS_COST[user.member.username] || DEFAULT_COST_BY_HOUR);
    }
);


export default usersReducer;
