import { all } from "redux-saga/effects";

import { getAuthUserWatcher } from "./get_auth_user";
import { handleNetworkWatcher } from "./handle_network";
import { requestOtpWatcher } from "./request_otp";

function* rootSaga() {
  yield all([
    getAuthUserWatcher(),
    handleNetworkWatcher(),
    requestOtpWatcher()
  ]);
}

export { rootSaga };
