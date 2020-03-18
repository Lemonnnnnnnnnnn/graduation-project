const cloud = require('wx-server-sdk')
const env = 'test-j9lpk'
cloud.init({ env })
const db = cloud.database()

exports.main = async (event, context) => {
  return db.collection('Dishes').orderBy('freq', 'desc').get()
}
