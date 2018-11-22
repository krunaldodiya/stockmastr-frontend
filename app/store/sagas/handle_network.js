import { put, takeEvery, select } from "redux-saga/effects";

import { NETWORK_STATE_CHANGE } from "../actions/handle_network";
import { getAuthUser } from "../actions/get_auth_user";

function* networkStateChange() {
  const { auth, network } = yield select(state => state);

  if (network.connection.type !== "none" && auth.user == null) {
    yield put(getAuthUser());
  }
}

function* handleNetworkWatcher() {
  yield takeEvery(NETWORK_STATE_CHANGE, networkStateChange);
}

export { handleNetworkWatcher };
