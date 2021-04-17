const express = require('express')
const Captcha = require('../utils/captcha')
const handleDB = require('../db/handleDB')
const router = express.Router()

router.get('/passport', (req, res) => {
    // res.render('/')
    res.send(req.session['image_code'])
})

router.get('/passport/image_code/:t', (req, res) => {
    const codeImg = new Captcha().getCode()
    console.log(codeImg.text)
    // 保存图片验证码文本
    req.session['image_code'] = codeImg.text
    res.setHeader('Content-Type', 'image/svg+xml')
    res.send(codeImg.data)
})

router.post('/passport/register', (req, res) => {
    (async function () {
        let {username, image_code, password, agree} = req.body;
        console.log(username, image_code, password, agree)
        if (!username || !image_code || !password || !agree) {
            res.send({errmsg:'缺少必要信息'})
            return
        }
        if (req.session['image_code'].toLowerCase() !== image_code.toLocaleString()) {
            res.send({errmsg:'验证码不正确'})
            return
        }

        let result = await handleDB(res, 'info_user', 'find', '查询出错', 'username = "'+ username +'"');
        console.log(result)
        if (result[0]) {
            res.send({errmsg:'用户名已存在'})
            return
        }
        let result1 = await handleDB(res, 'info_user', 'insert', "插入失败", {username: username, nick_name: username, password_hash: password});
        let rowId = result1.insertId;
        res.send({errno: 0, errmsg: '注册成功'})
    })()
})

router.post('/passport/login', (req, res) => {
    (async function () {
        let {username, password} = req.body
        if (!username || !password) {
            res.send({errmsg: '账号密码不能为空'})
            return
        }
        let result = await handleDB(res, 'info_user', 'find', '查询失败', 'username = "'+ username +'" and password_hash = "'+ password +'"')
        console.log(result)
        if (!result[0]) {
            res.send({errmsg: '该用户为注册,登录失败'})
            return
        }
        if (password !== result[0].password_hash) {
            res.send({errmsg: '用户名或者密码错误,登录失败'})
            return
        }
        req.session['user_id'] = result[0].id
        res.send({errno: 0, errmsg: '登录成功'})
    })()
})

router.post('/passport/logout', (req, res) => {
    req.session['user_id'] = null
    res.send('ok')
})
module.exports = router