import { put, takeEvery, select } from "redux-saga/effects";

import { NETWORK_STATE_CHANGE } from "../actions/handle_network";
import { getAuthUser } from "../actions/get_auth_user";

function* networkStateChange() {
  const { user } = yield select(state => state.auth);

  if (user == null) {
    yield put(getAuthUser());
  }
}

function* handleNetworkWatcher() {
  yield takeEvery(NETWORK_STATE_CHANGE, networkStateChange);
}

export { handleNetworkWatcher };
