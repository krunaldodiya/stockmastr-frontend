import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Home from "../components/Tabs/Home";
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
)(Home);
