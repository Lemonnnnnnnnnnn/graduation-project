var express = require('express');
var router = express.Router();
var getToken = require('../utils/getToken')
var { databaseQuery, databaseAdd, databaseDelete, databaseUpdate, databaseCollectionDelete, databaseCollectionAdd } = require('../utils/database')

// 获取列表
router.get('/getList', async function (req, res, next) {
    let access_token = global.token

    const { query: { page } } = req

    // 调用云函数
    if (!access_token) {
        access_token = await getToken()
    }

    const query = `db.collection("DishedRecycle").orderBy('timeComplete','desc').skip(${(page - 1) * 10}).limit(10).get()`

    let { data, pager } = await databaseQuery(access_token, query)
    let newData = []
    data.map(i => newData.push(JSON.parse(i)))

    const response = { list: newData, total: pager.Total }

    res.send(response)

});

// 清空回收站
router.get('/clear', async function (req, res, next) {
    let access_token = global.token
    // 如果access_token不存在 先获取access_token
    if (!access_token) {
        getToken.then(res => access_token = res)
    }

    // 删除集合，添加集合

    const collection_name = 'DishedRecycle'
    databaseCollectionDelete(access_token, collection_name)
        .then(
            () => databaseCollectionAdd(access_token, collection_name)
                .then(() => res.send('已清空回收站'))
                .catch(e => console.log(e))
        )
        .catch(e => console.log(e))
})


module.exports = router;
