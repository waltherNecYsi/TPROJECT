module.exports = {
  root: true,
  env: { browser: true, es2021: true },
  "plugins": [
    "prettier"
  ],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    "airbnb",
    "airbnb/hooks",
    "prettier"
  ],
  "parser": "@babel/eslint-parser",
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
    "requireConfigFile": false,
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "impliedStrict": true
    },
    "babelOptions": {
      "presets": [
        "@babel/preset-react"
      ]
    }
  },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  "rules": {
    "no-alert": 0,
    "camelcase": 0,
    "no-console": 0,
    "no-param-reassign": 0,
    "naming-convention": 0,
    "default-param-last": 0,
    "no-underscore-dangle": 0,
    "no-use-before-define": 0,
    "no-restricted-exports": 0,
    "react/no-children-prop": 0,
    "react/forbid-prop-types": 0,
    "react/react-in-jsx-scope": 0,
    "jsx-a11y/anchor-is-valid": 0,
    "react/no-array-index-key": 0,
    "no-promise-executor-return": 0,
    "react/require-default-props": 0,
    "react/jsx-filename-extension": 0,
    "react/jsx-props-no-spreading": 0,
    "import/prefer-default-export": 0,
    "react/function-component-definition": 0,
    "jsx-a11y/control-has-associated-label": 0,
    "react/jsx-no-useless-fragment": [
      1,
      {
        "allowExpressions": true
      }
    ],
    "prefer-destructuring": [
      1,
      {
        "object": true,
        "array": false
      }
    ],
    "react/no-unstable-nested-components": [
      1,
      {
        "allowAsProps": true
      }
    ],
    "no-unused-vars": [
      1,
      {
        "args": "none"
      }
    ],
    "react/jsx-no-duplicate-props": [
      1,
      {
        "ignoreCase": false
      }
    ]
  }
}
