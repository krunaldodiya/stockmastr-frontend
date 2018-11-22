const NETWORK_STATE_CHANGE = "NETWORK_STATE_CHANGE";

const handleNetworkChange = payload => {
  return {
    type: NETWORK_STATE_CHANGE,
    payload
  };
};

export { NETWORK_STATE_CHANGE, handleNetworkChange };
