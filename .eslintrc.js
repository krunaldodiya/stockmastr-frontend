module.exports = {
  extends: "airbnb",
  parser: "babel-eslint",
  rules: {
    "react/jsx-filename-extension": ["error", { extensions: [".js", ".jsx"] }],
    "react/prop-types": ["error", { "ignore": ["navigation"] }]
  }
};
