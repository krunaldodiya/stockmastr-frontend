import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Tabs from "../components/Tabs";
import { toggleDrawer } from "../store/actions";

const mapStateToProps = state => ({
  auth: state.auth,
  drawer: state.drawer
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      toggleDrawer: toggleDrawer
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tabs);
