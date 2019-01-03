import {
  put,
  take,
  all,
  fork,
  call,
  cancel,
  cancelled
} from "redux-saga/effects";
import { delay } from "redux-saga";
import { createSagaRoot } from "./index.saga";
import { fetchUsers } from "reducers/users.reducer";
import { fetchTasks } from "reducers/tasks.reducer";
import { TIME_TO_RELOAD } from "../config";
import {
  changeStateSync,
  enableLoadingSync,
  disableLoadingSync,
  LOADALL_SYNC_START,
  LOADALL_STOP_SYNC
} from "reducers/sync.reducer";

function* bgSyncLoad() {
  try {
    while (true) {
      yield put(enableLoadingSync());
      yield all([put(fetchUsers()), put(fetchTasks())]);
      yield put(disableLoadingSync());
      yield call(delay, TIME_TO_RELOAD * 60 * 1000);
    }
  } finally {
    if (yield cancelled()) yield put(changeStateSync("STOP"));
  }
}

function* watchLoadAll() {
  while (yield take(LOADALL_SYNC_START)) {
    yield put(changeStateSync("START"));
    const bgSyncTask = yield fork(bgSyncLoad);
    yield take(LOADALL_STOP_SYNC);
    yield cancel(bgSyncTask);
  }
}
export default createSagaRoot(watchLoadAll);
