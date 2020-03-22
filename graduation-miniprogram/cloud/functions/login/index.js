const cloud = require('wx-server-sdk')
const environment = 'test-j9lpk'

cloud.init({
  env: environment,
  traceUser: true,
})

const db = cloud.database()

exports.main = async (event, context) => {
  const userMsg = cloud.getWXContext()

  /**
   *  如果数据库中没有OPENID，添加一个新的记录，包含用户基本信息和积分0
   */
  const { data } = await db.collection('members').where({ OPENID: userMsg.OPENID }).get()

  if (!data.length) {
    db.collection('members').add({
      data: {
        ...event,
        ...userMsg,
        integral: 0,
      }
    })
  }

  return { ...userMsg }
}
