const environment = 'test-j9lpk'
var getToken = require('../utils/getToken')
var axios = require('axios')

function databaseQuery(access_token, query) {
    return new Promise(async (resolve, reject) => {
        const params = {
            env: environment,
            query
        }
        const url = `https://api.weixin.qq.com/tcb/databasequery?access_token=${access_token}`
        // 分别处理查到信息和没有查到信息的情况
        let { data } = await axios.post(url, params)

        switch (data.errcode) {
            case 0: {
                resolve(data.data)
            } break
            case 40001: {
                const newToken = await getToken()
                resolve(databaseAdd(newToken, query))
            } break
            default: {
                reject(data)
            }
        }
    })
}

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
            case 40001: {
                const newToken = await getToken()
                resolve(databaseAdd(newToken, query))
            } break
            default: {
                reject(data)
            }
        }

    })
}

function databaseDelete(access_token, query) {
    return new Promise(async (resolve, reject) => {
        const params = {
            env: environment,
            query
        }
        const url = `https://api.weixin.qq.com/tcb/databasedelete?access_token=${access_token}`
        let { data } = await axios.post(url, params)

        resolve(data)
    })
}

function databaseUpdate(access_token, query) {
    return new Promise(async (resolve, reject) => {
        const params = {
            env: environment,
            query
        }
        const url = `https://api.weixin.qq.com/tcb/databaseupdate?access_token=${access_token}`
        let { data } = await axios.post(url, params)

        resolve(data)
    })
}

module.exports = {
    databaseUpdate,
    databaseDelete,
    databaseAdd,
    databaseQuery
}