import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Tutorials from "../components/Tutorials";
import { toggleDrawer } from "../store/actions";

const mapStateToProps = state => ({
  auth: state.auth,
  drawer: state.drawer,
  news: state.news
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
)(Tutorials);
