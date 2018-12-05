import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Home from "../components/Tabs/Home";

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
