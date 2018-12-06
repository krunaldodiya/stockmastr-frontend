const LOAD_NEWS = "LOAD_NEWS";
const LOAD_NEWS_SUCCESS = "LOAD_NEWS_SUCCESS";
const LOAD_NEWS_FAIL = "LOAD_NEWS_FAIL";

const loadNews = payload => {
  return {
    type: LOAD_NEWS,
    payload
  };
};

const loadNewsSuccess = payload => {
  return {
    type: LOAD_NEWS_SUCCESS,
    payload
  };
};

const loadNewsFail = payload => {
  return {
    type: LOAD_NEWS_FAIL,
    payload
  };
};

export {
  LOAD_NEWS,
  LOAD_NEWS_SUCCESS,
  LOAD_NEWS_FAIL,
  loadNews,
  loadNewsSuccess,
  loadNewsFail
};
