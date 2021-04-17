const express = require('express')
const config = require('./config')

const app = express()

config(app, express)

app.listen(9090, () => {
    console.log('OK')
})
