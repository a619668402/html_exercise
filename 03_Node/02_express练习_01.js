const express = require('express')
const fs = require('fs')
const app = express()
const port = 8080

app.use('/static', express.static('public'))

app.get('/', (req, res) => {
    res.send('hello world')
})

app.get('/index', (req, res) => {
    console.log(req.query)
    res.send(req.query)
})

app.post('/index', (req, res) => {

    res.send()
})

app.listen(port, () => {
    console.log('listen')
})
