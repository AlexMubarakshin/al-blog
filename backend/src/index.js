'use strict'

const mongoose = require('./services/mongoose')
const app = require('./services/express')

// start app and connect to database
async function main() {
    await mongoose.connect()
    app.start()
}

main()

module.exports = app
