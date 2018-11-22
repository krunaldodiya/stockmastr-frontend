import { call, put, takeEvery } from "redux-saga/effects";

import {
  GET_AUTH_USER,
  GET_AUTH_USER_SUCCESS,
  GET_AUTH_USER_FAIL
} from "../actions/get_auth_user";

import { api } from "../../libs/api";
import { makeRequest } from "../../services";

function* getAuthUser(action) {
  try {
    const { user } = yield call(makeRequest, api.me, {});

    console.log("user", user);

    // yield put({
    //   type: GET_AUTH_USER_SUCCESS,
    //   payload: { user, loading: false, loaded: true }
    // });
  } catch (error) {
    console.log(error);

    // yield put({
    //   type: GET_AUTH_USER_FAIL,
    //   payload: { error, loading: false, loaded: false }
    // });
  }
}

function* getAuthUserWatcher() {
  yield takeEvery(GET_AUTH_USER, getAuthUser);
}

export { getAuthUserWatcher };
