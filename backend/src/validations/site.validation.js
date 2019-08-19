'use strict'

const Joi = require('joi')

// Site validation rules
module.exports = {
  create: {
    body: {
      siteName: Joi.string(),
      siteDescription: Joi.string().min(6).max(128),
      ownerName: Joi.string().max(128),
      ownerSiteURL: Joi.string().uri().max(128)
    }
  },
  update: {
    body: {
      siteName: Joi.string(),
      siteDescription: Joi.string().min(6).max(128),
      ownerName: Joi.string().max(128),
      ownerSiteURL: Joi.string().uri().max(128)
    }
  },
}
