const cloud = require('wx-server-sdk')
const environment = 'test-j9lpk'

cloud.init({
  env: environment,
  traceUser: true,
})

exports.main = async (event, context) => {
  const {
    OPENID,
    APPID,
    UNIONID,
    ENV,
  } = cloud.getWXContext()

  return {
    OPENID,
    APPID,
    UNIONID,
    ENV,
  }
}
