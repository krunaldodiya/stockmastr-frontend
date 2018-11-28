import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import VerifyOtp from "../components/VerifyOtp";
import { requestOtp, verifyOtp } from "../store/actions";

const mapStateToProps = state => ({
  guest: state.guest
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { verifyOtp: verifyOtp, requestOtp: requestOtp },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VerifyOtp);
