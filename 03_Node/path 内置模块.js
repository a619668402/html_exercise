// console.log(__dirname)
// __dirname得到当前执行的文件绝对路径,不包括文件名

// console.log(__filename)

const path = require('path')
console.log(path.extname(__filename))
console.log(path.basename(__filename))

console.log(path.dirname(__filename))
let obj = path.parse(__filename)
console.log(obj)
// console.log(obj.root, obj.dir, obj.base, obj.ext, obj.name)

// console.log(path)

console.log(path.join('aaa', 'bbb', 'js'))
console.log('-------------------------------')
console.log(process.argv)
process.env.NODE_ENV = 'development'

console.log(process.env.NODE_ENV)