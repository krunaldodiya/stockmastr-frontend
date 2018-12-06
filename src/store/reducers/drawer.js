import { TOGGLE_DRAWER } from "../actions";

const initialState = {
  open: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_DRAWER: {
      return {
        ...state,
        ...action.payload,
        open: !state.open
      };
    }

    default:
      return state;
  }
};
