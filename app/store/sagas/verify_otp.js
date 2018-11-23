import { Alert } from "react-native";
import { call, put, takeEvery } from "redux-saga/effects";

import {
  VERIFY_OTP,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_FAIL
} from "../actions/verify_otp";

import { api } from "../../libs/api";
import { makeRequest } from "../../services";

function* verifyOtp(action) {
  yield console.tron.log(action);

  // const { mobile, navigation, mode } = action.payload;

  // try {
  //   const { data } = yield call(makeRequest, api.verifyOtp, { mobile });

  //   yield put({
  //     type: VERIFY_OTP_SUCCESS,
  //     payload: { otp: data.otp }
  //   });

  //   if (mode === "resend") {
  //     Alert.alert("Success", "Otp Sent!");
  //   } else {
  //     navigation.replace("VerifyOtpScreen");
  //   }
  // } catch (error) {
  //   yield put({
  //     type: VERIFY_OTP_FAIL,
  //     payload: { errors: error.response.data }
  //   });
  // }
}

function* verifyOtpWatcher() {
  yield takeEvery(VERIFY_OTP, verifyOtp);
}

export { verifyOtpWatcher };
