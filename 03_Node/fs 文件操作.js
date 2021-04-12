const fs = require('fs')
const path  = require('path')

let filePath = path.join(__dirname, '模块中this指向.js')
// console.log(filePath)
//
// let res = fs.readFileSync(filePath, 'utf-8')
// console.log(res)
//
// fs.readFile(filePath, 'utf-8',(err, res) => {
//     console.log(res)
// })

fs.writeFile(filePath, 'testWriteFile', 'utf-8', function (err) {
    console.log(err)
})
