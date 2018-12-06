import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import News from "../components/Tabs/News";

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
)(News);
