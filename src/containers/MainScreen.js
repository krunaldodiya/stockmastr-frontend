import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Main from "../components/Main";
import { handleNetworkChange } from "../store/actions/handle_network";

const mapStateToProps = state => ({
  auth: state.auth,
  network: state.network
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { handleNetworkChange: handleNetworkChange },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
