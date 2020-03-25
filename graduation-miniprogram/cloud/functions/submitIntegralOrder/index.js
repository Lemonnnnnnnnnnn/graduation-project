const cloud = require('wx-server-sdk')
const environment = 'test-j9lpk'

cloud.init({
    env: environment,
})

const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
    const { list, tableID, timePart, timeComplete, OPENID } = event

    await db.collection('members').where({ OPENID }).update({
        data: {
            integral: _.inc(- list[0].scores)
        },
        success: () => { },
        fail: (e) => console.log(e)
    })

    return new Promise((resolve, reject) => {
        db.collection('DishedTable').add({
            data: {
                list,
                total: list[0].scores + '积分',
                tableID,
                timePart,
                timeComplete
            },
            success: (res) => { resolve(res) },
            fail: (err) => { resolve(err) },
        })
    })
}