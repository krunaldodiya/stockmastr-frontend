import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import UserType from "../components/UserType";

const mapStateToProps = state => ({
  guest: state.guest
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserType);
