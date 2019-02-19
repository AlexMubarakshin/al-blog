'use strict'

const User = require('../models/user.model')
const httpStatus = require('http-status')

exports.getAll = (req, res, next) => {
  User.find(null, { _id: 1, role: 1, email: 1, name: 1, createdAt: 1, updatedAt: 1 })
    .then(users => {
      res.send({ users })
    })
    .catch(err => {
      req.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: err.message || 'Internal server error'
      })
    })
}

exports.delete = (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(user => {
      if (!user) {
        return req
          .status(httpStatus.NOT_FOUND)
          .send({
            status: httpStatus.NOT_FOUND,
            message: 'User not found with id ' + req.params.id
          })
      }

      return res.status(httpStatus.OK).send({
        status: httpStatus.OK,
        message: 'User deleted successfully!'
      })
    })
    .catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(httpStatus.NOT_FOUND).send({
          message: 'User not found with id ' + req.params.id
        })
      }
      return res.status(500).send({
        message: 'Could not delete user with id ' + req.params.id
      })
    })
}
