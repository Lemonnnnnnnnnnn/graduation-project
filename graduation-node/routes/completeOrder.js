var express = require('express');
var router = express.Router();
var dayjs = require('dayjs')
var getToken = require('../utils/getToken')
var { databaseQuery, databaseAdd, databaseDelete, databaseUpdate } = require('../utils/database')


router.get('/', async function (req, res, next) {
    let access_token = global.token
    // 如果access_token不存在 先获取access_token
    if (!access_token) {
        getToken.then(res => access_token = res)
    }

    // 执行查找方法
    let { query: { id } } = req

    const query = `db.collection(\"DishedTable\").doc(\"${id}\").get()`
    let data = await databaseQuery(access_token, query)
    data = JSON.parse(data[0])

    // 执行添加方法
    const { list, tableID, timeComplete, timePart, total } = data
    const orderOverTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
    const reqAdd = JSON.stringify({ list: list.map(i => ({ ...i, orderOverTime })), tableID, timeComplete, timePart, total })

    const queryAdd = `db.collection(\"DishedRecycle\").add({data:${reqAdd}})`
    const AddResult = await databaseAdd(access_token, queryAdd)
    if (AddResult.errcode != 0) { return res.send('回收站添加订单失败') }

    // 执行删除方法

    const queryDelete = `db.collection(\"DishedTable\").doc(\"${id}\").remove()`
    const deleteResult = await databaseDelete(access_token, queryDelete)
    console.log(deleteResult)
    if (deleteResult.errcode === 0 && deleteResult.deleted === 1) {
        res.send('删除成功')
    } else {
        res.send('删除失败')
    }
});

module.exports = router;
