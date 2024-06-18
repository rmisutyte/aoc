module.exports = {
  env: {
    es2021: true,
    node: true
  },
  extends: ["eslint:recommended", "prettier"],
  plugins: ["prettier"],
  root: true,
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js"]
      }
    }
  },
  rules: {
    "prettier/prettier": [
      "error",
      {
        singleQuote: false,
        trailingComma: "none"
      }
    ]
  }
};
