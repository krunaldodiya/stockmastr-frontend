import { graph } from "../../services";
import { api } from "../../libs/api";

const GET_AUTH_USER = "GET_AUTH_USER";
const GET_AUTH_USER_SUCCESS = "GET_AUTH_USER_SUCCESS";
const GET_AUTH_USER_FAIL = "GET_AUTH_USER_FAIL";

const getAuthUser = () => {
  return dispatch => {
    dispatch({
      type: GET_AUTH_USER,
      payload: { loading: true, loaded: false }
    });

    graph(api.me, {})
      .then(({ user }) => {
        dispatch({
          type: GET_AUTH_USER_SUCCESS,
          payload: { authUser: user, loading: false, loaded: true }
        });
      })
      .catch(error => {
        dispatch({
          type: GET_AUTH_USER_FAIL,
          payload: { error, loading: false, loaded: false }
        });
      });
  };
};

export {
  GET_AUTH_USER,
  GET_AUTH_USER_SUCCESS,
  GET_AUTH_USER_FAIL,
  getAuthUser
};
