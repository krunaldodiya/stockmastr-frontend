import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Notifications from "../components/Tabs/Notifications";

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notifications);
