import { call, put, takeEvery } from "redux-saga/effects";
import { api } from "../../libs/api";
import { makeRequest } from "../../services";
import {
  LOAD_NEWS,
  LOAD_NEWS_FAIL,
  LOAD_NEWS_SUCCESS
} from "../actions/load_news";

function* loadNews() {
  try {
    const { data } = yield call(makeRequest, api.latestNews, { limit: 100 });
    const { news } = data;

    yield put({
      type: LOAD_NEWS_SUCCESS,
      payload: { news }
    });
  } catch (error) {
    yield put({
      type: LOAD_NEWS_FAIL,
      payload: { errors: error.response.data }
    });
  }
}

function* loadNewsWatcher() {
  yield takeEvery(LOAD_NEWS, loadNews);
}

export { loadNewsWatcher };
