'use strict'

const express = require('express')
const router = express.Router()
const auth = require('../../../middlewares/authorization')
const usersController = require('../../../controllers/users.controller')

router.get('/', auth(['admin']), usersController.get)

module.exports = router
