const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session')
// const session = require('express-session');

const common = require('./utils/common')

const indexRouter = require('./routes/index')
const passportRouter = require('./routes/passport')

let config = (app, express) => {
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
    app.use(cookieSession({
        name: 'my_testSession',
        keys: ['%$wsfswwe%@sff%$@FD#54'],
        maxAge: 24 * 60 * 60 * 1000 * 2
    }))
// app.use(session({
//     secret: 'my test session',
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//         maxAge: 6000
//     }
// }))

    // 注册路由配置
    app.use(common.csrfProtect, indexRouter)
    app.use(common.csrfProtect, passportRouter)
}

module.exports = config