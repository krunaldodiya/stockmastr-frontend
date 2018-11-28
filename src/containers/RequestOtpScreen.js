import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import RequestOtp from "../components/RequestOtp";

const mapStateToProps = state => ({
  guest: state.guest
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { handleOtpInput: handleOtpInput, requestOtp: requestOtp },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RequestOtp);
