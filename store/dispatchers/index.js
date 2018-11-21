const { sayHello } = require("./say_hello/action_creator");

const dispatcher = {
  home: {
    sayHello
  }
};

export { dispatcher };
