import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Home from "../components/Tabs/Home";
import { loadNews, toggleDrawer } from "../store/actions";

const mapStateToProps = state => ({
  auth: state.auth,
  drawer: state.drawer,
  news: { ...state.news, latest: state.news.news.slice(0, 5) }
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      toggleDrawer: toggleDrawer,
      loadNews: loadNews
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
