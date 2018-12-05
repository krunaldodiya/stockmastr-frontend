import { call, put, takeEvery } from "redux-saga/effects";
import { api } from "../../libs/api";
import { makeRequest } from "../../services";
import {
  CREATE_USER_PROFILE,
  CREATE_USER_PROFILE_FAIL,
  CREATE_USER_PROFILE_SUCCESS
} from "../actions/create_user_profile";

function* createUserProfile(action) {
  try {
    console.log(action);

    // const { data } = yield call(makeRequest, api.me, {});
    // const { user } = data;

    // yield put({
    //   type: CREATE_USER_PROFILE_SUCCESS,
    //   payload: { user }
    // });
  } catch (error) {
    // yield put({
    //   type: CREATE_USER_PROFILE_FAIL,
    //   payload: { errors: error.response.data }
    // });
  }
}

hello = () => {
  const { user } = this.state;
  const { navigation } = this.props;

  try {
    this.setState({ spinner: true });

    const data = await graph(api.createUserProfile, {
      ...user,
      profile_updated: true
    });

    this.setState({ spinner: false });
    return navigation.replace("TabScreen", { user: data.user });
  } catch ({ error }) {
    this.setState({ spinner: false, error });
  }
};

function* createUserProfileWatcher() {
  yield takeEvery(CREATE_USER_PROFILE, createUserProfile);
}

export { createUserProfileWatcher };
