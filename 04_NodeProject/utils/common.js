// 公共工具类

function csrfProtect(req, res, next) {
    let method = req.method
    if (method === 'GET') {
        let csrf_token = ''
        res.cookie('csrf_token', csrf_token)
        next()
    } else if (method === 'POST') {
        if (req.headers['x-csrftoken'] === req.cookie['csrf_token']) {
            next()
        } else {
            res.send('csrf验证不通过')
            return
        }
    }
}