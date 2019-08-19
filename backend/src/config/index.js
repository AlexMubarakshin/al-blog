require('dotenv').config() // load .env file

module.exports = {
  port: process.env.PORT,
  app: process.env.APP,
  env: process.env.NODE_ENV,
  secret: process.env.APP_SECRET,
  mongo: {
    uri: process.env.MONGOURI,
    testURI: process.env.MONGOTESTURI
  },
  siteInfo: {
    siteName: process.env.SITE_NAME || '',
    siteDescription: process.env.SITE_DESCRIPTION || '',
    ownerName: process.env.OWNER_NAME || '',
    ownerSiteURL: process.env.OWNER_SITE_URL || ''
  }
}
