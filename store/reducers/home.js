import { types } from "../dispatcher/say_hello/action_type";

const initialState = {
  name: "Aryan"
};

const getHandler = (state, action) => {
  return {
    ...state,
    ...action.payload
  };
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.LOADING: {
      return getHandler(state, action);
    }

    case types.SUCCESS: {
      return getHandler(state, action);
    }

    case types.ERROR: {
      return getHandler(state, action);
    }

    default:
      return state;
  }
};
