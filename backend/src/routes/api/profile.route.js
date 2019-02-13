'use strict'

const express = require('express')
const router = express.Router()
const auth = require('../../middlewares/authorization')
const profileController = require('../../controllers/profile.controller')

router.get('/', auth(), profileController.get)

module.exports = router
