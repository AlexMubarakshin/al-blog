'use strict'

const express = require('express')
const router = express.Router()

const validator = require('express-validation')
const { create } = require('../../validations/post.validation')

const auth = require('../../middlewares/authorization')

const postController = require('../../controllers/post.controller')

router.get('/:id', postController.get)
router.put('/:id', auth(['admin']), validator(create), postController.update)
router.delete('/:id', auth(['admin']), postController.delete)
router.post('/create', auth(['admin']), validator(create), postController.create)

module.exports = router
