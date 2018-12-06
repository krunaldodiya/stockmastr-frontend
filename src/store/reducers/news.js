import { LOAD_NEWS, LOAD_NEWS_SUCCESS, LOAD_NEWS_FAIL } from "../actions";

const initialState = {
  news: [],
  errors: null,
  loading: false,
  loaded: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_NEWS: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case LOAD_NEWS_SUCCESS: {
      return {
        ...state,
        news: action.payload.news,
        errors: null,
        loading: false,
        loaded: true
      };
    }

    case LOAD_NEWS_FAIL: {
      return {
        ...state,
        news: [],
        errors: action.payload.errors,
        loading: false,
        loaded: true
      };
    }

    default:
      return state;
  }
};
