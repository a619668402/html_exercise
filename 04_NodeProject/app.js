const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express()
const router = express.Router()
// 路由配置
app.use(router)
// 静态资源路径配置
app.use(express.static('public'))
// 模板引擎配置
app.engine('html', require('express-art-template'));
app.set('view options', {
    debug: process.env.NODE_ENV !== 'production'
});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
// 配置post请求解析
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// cookie 配置
app.use(cookieParser())
// session 配置
app.use(session({
    secret: 'my test session',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 6000
    }
}))

router.get('/index', (req, res) => {
    // res.send('OK')
    res.cookie('aaa', '123')
    res.render('index')
})

app.listen(3000, () => {
    console.log('OK')
})