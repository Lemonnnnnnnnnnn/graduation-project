var express = require('express');
var router = express.Router();
var axios = require('axios')
var getToken = require('../utils/getToken')

const environment = 'test-j9lpk'

router.get('/', async function (req, res, next) {
    let access_token = global.token

    // 调用云函数
    const data = await getDishesTableList(access_token)

    res.send(data)

});

function getDishesTableList(access_token) {
    return new Promise(async (resolve, reject) => {
        let functionName = 'getDishesTableList'

        // 如果access_token不存在 直接获取一次token
        if (!access_token) {
            access_token = await getToken()
        }

        axios.post(`https://api.weixin.qq.com/tcb/invokecloudfunction?access_token=${access_token}&env=${environment}&name=${functionName}`)
            .then(async r => {
                const { errcode, resp_data } = r.data
                switch (errcode) {
                    case 0: { resolve(resp_data) } break
                    // 如果access_token过期 重新获取access_token
                    case 42001: {
                        const token_new = await getToken()
                        resolve(getDishesTableList(token_new))
                    } break
                    // 如果access_token不存在，获取access_token
                    case 40001: {
                        const token_new = await getToken()
                        resolve(getDishesTableList(token_new))

                    } break
                    // 41001 : 缺少AccessToken
                    case 41001: {
                        const token_new = await getToken()
                        resolve(getDishesTableList(token_new))
                    } break
                    default: {
                        const token_new = await getToken()
                        resolve(getDishesTableList(token_new))
                    }
                }
            })
    })

}

module.exports = router;
