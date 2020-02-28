const withSass = require('@zeit/next-sass');
require('dotenv').config();

module.exports = (phase, { defaultConfig }) => {
  return {
    ...withSass(),
    env: {
      AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
      AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
      AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
      AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE,
      REDIRECT_URI: process.env.REDIRECT_URI,
      POST_LOGOUT_REDIRECT_URI: process.env.POST_LOGOUT_REDIRECT_URI,
      SESSION_COOKIE_SECRET: process.env.SESSION_COOKIE_SECRET,
    }
  }
}
