import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import UserType from "../components/UserType";
import { createUserProfile } from "../store/actions";

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      createUserProfile: createUserProfile
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserType);
