const initialState = {
  name: "Aryan"
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "LOADING": {
      return {
        ...state,
        ...action.payload
      };
    }

    default:
      return state;
  }
};
