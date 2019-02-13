'use strict'

const httpStatus = require('http-status')

const Post = require('../models/post.model')

exports.get = (req, res) => {
  Post.find().sort({ updatedAt: -1 }).then(posts => {
    res.send({
      status: httpStatus.OK,
      posts
    })
  }).catch(err => {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: err.message || 'Some error ocurred while retrieving posts'
    })
  })
}
