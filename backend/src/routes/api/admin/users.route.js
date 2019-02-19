'use strict'

const express = require('express')
const router = express.Router()
const auth = require('../../../middlewares/authorization')
const usersController = require('../../../controllers/users.controller')

router.get('/', auth(['admin']), usersController.getAll)
router.delete('/:id', auth(['admin']), usersController.delete)

module.exports = router
