const REQUEST_OTP = "REQUEST_OTP";
const REQUEST_OTP_SUCCESS = "REQUEST_OTP_SUCCESS";
const REQUEST_OTP_FAIL = "REQUEST_OTP_FAIL";

const requestOtp = payload => {
  return {
    type: REQUEST_OTP,
    payload
  };
};

const requestOtpSuccess = payload => {
  return {
    type: REQUEST_OTP_SUCCESS,
    payload
  };
};

const requestOtpFail = payload => {
  return {
    type: REQUEST_OTP_FAIL,
    payload
  };
};

export {
  REQUEST_OTP,
  REQUEST_OTP_SUCCESS,
  REQUEST_OTP_FAIL,
  requestOtp,
  requestOtpSuccess,
  requestOtpFail
};
