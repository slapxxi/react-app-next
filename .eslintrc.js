module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: ['plugin:react/recommended', 'plugin:@typescript-eslint/recommended'],
  plugins: ['react', 'jsx-a11y', 'import', 'react-hooks'],
  rules: {
    'react/react-in-jsx-scope': [0],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/indent': [0],
    '@typescript-eslint/explicit-function-return-type': [0],
    '@typescript-eslint/no-var-requires': [0],
    '@typescript-eslint/no-use-before-define': [0],
    '@typescript-eslint/no-non-null-assertion': [0],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
