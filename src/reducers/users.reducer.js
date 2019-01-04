import { createSelector } from "reselect";
import {getSumConsomned} from "utils/ManagementHelper";

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
const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case USERS_FETCH_SUCCESS: {
      return action.users;
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

export const getConsumnedByUser = createSelector(
    [getUserById],
    (user) => {
      if (!user) return [];
      return user.tasks.reduce((acc, task) => acc + getSumConsomned(task.consumedTime), 0)
    }
);


export default usersReducer;
