var express = require('express');
var router = express.Router();
var dayjs = require('dayjs')
var getToken = require('../utils/getToken')
var { databaseQuery,
    databaseAdd,
    databaseDelete,
    databaseUpdate,
    databaseCollectionDelete,
    databaseCollectionAdd } = require('../utils/database')

router.get('/getTable', async function (req, res, next) {
    let access_token = global.token

    // 调用云函数
    if (!access_token) {
        access_token = await getToken()
    }
    const query = "db.collection(\"DishedTable\").get()"

    let { data } = await databaseQuery(access_token, query)
    let newData = []
    data.map(i => newData.push(JSON.parse(i)))

    res.send(newData)

});

// 完成全部订单
router.get('/completeTotal', async function (req, res, next) {
    let access_token = global.token
    // 如果access_token不存在 先获取access_token
    if (!access_token) {
        getToken.then(res => access_token = res)
    }

    // 添加数据
    const query = "db.collection(\"DishedTable\").get()"
    let { data } = await databaseQuery(access_token, query)

    data.forEach(i => {
        const orderOverTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
        const parpareData = JSON.stringify({ ...JSON.parse(i), orderOverTime })
        const queryAdd = `db.collection(\"DishedRecycle\").add({data:${parpareData}})`
        databaseAdd(access_token, queryAdd).catch(e => {
            res.send(e)
        })
    })

    // 删除集合，添加集合

    const collection_name = 'DishedTable'
    databaseCollectionDelete(access_token, collection_name)
        .then(databaseCollectionAdd(access_token, collection_name).then(() => res.send('删除成功')))
        .catch(e => console.log(e))
})

// 完成一桌订单
router.get('/completeOneTable', async function (req, res, next) {
    let access_token = global.token
    // 如果access_token不存在 先获取access_token
    if (!access_token) {
        getToken.then(res => access_token = res)
    }

    // 执行查找方法
    let { query: { id } } = req

    const query = `db.collection(\"DishedTable\").doc(\"${id}\").get()`
    let { data } = await databaseQuery(access_token, query)
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

// 完成一单订单
router.get('/completeOneOrder', async function (req, res, next) {
    let access_token = global.token
    // 如果access_token不存在 先获取access_token
    if (!access_token) {
        getToken.then(res => access_token = res)
    }

    // 执行查找方法
    let { query: { id, itemId } } = req
    // 用同一个ID执行查找和删除方法，后一个方法会失效
    const idClone = id

    let queryTable = `db.collection(\"DishedTable\").doc(\"${id}\").get()`
    let { data: dataTable } = await databaseQuery(access_token, queryTable)
    dataTable = JSON.parse(dataTable[0])

    const { list, tableID, timeComplete, timePart, total } = dataTable

    // 克隆这笔订单并加上完成时间，获取这笔订单的序列
    let orderChoise = null
    let orderChoiseIndex = -1
    const orderOverTime = dayjs().format('YYYY-MM-DD HH:mm:ss')

    for (let i = 0; i < list.length; i++) {
        if (list[i].dishesId === itemId) {
            orderChoise = { ...list[i], orderOverTime }
            orderChoiseIndex = i
            break
        }
    }


    /* 
    如果当前桌不止一笔订单：
    1.克隆当时这笔订单
    2.拿桌ID去回收站查（回收站添加）：
        1)如果回收站有这笔单子，获取回收站中的List，把这笔订单push进入，更新List
        2)如果没有这笔单子，回收站创建一笔订单，List设为空数组，把这笔订单push进入，更新List
    3.获取桌单的List（桌单删除）：
        1)如果长度大于1，删除List指定订单，更新桌单List
        2)如果长度等于1，删除该桌单
    */

    // 添加方法：

    // 拿桌ID去回收站查
    const queryRecycle = `db.collection(\"DishedRecycle\").where({orderID:\"${id}\"}).get()`
    const { data: dataRecycle } = await databaseQuery(access_token, queryRecycle)
    if (dataRecycle.length) {
        // 如果回收站存在这笔订单，使用更新方法
        let listRecycleNew = JSON.parse(dataRecycle[0]).list
        listRecycleNew.push(orderChoise)

        const reqUpdateRecycle = JSON.stringify({ list: listRecycleNew })
        const reqPush = `db.collection(\"DishedRecycle\").where({orderID:\"${id}\"}).update({data :${reqUpdateRecycle}})`
        const updateRecycleResult = await databaseUpdate(access_token, reqPush)

        if (updateRecycleResult.errcode !== 0 || updateRecycleResult.modified !== 1) {
            res.send('回收站添加单一订单失败')
            return
        }

    } else {
        // 如果回收站不存在这笔订单，添加方法：
        let listRecycle = []
        listRecycle.push(orderChoise)
        const reqAdd = JSON.stringify({ list: listRecycle, tableID, timeComplete, timePart, total, orderID: id })

        const queryAdd = `db.collection(\"DishedRecycle\").add({data:${reqAdd}})`
        const AddResult = await databaseAdd(access_token, queryAdd)
        if (AddResult.errcode != 0) {
            res.send('回收站订单添加失败')
            return
        }
    }

    // 删除方法
    if (list.length > 1) {
        // 深克隆，尽量不动原数组，使用更新方法
        const listTableNew = [].concat(list)
        listTableNew.splice(orderChoiseIndex, 1)

        const reqUpdateTable = JSON.stringify({ list: listTableNew })
        const reqDelete = `db.collection(\"DishedTable\").doc(\"${idClone}\").update({data :${reqUpdateTable}})`
        const updateTableResult = await databaseUpdate(access_token, reqDelete)
        if (updateTableResult.errcode === 0 && updateTableResult.modified === 1) {
            res.send('删除单一订单成功')
        } else {
            res.send('删除单一订单失败')
        }

    } else {
        const reqDelete = `db.collection(\"DishedTable\").doc(\"${idClone}\").remove()`
        const deleteResult = await databaseDelete(access_token, reqDelete)
        if (deleteResult.errcode === 0 && deleteResult.deleted === 1) {
            res.send('删除成功')
        } else {
            res.send('删除失败')
        }
    }

});


module.exports = router;
