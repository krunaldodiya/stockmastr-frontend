import { connect } from "react-redux";
import { dispatcher } from "./dispatcher";

const mapper = (Component, mapState = [], mapDispatch = []) => {
  const mapStateToProps = state => {
    let data = {};

    mapState.forEach(key => {
      data[key.as] = state[key.reducer];
    });

    return data;
  };

  const mapDispatchToProps = dispatch => {
    let data = {};

    mapDispatch.forEach(key => {
      const reducer = key["reducer"];
      const action = key["action"];

      data[action] = payload => {
        return dispatcher[reducer][action](dispatch, payload);
      };
    });

    return data;
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(Component);
};

export { mapper };
