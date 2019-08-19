'use strict'

const config = require('../config')
const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

const siteController = require('../controllers/site.controller');

function bootstrap() {
  const promises = [
    siteController.bootrstrap()
  ]

  return Promise.all(promises)
}

mongoose.connection.on('connected', () => {
  console.log('[DB] MongoDB is connected')
})

mongoose.connection.on('error', (err) => {
  console.log(`[DB] Could not connect to MongoDB because of ${err}`)
  process.exit(-1)
})

if (config.env === 'dev') {
  mongoose.set('debug', true)
}

exports.connect = async () => {
  var mongoURI = (config.env === 'prod' || 'dev' ? config.mongo.uri : config.mongo.testURI)

  mongoose.connect(mongoURI, {
    keepAlive: 1
  })

  console.log('[DB] Bootstrap MongoDB')
  await bootstrap()
  console.log('[DB] Bootstrap finish')

  return mongoose.connection
}
