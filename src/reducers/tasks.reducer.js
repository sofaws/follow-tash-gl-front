////////////////////
//  Action types  //
////////////////////
import {createSelector} from "reselect";
import {calculCost, getCostOfListTasks, getProgress, getSkid, getSumConsumed} from "utils/ManagementHelper";
import {getIlotTask, getLotTask, getStatus} from "utils/TaskHelper";

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

export const getTasksNotClose = createSelector([getAllTasks], tasks =>
  tasks.filter(task => getStatus(task.labels, task.state) !== "closed")
);
export const getTotalConsumed = createSelector([getAllTasks], tasks =>
  tasks.reduce((acc, task) => acc + getSumConsumed(task.consumedTime), 0)
);

export const getTotalCost = createSelector([getAllTasks], tasks =>
  Math.round(getCostOfListTasks(tasks))
);

export const getTotalRaf = createSelector([getAllTasks], tasks =>
  tasks.reduce(
    (acc, task) =>
      acc +
      (!task.remainingTime && task.remainingTime !== 0
        ? task.estimatedTime
        : task.remainingTime),
    0
  )
);

export const getTotalProgess = createSelector(
  [getTotalConsumed, getTotalRaf],
  (consumedTotal, remainingTime) => getProgress(consumedTotal, remainingTime)
);

export const getTotalEstimated = createSelector([getAllTasks], tasks =>
  tasks.reduce((acc, task) => acc + task.estimatedTime, 0)
);

export const getTotalSkid = createSelector(
  [getAllTasks, getTotalEstimated, getTotalConsumed, getTotalRaf],
  (tasks, estimateTotal, consumedTotal, remainingTimeTotal) =>
    getSkid(estimateTotal, consumedTotal, remainingTimeTotal)
);

export const getTasksByLots = createSelector([getAllTasks], tasks => {
  const tasksByLots = tasks.reduce((accumulator, task) => {
    const lot = getLotTask(task.labels);
    if (!lot) return accumulator;
    const arrayIlot = accumulator[lot] || [];
    return {
      ...accumulator,
      [lot]: [...arrayIlot, task]
    };
  }, {});

  return Object.keys(tasksByLots).map(lot => {
    const tasks = tasksByLots[lot];
    const consumedTotal = tasks.reduce(
      (acc, task) => acc + getSumConsumed(task.consumedTime),
      0
    );
    const estimateTotal = tasks.reduce(
      (acc, task) => acc + task.estimatedTime,
      0
    );
    const remainingTime = tasks.reduce(
      (acc, task) =>
        acc +
        (!task.remainingTime && task.remainingTime !== 0
          ? task.estimatedTime
          : task.remainingTime),
      0
    );
    return {
      title: lot,
      tasks,
      consumedTotal,
      estimateTotal,
      remainingTime,
      totalCost: Math.round(getCostOfListTasks(tasks))
    };
  });
});

export const getTasksByIlots = createSelector([getAllTasks], tasks => {
  const tasksByIlots = tasks.reduce((accumulator, task) => {
    const lot = getIlotTask(task.labels);
    if (!lot) return accumulator;
    const arrayIlot = accumulator[lot] || [];
    return {
      ...accumulator,
      [lot]: [...arrayIlot, task]
    };
  }, {});

  return Object.keys(tasksByIlots).map(ilot => {
    const tasks = tasksByIlots[ilot];
    const consumedTotal = tasks.reduce(
      (acc, task) => acc + getSumConsumed(task.consumedTime),
      0
    );
    const estimateTotal = tasks.reduce(
      (acc, task) => acc + task.estimatedTime,
      0
    );
    const remainingTime = tasks.reduce(
      (acc, task) =>
        acc +
        (!task.remainingTime && task.remainingTime !== 0
          ? task.estimatedTime
          : task.remainingTime),
      0
    );
    return {
      title: ilot,
      tasks,
      consumedTotal,
      estimateTotal,
      remainingTime,
      totalCost: Math.round(getCostOfListTasks(tasks))
    };
  });
});

export default tasksReducer;
