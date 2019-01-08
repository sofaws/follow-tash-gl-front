////////////////////
//  Action types  //
////////////////////
import {createSelector} from "reselect";
import {getSumConsumed, calculCost} from "utils/ManagementHelper";
import {DEFAULT_COST_BY_HOUR, OTHERS_COST} from "../config";
import {getLotTask} from "../utils/TaskHelper";
import {getCostOfListTasks} from "../utils/ManagementHelper";

export const TASKS_FETCH_REQUEST = "TASKS_FETCH_REQUEST";
const TASKS_FETCH_SUCCESS = "TASKS_FETCH_SUCCESS";
const TASKS_FETCH_FAILURE = "TASKS_FETCH_FAILURE";

///////////////////////
//  Action creators  //
///////////////////////
export const fetchTasks = () => {
    return {type: TASKS_FETCH_REQUEST};
};

export const fetchTasksSuccess = tasks => {
    return {type: TASKS_FETCH_SUCCESS, tasks};
};

export const fetchTasksFailure = error => {
    return {type: TASKS_FETCH_FAILURE, error};
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

export const getTotalConsumed = createSelector(
    [getAllTasks],
    (tasks) => {
        return tasks.reduce((acc, task) => acc + getSumConsumed(task.consumedTime), 0)
    }
);

export const getTotalCost = createSelector(
    [getAllTasks],
    (tasks) => {
        return getCostOfListTasks(tasks);
    }
);

export const getTasksByLots = createSelector(
    [getAllTasks],
    tasks => {
       const tasksByLots = tasks.reduce((accumulator, task) => {
            const lot = getLotTask(task.labels);
            if (!lot) return accumulator;
            const arrayIlot = accumulator[lot] || [];
            return {
                ...accumulator,
                [lot]: [
                    ...arrayIlot,
                    task
                ]
            }
        }, {});

       return Object.keys(tasksByLots).map(lot => {
           const tasks = tasksByLots[lot];
           const consumedTotal = tasks.reduce((acc, task) => acc + getSumConsumed(task.consumedTime), 0);
           const estimateTotal = tasks.reduce((acc, task) => acc + task.estimatedTime, 0);
           const remainingTime = tasks.reduce((acc, task) => acc + ((!task.remainingTime && task.remainingTime !== 0) ? task.estimatedTime : task.remainingTime), 0);
           return {
               title: lot,
               tasks,
               consumedTotal,
               estimateTotal,
               remainingTime,
               totalCost: getCostOfListTasks(tasks)
       }
       })
    }
);

export default tasksReducer;
