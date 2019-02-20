'use strict'

const httpStatus = require('http-status')

const Post = require('../models/post.model')

exports.get = async (req, res) => {
  const page = req.query.page || 1
  const perPage = 15

  const query = {}
  query.skip = perPage * (page - 1)
  query.limit = perPage

  let totalLength = 0

  totalLength = await Post.count()

  Post
    .find(null, { _id: 1, title: 1, subtitle: 1 }, query)
    .sort({ updatedAt: -1 })
    .then(posts => {
      res.send({
        status: httpStatus.OK,
        page,
        totalLength,
        posts
      })
    }).catch(err => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: err.message || 'Some error ocurred while retrieving posts'
      })
    })
}
