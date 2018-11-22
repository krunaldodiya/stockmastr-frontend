import { all } from "redux-saga/effects";

import { getAuthUserWatcher } from "./get_auth_user";
import { handleNetworkWatcher } from "./handle_network";

function* rootSaga() {
  yield all([getAuthUserWatcher(), handleNetworkWatcher()]);
}

export { rootSaga };
