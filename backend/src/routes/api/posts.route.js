'use strict'

const express = require('express')
const router = express.Router()

const postController = require('../../controllers/posts.controller')

router.get('/', postController.get)

module.exports = router
