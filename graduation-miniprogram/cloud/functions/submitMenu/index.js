const cloud = require('wx-server-sdk')
const environment = 'test-j9lpk'

cloud.init({
    env: environment,
})

const db = cloud.database()

exports.main = async (event, context) => {
    const { list, total, tableID, timePart, timeComplete } = event

    return new Promise((resolve, reject) => {
        db.collection('DishedTable').add({
            data: {
                list,
                total,
                tableID,
                timePart,
                timeComplete
            },
            success: (res) => { resolve( res) },
            fail: (err) => { resolve(err) },
        })
    })
}