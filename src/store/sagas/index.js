import { all } from "redux-saga/effects";
import { createUserProfileWatcher } from "./create_user_profile";
import { getAuthUserWatcher } from "./get_auth_user";
import { handleNetworkWatcher } from "./handle_network";
import { loadNewsWatcher } from "./load_news";
import { requestOtpWatcher } from "./request_otp";
import { verifyOtpWatcher } from "./verify_otp";

function* rootSaga() {
  yield all([
    getAuthUserWatcher(),
    handleNetworkWatcher(),
    requestOtpWatcher(),
    verifyOtpWatcher(),
    createUserProfileWatcher(),
    loadNewsWatcher()
  ]);
}

export { rootSaga };
