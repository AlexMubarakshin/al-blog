'use strict'

const Joi = require('joi')

// Post validation rules
module.exports = {
  create: {
    body: {
      title: Joi.string().required(),
      content: Joi.string().required()
    }
  }
}
