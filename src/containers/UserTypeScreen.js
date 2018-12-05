import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import UserType from "../components/UserType";

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserType);
