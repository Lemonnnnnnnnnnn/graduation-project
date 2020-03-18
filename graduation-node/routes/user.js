const nodemailer = require('nodemailer');
const express = require('express')
const router = express.Router()
var getToken = require('../utils/getToken')
var { databaseQuery, databaseAdd, databaseDelete, databaseUpdate } = require('../utils/database')

router.get('/sendMail', function (req, res, next) {
    const { query: { address } } = req
    let transporter = nodemailer.createTransport({
        service: 'qq', // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
        auth: {
            user: '1041707577@qq.com',
            // 这里密码不是qq密码，是你设置的smtp授权码
            pass: 'qduxbmxdbwvmbddc',
        }
    });

    let code = ''
    for (let i = 0; i < 4; i++) {
        code += Math.floor(Math.random() * 10)
    }
    let mailOptions = {
        from: '"Lemon" <1041707577@qq.com>', // sender address
        to: address, // list of receivers
        subject: 'Hello', // Subject line
        // 发送text或者html格式
        // text: 'Hello world?', // plain text body
        html: `<h4>验证码如下：</h4><h1>${code}<h1>` // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Message sent: <04ec7731-cc68-1ef6-303c-61b0f796b78f@qq.com>
    });

    res.send(code)
})

router.post('/register', async function (req, res, next) {
    let access_token = global.token
    // 如果access_token不存在 先获取access_token
    if (!access_token) {
        getToken().then(res => access_token = res)
    }

    req.on('data', async function (data) {

        const queryAdd = `db.collection(\"adminTable\").add({data:${data}})`
        const AddResult = await databaseAdd(access_token, queryAdd)

        if (AddResult.errcode != 0) {
            console.log(AddResult)
            res.status(500)
            res.send('注册失败')
        } else {
            res.send('注册成功')
        }


    })
})

router.post('/login', function (req, res, next) {

    let access_token = global.token
    // 如果access_token不存在 先获取access_token
    if (!access_token) {
        getToken().then(res => access_token = res)
    }

    req.on('data', async data => {
        let queryTable = `db.collection("adminTable").where(${data}).get()`
        let { data: dataTable } = await databaseQuery(access_token, queryTable).catch(e => console.log(e))
        if (dataTable && dataTable.length) {
            res.send('登录成功')
        } else {
            res.status(203)
            res.send('账号或密码错误')
        }
    })
})


module.exports = router