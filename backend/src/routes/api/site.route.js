'use strict'

const express = require('express')
const validator = require('express-validation')
const router = express.Router()
const auth = require('../../middlewares/authorization')
const siteController = require('../../controllers/site.controller')

const { create, update } = require('../../validations/site.validation')

router.get('/', siteController.get)
router.put('/', auth(['admin']), validator(update), siteController.update)

module.exports = router
