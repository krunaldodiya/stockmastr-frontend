import { call, put, takeEvery } from "redux-saga/effects";

import {
  GET_AUTH_USER,
  GET_AUTH_USER_SUCCESS,
  GET_AUTH_USER_FAIL
} from "../actions/get_auth_user";

import { api } from "../../libs/api";
import { makeRequest } from "../../services";

function* getAuthUser(payload) {
  try {
    const { user } = yield call(makeRequest, api.me, {});

    yield put({
      type: GET_AUTH_USER_SUCCESS,
      payload: { user, loading: false, loaded: true }
    });
  } catch (error) {
    yield put({
      type: GET_AUTH_USER_FAIL,
      payload: { error: error.response.data, loading: false, loaded: false }
    });
  }
}

function* getAuthUserWatcher() {
  yield takeEvery(GET_AUTH_USER, getAuthUser);
}

export { getAuthUserWatcher };
