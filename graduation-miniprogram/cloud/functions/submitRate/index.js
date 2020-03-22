const cloud = require('wx-server-sdk')
const env = 'test-j9lpk'
cloud.init({ env })
const db = cloud.database()

exports.main = async (event, context) => {
    const { id, rateBadge } = event
    let { data: { rate, average } } = await db.collection('Dishes').doc(id).get()
    rate.push(event)

    average = (average * (rate.length - 1) + rateBadge) / rate.length

    db.collection('Dishes').doc(id).update({
        data: { rate, average }
    }).then(() => {
        return rate
    }).catch(e => {
        return e
    })
}
