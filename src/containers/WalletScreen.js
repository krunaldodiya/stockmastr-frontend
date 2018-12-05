import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Wallet from "../components/Tabs/Wallet";

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Wallet);
