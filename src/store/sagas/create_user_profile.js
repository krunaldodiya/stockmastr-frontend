import { call, put, takeEvery } from "redux-saga/effects";
import { api } from "../../libs/api";
import { makeRequest } from "../../services";
import {
  CREATE_USER_PROFILE,
  CREATE_USER_PROFILE_FAIL,
  CREATE_USER_PROFILE_SUCCESS
} from "../actions/create_user_profile";

function* createUserProfile(action) {
  const { authUser, navigation } = action.payload;

  try {
    const { data } = yield call(makeRequest, api.createUserProfile, authUser);
    const { user } = data;

    yield put({
      type: CREATE_USER_PROFILE_SUCCESS,
      payload: { user }
    });

    navigation.replace("TabScreen", { user: data.user });
  } catch (error) {    
    yield put({
      type: CREATE_USER_PROFILE_FAIL,
      payload: { errors: error.response.data }
    });
  }
}

function* createUserProfileWatcher() {
  yield takeEvery(CREATE_USER_PROFILE, createUserProfile);
}

export { createUserProfileWatcher };
