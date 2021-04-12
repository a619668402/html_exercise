const http = require('http')
const fs = require('fs')
const path = require('path')

const port = 8080

const server = http.createServer((request, response) => {

    let url = request.url;
    let parsedPath = path.parse(url);
    if (parsedPath.ext == '.html') {
        // console.log(parsedPath.base)
        // console.log(path.basename(__filename))
        // console.log(path.dirname(__filename))
        let filePath = path.join(path.dirname(__filename), '01_NodeTest.html')
        fs.readFile(filePath, (err, data) => {
            if (err) {
                response.end()
                return
            }
            response.write(data, (err) => {
                console.log(err)
            })
            response.end()
        })
    }
})

server.listen(port, (error) => {
    console.log('listen')
})