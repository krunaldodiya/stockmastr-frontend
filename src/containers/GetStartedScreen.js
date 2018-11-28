import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import GetStarted from "../components/GetStarted";
import { toggleTermsAgreement } from "../store/actions/toggle_terms_agreement";

const mapStateToProps = state => ({
  auth: state.auth,
  guest: state.guest
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      toggleTermsAgreement: toggleTermsAgreement
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GetStarted);
