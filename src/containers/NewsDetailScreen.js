import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import NewsDetail from "../components/NewsDetail";

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewsDetail);
