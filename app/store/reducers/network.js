const initialState = {
  connection: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "NETWORK_STATE_CHANGE": {
      return {
        ...state,
        connection: action.payload.connection
      };
    }

    default:
      return state;
  }
};
