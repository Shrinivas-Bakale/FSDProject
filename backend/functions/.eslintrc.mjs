module.exports = {
  env: {
    es2021: true,        // Supports modern JavaScript features
    node: true,          // Enables Node.js global variables
  },
  parserOptions: {
    ecmaVersion: 'latest', // Use the latest ECMAScript version
    sourceType: 'script',  // Use 'script' to treat files as CommonJS (not ESM)
  },
  extends: [
    'eslint:recommended',
    'google',
  ],
  rules: {
    'no-restricted-globals': ['error', 'name', 'length'],
    'prefer-arrow-callback': 'error',
    'quotes': ['error', 'double', { allowTemplateLiterals: true }],
    'comma-dangle': ['error', 'always-multiline'],
    'indent': ['error', 2],
    'no-console': 'warn',
    'no-undef': ['error', { 'typeof': true }], // Allow 'require', 'module', etc.
  },
  overrides: [
    {
      files: ['**/*.spec.*', '**/__tests__/*.js'],
      env: {
        mocha: true,
      },
      rules: {
        'no-unused-expressions': 'off',
      },
    },
  ],
  globals: {
    require: 'readonly',  // Ensure require is recognized
    module: 'readonly',   // Ensure module is recognized
    exports: 'readonly',  // Ensure exports is recognized
  },
};
