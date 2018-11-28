import { Alert } from "react-native";
import { call, put, takeEvery } from "redux-saga/effects";

import {
  REQUEST_OTP,
  REQUEST_OTP_SUCCESS,
  REQUEST_OTP_FAIL
} from "../actions/request_otp";

import { api } from "../../libs/api";
import { makeRequest } from "../../services";

function* requestOtp(action) {
  const { mobile, navigation, mode } = action.payload;

  try {
    const { data } = yield call(makeRequest, api.requestOtp, { mobile });

    yield put({
      type: REQUEST_OTP_SUCCESS,
      payload: { otp: data.otp }
    });

    if (mode === "resend") {
      Alert.alert("Success", "Otp Sent!");
    } else {
      navigation.replace("VerifyOtpScreen");
    }
  } catch (error) {
    yield put({
      type: REQUEST_OTP_FAIL,
      payload: { errors: error.response.data }
    });
  }
}

function* requestOtpWatcher() {
  yield takeEvery(REQUEST_OTP, requestOtp);
}

export { requestOtpWatcher };
