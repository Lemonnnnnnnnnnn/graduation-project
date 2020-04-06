const environment = 'test-j9lpk'
var getToken = require('../utils/getToken')
var axios = require('axios')

// 查找记录
function databaseQuery(access_token, query) {
    // 将结果作为promise对象return出去
    return new Promise(async (resolve, reject) => {
        // 参数为数据库查询语句query和云数据库环境
        const params = {
            env: environment,
            query
        }
        const url = `https://api.weixin.qq.com/tcb/databasequery?access_token=${access_token}`
        // 分别处理查到信息和没有查到信息的情况

        let { data } = await axios.post(url, params)
        switch (data.errcode) {
            // 如果成功获取,将结果抛出
            case 0: {
                resolve(data)
            } break
            default: {
                const newToken = await getToken()
                resolve(databaseQuery(newToken, query))
            }
        }
    })
}

// 添加记录
function databaseAdd(access_token, query) {
    return new Promise(async (resolve, reject) => {
        const urlAdd = `https://api.weixin.qq.com/tcb/databaseadd?access_token=${access_token}`
        const paramsAdd = {
            env: environment,
            query
        }

        const { data } = await axios.post(urlAdd, paramsAdd)
        switch (data.errcode) {
            case 0: {
                resolve(data)
            } break

            default: {
                const newToken = await getToken()
                resolve(databaseAdd(newToken, query))
            }
        }

    })
}
// 删除记录
function databaseDelete(access_token, query) {
    return new Promise(async (resolve, reject) => {
        const params = {
            env: environment,
            query
        }
        const url = `https://api.weixin.qq.com/tcb/databasedelete?access_token=${access_token}`

        const { data } = await axios.post(url, params)
        switch (data.errcode) {
            case 0: {
                resolve(data)
            } break
            default: {
                const newToken = await getToken()
                resolve(databaseDelete(newToken, query))
            }
        }
    })
}
// 更新记录
function databaseUpdate(access_token, query) {
    return new Promise(async (resolve, reject) => {
        const params = {
            env: environment,
            query
        }
        const url = `https://api.weixin.qq.com/tcb/databaseupdate?access_token=${access_token}`

        const { data } = await axios.post(url, params)
        switch (data.errcode) {
            case 0: {
                resolve(data)
            } break
            default: {
                const newToken = await getToken()
                resolve(databaseUpdate(newToken, query))
            }
        }
    })
}

// 添加集合
function databaseCollectionAdd(access_token, collection_name) {
    return new Promise(async (resolve, reject) => {
        const urlAdd = `https://api.weixin.qq.com/tcb/databasecollectionadd?access_token=${access_token}`
        const paramsAdd = {
            env: environment,
            collection_name
        }

        const { data } = await axios.post(urlAdd, paramsAdd)
        switch (data.errcode) {
            case 0: {
                resolve(data)
            } break
            default: {
                const newToken = await getToken()
                resolve(databaseCollectionAdd(newToken, query))
            }
        }
    })
}

// 删除集合
function databaseCollectionDelete(access_token, collection_name) {
    return new Promise(async (resolve, reject) => {
        const params = {
            env: environment,
            collection_name
        }
        const url = `https://api.weixin.qq.com/tcb/databasecollectiondelete?access_token=${access_token}`

        const { data } = await axios.post(url, params)
        switch (data.errcode) {
            case 0: {
                resolve(data)
            } break
            default: {
                const newToken = await getToken()
                resolve(databaseCollectionDelete(newToken, query))
            }
        }
    })
}

module.exports = {
    databaseUpdate,
    databaseDelete,
    databaseAdd,
    databaseQuery,
    databaseCollectionAdd,
    databaseCollectionDelete
}