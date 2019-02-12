module.exports = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.tsx'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!lodash-es)'],
  moduleNameMapper: {
    '^@self/(.*)$': '<rootDir>/$1',
  },
};
