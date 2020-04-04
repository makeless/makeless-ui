module.exports = {
  testRegex: 'src/test/.*\\.js',
  moduleFileExtensions: ['js', 'json', 'vue'],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.js$': 'babel-jest',
  },
  setupFilesAfterEnv: ['jest-expect-message'],
};
