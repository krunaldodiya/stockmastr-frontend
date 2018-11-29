import { call, put, takeEvery } from "redux-saga/effects";
import { api } from "../../libs/api";
import { makeRequest, setAuthToken } from "../../services";
import { GET_AUTH_USER_SUCCESS, VERIFY_OTP, VERIFY_OTP_FAIL, VERIFY_OTP_SUCCESS } from "../actions";

function* verifyOtp(action) {
  const { mobile, otp } = action.payload;

  try {
    const { data } = yield call(makeRequest, api.verifyOtp, {
      mobile,
      otp
    });

    const { user, token } = data;

    yield call(setAuthToken, token);

    yield put({ type: VERIFY_OTP_SUCCESS });

    yield put({
      type: GET_AUTH_USER_SUCCESS,
      payload: { user }
    });
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

