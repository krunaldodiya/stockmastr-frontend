import { call, put, takeEvery } from "redux-saga/effects";

import {
  GET_AUTH_USER,
  GET_AUTH_USER_SUCCESS,
  GET_AUTH_USER_FAIL
} from "../actions/get_auth_user";

import { api } from "../../libs/api";
import { makeRequest } from "../../services";

function* getAuthUser() {
  try {
    const data = yield call(makeRequest, api.me, {});

    yield put({
      type: GET_AUTH_USER_SUCCESS,
      payload: data
    });
  } catch (error) {
    yield put({
      type: GET_AUTH_USER_FAIL,
      payload: { errors: error.response.data }
    });
  }
}

function* getAuthUserWatcher() {
  yield takeEvery(GET_AUTH_USER, getAuthUser);
}

export { getAuthUserWatcher };
