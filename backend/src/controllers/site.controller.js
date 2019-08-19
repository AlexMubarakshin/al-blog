'use strict'

const httpStatus = require('http-status')

const Site = require('../models/site.model')

const config = require('../config')

exports.get = async (req, res) => {
  try {
    const config = await Site.findOne()

    res.send({
      status: httpStatus.OK,
      config
    })
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: err.message || 'Some error ocurred while retrieving site config'
    })
  }
}

exports.update = async (req, res) => {
  try {

    await Site.findOneAndUpdate({}, {
      siteName: req.body.siteName,
      siteDescription: req.body.siteDescription,
      ownerName: req.body.ownerName,
      ownerSiteURL: req.body.ownerSiteURL,
    })

    const updatedInfo = await Site.findOne()

    res.send({
      status: httpStatus.OK,
      site: updatedInfo
    })
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(httpStatus.NOT_FOUND).send({
        message: 'Config not found'
      })
    }
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      message: 'Error retrieving site config'
    })
  }


}

exports.bootrstrap = async () => {
  const info = await Site.findOne()

  if (!info) {
    console.log('Site info not found in DB. Trying to create new.')
    const defaultSiteInfo = new Site({
      ...config.siteInfo
    })

    await defaultSiteInfo.save()
  }
}