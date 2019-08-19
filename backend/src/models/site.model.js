'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SiteSchema = Schema({
  siteName: String,
  siteDescription: String,
  ownerName: String,
  ownerSiteURL: String
}, {
  timestamps: true
})

module.exports = mongoose.model('Site', SiteSchema)
