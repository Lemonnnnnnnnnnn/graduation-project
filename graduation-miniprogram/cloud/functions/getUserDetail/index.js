const cloud = require('wx-server-sdk')
const env = 'test-j9lpk'
cloud.init({ env })
const db = cloud.database()

exports.main = async (event, context) => {
    const { id } = event
    return db.collection('members').where({ OPENID: id }).get()
}
