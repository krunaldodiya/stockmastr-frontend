import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Home from "../components/Home";

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
