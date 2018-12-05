import {
  CREATE_USER_PROFILE,
  CREATE_USER_PROFILE_FAIL,
  CREATE_USER_PROFILE_SUCCESS,
  GET_AUTH_USER,
  GET_AUTH_USER_FAIL,
  GET_AUTH_USER_SUCCESS
} from "../actions";

const initialState = {
  authUser: null,
  authInitialized: null,
  errors: null,
  loading: false,
  loaded: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_AUTH_USER: {
      return {
        ...state,
        authInitialized: false,
        loading: true,
        loaded: false
      };
    }

    case GET_AUTH_USER_SUCCESS: {
      return {
        ...state,
        authUser: action.payload.authUser,
        authInitialized: true,
        loading: false,
        loaded: true
      };
    }

    case GET_AUTH_USER_FAIL: {
      return {
        ...state,
        errors: action.payload.errors,
        authInitialized: true,
        loading: false,
        loaded: true
      };
    }

    case CREATE_USER_PROFILE: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case CREATE_USER_PROFILE_SUCCESS: {
      return {
        ...state,
        authUser: action.payload.authUser,
        loading: false,
        loaded: true
      };
    }

    case CREATE_USER_PROFILE_FAIL: {
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
