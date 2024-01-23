const glob = require('glob');

const getProjects = () => {
  const projects = glob.sync(`apps/*/jest.config.js`);

  return projects;
};

module.exports = {
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(js|ts|tsx)?$',
  projects: [...getProjects()],
  coverageProvider: 'v8',
  coverageReporters: ['lcov', 'html'],
  // move this to feature flag
  // reporters: [['jest-silent-reporter', { useDots: true }]],
  reporters: ['default', 'jest-junit', 'github-actions'],
  cacheDirectory: '.jest-cache',
};
