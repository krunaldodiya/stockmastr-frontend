const HANDLE_OTP_INPUT = "HANDLE_OTP_INPUT";

const handleOtpInput = payload => {
  return {
    type: HANDLE_OTP_INPUT,
    payload
  };
};

export { HANDLE_OTP_INPUT, handleOtpInput };
