'use strict'

const User = require('../models/user.model')
const httpStatus = require('http-status')

exports.get = async (req, res, next) => {
  const userID = req.user._id
  User
    .findById(userID, { _id: 1, role: 1, email: 1, name: 1, createdAt: 1, updatedAt: 1 })
    .then(user => {
      res.send({ user })
    })
    .catch(err => {
      req.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: err.message || 'Internal server error'
      })
    })
}
