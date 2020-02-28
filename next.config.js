const withSass = require('@zeit/next-sass');

module.exports = (phase, { defaultConfig }) => {
  return {
    ...withSass()
  }
}
