const CREATE_USER_PROFILE = "CREATE_USER_PROFILE";
const CREATE_USER_PROFILE_SUCCESS = "CREATE_USER_PROFILE_SUCCESS";
const CREATE_USER_PROFILE_FAIL = "CREATE_USER_PROFILE_FAIL";

const createUserProfile = payload => {
  return {
    type: CREATE_USER_PROFILE,
    payload
  };
};

const createUserProfileSuccess = payload => {
  return {
    type: CREATE_USER_PROFILE_SUCCESS,
    payload
  };
};

const createUserProfileFail = payload => {
  return {
    type: CREATE_USER_PROFILE_FAIL,
    payload
  };
};

export {
  CREATE_USER_PROFILE,
  CREATE_USER_PROFILE_SUCCESS,
  CREATE_USER_PROFILE_FAIL,
  createUserProfile,
  createUserProfileSuccess,
  createUserProfileFail
};
