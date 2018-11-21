import { types } from "./action_type";

const sayHello = (dispatch, data) => {
  dispatch({
    type: types.ERROR,
    payload: { ...data, name: "Krunal", loading: true, loaded: false }
  });

  setTimeout(() => {
    dispatch({
      type: types.SUCCESS,
      payload: { ...data, name: "Aryan", loading: false, loaded: true }
    });

    dispatch({
      type: types.ERROR,
      payload: { ...data, name: "Kalpit", loading: false, loaded: true }
    });
  }, 1000);
};

export { sayHello };
