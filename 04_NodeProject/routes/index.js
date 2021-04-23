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

router.get('/news_list', (req, res) => {
    (async function() {
        let {page, cid, per_page} = req.query
        // per_page = parseInt(per_page)
        // console.log(req.query)
        // let newsList = await handleDB(res, 'info_news', 'sql', '查询出错', 'select * from info_news where category_id = ' + parseInt(cid) + ' limit '+ (page - 1) + ', ' + per_page +'')
        let wh = cid == 1 ? '1' : `category_id = ${cid}`
        let newsList = await handleDB(res, 'info_news', 'limit', '查询出错', {
            where: `${wh} order by create_time desc`,
            number: page,
            count: per_page
        })
        let totalCount = await handleDB(res, 'info_news', 'sql', '查询出错', 'select count(*) as a from info_news')
        // let totalPage = totalCount % per_page == 0 ? totalCount / per_page : totalCount / per_page + 1
        // console.log(totalCount, totalPage)
        res.send({
            newsList,
            currentPage: parseInt(page),
            totalPage: 20
        })
    })()
})

module.exports = router