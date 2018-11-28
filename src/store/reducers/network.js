import { NETWORK_STATE_CHANGE } from "../actions";

const initialState = {
  connection: null,
  loading: true,
  loaded: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case NETWORK_STATE_CHANGE: {
      return {
        ...state,
        connection: action.payload,
        loading: false,
        loaded: true
      };
    }

    default:
      return state;
  }
};
