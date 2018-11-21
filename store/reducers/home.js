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
    case "LOADING": {
      return getHandler(state, action);
    }

    default:
      return state;
  }
};
