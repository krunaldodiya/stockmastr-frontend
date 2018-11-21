import {
  GET_AUTH_USER,
  GET_AUTH_USER_SUCCESS,
  GET_AUTH_USER_FAIL
} from "../actions";

const initialState = {
  authUser: null,
  error: null,
  loading: false,
  loaded: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_AUTH_USER: {
      return {
        ...state,
        ...action.payload
      };
    }

    case GET_AUTH_USER_SUCCESS: {
      return {
        ...state,
        ...action.payload
      };
    }

    case GET_AUTH_USER_FAIL: {
      return {
        ...state,
        ...action.payload
      };
    }

    default:
      return state;
  }
};
