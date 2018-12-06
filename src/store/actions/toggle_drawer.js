const TOGGLE_DRAWER = "TOGGLE_DRAWER";

const toggleDrawer = payload => {
  return {
    type: TOGGLE_DRAWER,
    payload
  };
};

export { TOGGLE_DRAWER, toggleDrawer };
