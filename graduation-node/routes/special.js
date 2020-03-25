var express = require('express');
var router = express.Router();
var getToken = require('../utils/getToken')
var { databaseQuery, databaseAdd, databaseDelete, databaseUpdate } = require('../utils/database')

router.get('/getList', async function (req, res, next) {
    let access_token = global.token

    if (!access_token) {
        access_token = await getToken()
    }

    const query = `db.collection(\"DishesSpecial\").get()`

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

        const query = `db.collection("DishesSpecial").doc("${id}").update({data:${data}})`
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
        const query = `db.collection("DishesSpecial").add({data:${data}})`
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

        const query = `db.collection("DishesSpecial").doc("${id}").remove()`
        databaseDelete(access_token, query)
            .then(() => { res.send('删除成功！') })
            .catch((e) => res.send(e))
    })
})


module.exports = router;
