var express = require('express');
var router = express.Router();
var getToken = require('../utils/getToken')
var { databaseQuery, databaseAdd, databaseDelete, databaseUpdate } = require('../utils/database')

router.get('/getList', async function (req, res, next) {
    // 从全局变量中获取凭证
    let access_token = global.token

    // 如果凭证不存在则调用方法获取一次
    if (!access_token) {
        access_token = await getToken()
    }

    const query = `db.collection(\"Dishes\").get()`

    // 调用封装的数据库操作方法,将结果从JSON对象转化为普通对象传递给客户端
    let { data } = await databaseQuery(access_token, query)
    let newData = []
    
    data.map(i => newData.push(JSON.parse(i)))

    res.send(newData)
});

router.post('/modify', async function (req, res, next) {
    let access_token = global.token

    if (!access_token) {
        access_token = await getToken()
    }

    req.on('data', (data) => {
        const id = JSON.parse(data)._id

        const query = `db.collection("Dishes").doc("${id}").update({data:${data}})`
        databaseUpdate(access_token, query)
            .then(() => { res.send('修改成功') })
            .catch((e) => res.send(e))
    })
})

router.post('/add', async function (req, res, next) {
    let access_token = global.token

    if (!access_token) {
        access_token = await getToken()
    }

    req.on('data', (data) => {
        let newData = JSON.parse(data)
        newData = JSON.stringify({ ...newData, average: 5, freq: 1, rate: [] })
        
        const query = `db.collection("Dishes").add({data:${newData}})`
        databaseAdd(access_token, query)
            .then(() => { res.send('新增成功！') })
            .catch((e) => res.send(e))
    })
})

router.post('/remove', async function (req, res, next) {
    let access_token = global.token

    if (!access_token) {
        access_token = await getToken()
    }

    req.on('data', (data) => {
        const id = JSON.parse(data)._id

        const query = `db.collection("Dishes").doc("${id}").remove()`
        databaseDelete(access_token, query)
            .then(() => { res.send('删除成功！') })
            .catch((e) => res.send(e))
    })
})

router.get('/special', async function (req, res, next) {
    let access_token = global.token

    if (!access_token) {
        access_token = await getToken()
    }

    const query = `db.collection(\"DishesSpecial\").get()`

    let { data } = await databaseQuery(access_token, query)
    let newData = []
    data.map(i => newData.push(JSON.parse(i)))

    res.send(newData)
})

module.exports = router;
