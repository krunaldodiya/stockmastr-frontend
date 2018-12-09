import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AddMoney from "../components/AddMoney";

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddMoney);
