'use strict'
const express = require('express')
const router = express.Router()

const authRouter = require('./auth.route')
const postRouter = require('./post.route')
const postsRouter = require('./posts.route')
const profileRouter = require('./profile.route')

router.get('/status', (req, res) => { res.send({status: 'OK'}) }) // api status

router.use('/auth', authRouter) // mount auth paths

router.use('/post', postRouter) // mount posts paths

router.use('/posts', postsRouter) // mount posts paths

router.use('/profile', profileRouter) // mount profile paths

module.exports = router
