import { call, put, takeEvery } from "redux-saga/effects";

import {
  VERIFY_OTP,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_FAIL,
  GET_AUTH_USER_SUCCESS
} from "../actions";

import { api } from "../../libs/api";
import { makeRequest, setAuthToken } from "../../services";

function* verifyOtp(action) {
  const { navigation, mobile, otp } = action.payload;

  try {
    const { data } = yield call(makeRequest, api.verifyOtp, {
      mobile,
      otp
    });

    const { user, token } = data;

    yield call(setAuthToken, token);

    yield put({
      type: GET_AUTH_USER_SUCCESS,
      payload: { user }
    });

    yield put({ type: VERIFY_OTP_SUCCESS });

    const screen = user.profile_updated ? "TabScreen" : "UserTypeScreen";
    navigation.replace(screen, data);
  } catch (error) {
    yield put({
      type: VERIFY_OTP_FAIL,
      payload: { errors: error.response.data }
    });
  }
}

function* verifyOtpWatcher() {
  yield takeEvery(VERIFY_OTP, verifyOtp);
}

export { verifyOtpWatcher };
