import {
  GET_AUTH_USER,
  GET_AUTH_USER_SUCCESS,
  GET_AUTH_USER_FAIL
} from "../actions";

const initialState = {
  authUser: null,
  errors: null,
  loading: false,
  loaded: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_AUTH_USER: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case GET_AUTH_USER_SUCCESS: {
      return {
        ...state,
        authUser: action.payload.user,
        loading: false,
        loaded: true
      };
    }

    case GET_AUTH_USER_FAIL: {
      return {
        ...state,
        errors: action.payload.errors,
        loading: false,
        loaded: true
      };
    }

    default:
      return state;
  }
};
