var express = require('express');
var expressWs = require('express-ws');

var router = express.Router();
expressWs(router);

/**
 * 当用户在小程序端访问post路由时，需要调用ws路由中的方法发送请求给h5端
 * 1.店家保持h5端在运行，维持websockt连接，并将sendMethod方法暴露出去
 * 2.用户在小程序端下单，如果sendMethod方法存在，调用他通知h5端
 */
let sendMethod

router.ws('/', function (ws, req) {
    ws.on('message', function (msg) {
        console.log('从客户端获取的信息是' + msg)
    })
    sendMethod = function () {
        ws.send('有新的订单')
    }
})

router.post('/', function (req, res, next) {
    if (sendMethod) {
        sendMethod()
        res.send('成功')
    } else {
        res.send('失败')
    }

})


router.get('/', function (req, res, next) {
})

module.exports = router