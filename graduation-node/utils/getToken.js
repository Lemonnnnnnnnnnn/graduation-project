const appid = 'wx59bf2436a76f7665'
const secret = '5d5121d13ed0363bc7ef98552c77f45e'
var axios = require('axios')
let access_token = ''

/* 获取凭证access_token */

function getToken() {
    return new Promise((resolve, reject) => {
        console.log('获取access_token')
        axios.get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`).then(result => {
            if (result.data) {
                access_token = result.data.access_token
                global.token = access_token
                resolve(access_token)
            }
        })
    })
}

module.exports = getToken;
