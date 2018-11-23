import {
  HANDLE_OTP_INPUT,
  REQUEST_OTP,
  REQUEST_OTP_SUCCESS,
  REQUEST_OTP_FAIL,
  VERIFY_OTP,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_FAIL
} from "../actions";

const initialState = {
  mobile: null,
  otp: null,
  errors: null,
  loading: false,
  loaded: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case HANDLE_OTP_INPUT: {
      return {
        ...state,
        ...action.payload,
        errors: null
      };
    }

    case REQUEST_OTP: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case REQUEST_OTP_SUCCESS: {
      return {
        ...state,
        otp: action.payload.otp,
        loading: false,
        loaded: true
      };
    }

    case REQUEST_OTP_FAIL: {
      return {
        ...state,
        errors: action.payload.errors,
        loading: false,
        loaded: false
      };
    }

    case VERIFY_OTP: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case VERIFY_OTP_SUCCESS: {
      return {
        ...state,
        otp: action.payload.otp,
        loading: false,
        loaded: true
      };
    }

    case VERIFY_OTP_FAIL: {
      return {
        ...state,
        errors: action.payload.errors,
        loading: false,
        loaded: false
      };
    }

    default:
      return state;
  }
};
