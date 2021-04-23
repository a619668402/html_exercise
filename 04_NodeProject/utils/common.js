// 公共工具类
const Base64 = require('js-base64')
const md5 = require('md5')
const jwt = require("jsonwebtoken")
const keys = require('../keys')

function getRandomString(n) {
    let str = ''
    while (str.length < n) {
        str += Math.random().toString(36).substr(2)
    }
    return str.substr(str.length - n)
}

function csrfProtect(req, res, next) {
    let method = req.method
    if (method === 'GET') {
        let csrf_token = getRandomString(48)
        res.cookie('csrf_token', csrf_token)
        next()
    } else if (method === 'POST') {
        console.log(req.headers['x-csrftoken'])
        console.log(req.cookies['csrf_token'])
        if (req.headers['x-csrftoken'] === req.cookies['csrf_token']) {
            next()
        } else {
            res.send({errmsg: 'csrf验证不通过'})
            return
        }
    }
}

function encodeBase64(str) {
    return Base64.encode(str)
}

function decodeBase64(str) {
    return Base64.decode(str)
}

function md5String(str) {
    return md5(str)
}

function createJWT(data) {
    return jwt.sign(data, keys.jwt_salt, {expiresIn: 60 * 60 * 2})
}




module.exports = {
    csrfProtect,
    encodeBase64,
    decodeBase64,
    md5,
    createJWT
}