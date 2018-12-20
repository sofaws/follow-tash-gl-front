import { call, put, takeEvery } from "redux-saga/effects";
import {
  fetchTasksFailure,
  fetchTasksSuccess,
  TASKS_FETCH_REQUEST
} from "../reducers/tasks.reducer";
import { createSagaRoot } from "./index.saga";
import api from "utils/Api";

function* getAllTasks(action) {
  try {
    const tasks = yield call(api.get("tasks").json);
    yield put(fetchTasksSuccess(tasks));
  } catch (e) {
    yield put(fetchTasksFailure(e.message));
  }
}

function* watchGetTasks() {
  yield takeEvery(TASKS_FETCH_REQUEST, getAllTasks);
}

export default createSagaRoot(watchGetTasks);
