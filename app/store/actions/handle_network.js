import { getAuthUser } from "./get_auth_user";

const NETWORK_STATE_CHANGE = "NETWORK_STATE_CHANGE";

const handleNetworkChange = netInfo => {
  return (dispatch, getState) => {
    if (getState().auth.authUser == null) {
      dispatch(getAuthUser());
    }

    dispatch({
      type: NETWORK_STATE_CHANGE,
      payload: { connection: netInfo }
    });
  };
};

export { NETWORK_STATE_CHANGE, handleNetworkChange };
