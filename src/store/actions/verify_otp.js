const VERIFY_OTP = "VERIFY_OTP";
const VERIFY_OTP_SUCCESS = "VERIFY_OTP_SUCCESS";
const VERIFY_OTP_FAIL = "VERIFY_OTP_FAIL";
const OTP_VERIFIED = "OTP_VERIFIED";

const verifyOtp = payload => {
  return {
    type: VERIFY_OTP,
    payload
  };
};

const verifyOtpSuccess = payload => {
  return {
    type: VERIFY_OTP_SUCCESS,
    payload
  };
};

const verifyOtpFail = payload => {
  return {
    type: VERIFY_OTP_FAIL,
    payload
  };
};

const otpVerified = payload => {
  return {
    type: OTP_VERIFIED,
    payload
  };
};

export {
  VERIFY_OTP,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_FAIL,
  OTP_VERIFIED,
  verifyOtp,
  verifyOtpSuccess,
  verifyOtpFail,
  otpVerified
};
