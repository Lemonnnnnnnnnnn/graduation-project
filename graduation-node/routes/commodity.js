var express = require('express');
var router = express.Router();
var getToken = require('../utils/getToken')
var { databaseQuery, databaseAdd, databaseDelete, databaseUpdate } = require('../utils/database')

router.get('/getList', async function (req, res, next) {
    let access_token = global.token

    // 调用云函数
    if (!access_token) {
        access_token = await getToken()
    }
    const query = `db.collection(\"Dishes\").get()`

    let { data } = await databaseQuery(access_token, query)
    let newData = []
    data.map(i => newData.push(JSON.parse(i)))

    res.send(newData)
});

router.post('/modify', async function (req, res, next) {
    let access_token = global.token

    // 调用云函数
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


module.exports = router;
