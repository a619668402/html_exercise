const express = require('express')
const handleDB = require('../db/handleDB')
require('../utils/filter')
const router = express.Router()
const common = require('../utils/common')

router.get('/', (req, res) => {
    res.redirect('/index')
})

router.get('/index', (req, res) => {
    console.log(common.md5('hello'));
    (async function () {
        // 分类数据
        let categorys = await handleDB(res, 'info_category', 'find', '查询失败')
        // 点击排行数据
        let clicks = await handleDB(res, 'info_news', 'sql', '查询出错', 'select * from info_news order by clicks desc limit 6')

        let userId = req.session['user_id']
        let result = null
        if (userId) {
            // 用户信息
            result = await handleDB(res, 'info_user', 'find', '查询失败', 'id = ' + userId)
        }
        let data = {
            user_info: result ? {
                username: result[0].username,
                avatar_url: result[0].avatar_url,
            } : false,
            categorys: categorys,
            clicks: clicks
        }
        res.render('news/index', data)
    })()
})

router.get('/404', (req, res) => {
    res.render('news/404')
})

module.exports = router