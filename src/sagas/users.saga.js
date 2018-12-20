import { call, put, takeEvery } from "redux-saga/effects";
import {
  fetchUsersFailure,
  fetchUsersSuccess,
  USERS_FETCH_REQUEST
} from "../reducers/users.reducer";
import { createSagaRoot } from "./index.saga";
import api from "utils/Api";

function* getAllUsers(action) {
  try {
    const users = yield call(api.get("members").json);
    yield put(fetchUsersSuccess(users));
  } catch (e) {
    yield put(fetchUsersFailure(e.message));
  }
}

function* watchGetUsers() {
  yield takeEvery(USERS_FETCH_REQUEST, getAllUsers);
}

export default createSagaRoot(watchGetUsers);
