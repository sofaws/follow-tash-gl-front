import {createSelector} from "reselect";
import {calculCost, getSumConsumed} from "utils/ManagementHelper";
import {DEFAULT_COST_BY_HOUR, EXCLUDE_MEMBERS, OTHERS_COST, TIMES_IMPUTATIONS} from "../config";
import moment from "moment";
import {getActiveHour} from "utils/TimeHelper";

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
const uniqify = (array, key, subKey) =>
  array.reduce(
    (prev, curr) =>
      prev.find(a => a[key][subKey] === curr[key][subKey])
        ? prev
        : prev.push(curr) && prev,
    []
  );

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case USERS_FETCH_SUCCESS: {
      return uniqify(action.users, "member", "id");
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
export const getUsersFiltered = createSelector([getAllUsers], users => {
  return users.filter(user => !EXCLUDE_MEMBERS.includes(user.member.username));
});

export const getUserById = (state, props) => {
  return state.find(user => user.member.id === Number(props.id));
};

export const getUsersNotImputed = createSelector([getUsersFiltered], users => {
  if (!users) return [];
  return users.filter(user => {
    if (!user.lastDateImputation) return true;
    const current = {
      date: moment().date(),
      hour: moment().hour()
    };
    const lastImputation = {
      date: moment(user.lastDateImputation).date(),
      hour: moment(user.lastDateImputation).hour()
    };

    const activeHour = getActiveHour(current.hour);

    if (
      lastImputation.hour >= activeHour - 1 &&
      (current.date === lastImputation.date ||
        (activeHour === TIMES_IMPUTATIONS[TIMES_IMPUTATIONS.length] &&
          current.date - 1 === lastImputation.date ))
    ) {
      return false;
    }
    return true;
  });
});

export const getConsumedByUser = createSelector([getUserById], user => {
  if (!user) return 0;
  return user.tasks.reduce((acc, task) => {
    if (!task.consumedTime || !task.consumedTime[user.member.username])
      return acc;
    return acc + task.consumedTime[user.member.username].time;
  }, 0);
});

export const getCostByUser = createSelector(
  [getConsumedByUser, getUserById],
  (consomned, user) => {
    if (!user) return 0;
    return Math.round(
      calculCost(
        consomned,
        OTHERS_COST[user.member.username] || DEFAULT_COST_BY_HOUR
      )
    );
  }
);

export default usersReducer;
