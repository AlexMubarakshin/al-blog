'use strict'

const httpStatus = require('http-status')

const Post = require('../models/post.model')

exports.create = (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  })

  post.save()
    .then(data => {
      res.send({
        status: httpStatus.OK,
        data
      })
    })
    .catch(err => {
      res.status(err.INTERNAL_SERVER_ERROR).send({
        message: err.message || 'Some error ocurred while creating the Post.'
      })
    })
}

exports.delete = (req, res) => {
  Post.findByIdAndRemove(req.params.id).then(post => {
    if (!post) {
      res.status(httpStatus.NOT_FOUND).send({
        status: httpStatus.OK,
        message: 'Post not found with id ' + req.params.id
      })
    }
    res.send({ status: httpStatus.OK, message: 'Post deleted successfully!' })
  })
    .catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(httpStatus.NOT_FOUND).send({
          message: 'Post not found with id ' + req.params.id
        })
      }
      return res.status(500).send({
        message: 'Could not delete post with id ' + req.params.id
      })
    })
}

exports.get = (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      if (!post) {
        return res.status(httpStatus.NOT_FOUND).send({
          message: 'Post not found with id ' + req.params.id
        })
      }
      res.send(post)
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(httpStatus.NOT_FOUND).send({
          message: 'Post not found with id ' + req.params.id
        })
      }
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        message: 'Error retrieving post with id ' + req.params.id
      })
    })
}

exports.update = (req, res) => {
  Post.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    content: req.body.content
  })
    .then(post => {
      if (!post) {
        return res.status(httpStatus.NOT_FOUND).send({
          message: 'Post not found with id ' + req.params.id
        })
      }
      res.send(post)
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(httpStatus.NOT_FOUND).send({
          message: 'Post not found with id ' + req.params.id
        })
      }
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        message: 'Error retrieving post with id ' + req.params.id
      })
    })
}
