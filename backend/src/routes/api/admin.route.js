'use strict'

const express = require('express')
const router = express.Router()

const usersRouter = require('./admin/users.route')

router.use('/users', usersRouter)

module.exports = router
