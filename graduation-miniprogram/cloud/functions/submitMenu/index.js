const cloud = require('wx-server-sdk')
const environment = 'test-j9lpk'

cloud.init({
    env: environment,
})

const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
    const { list, total, tableID, timePart, timeComplete, OPENID } = event
    // 更新菜品销售量
    for (let i = 0; i < list.length; i++) {
        await db.collection('Dishes').doc(list[i].dishesId).update({
            data: {
                freq: _.inc(list[i].num)
            },
            success: () => { },
            fail: (e) => console.log(e)
        })
    }

    // 更新用户积分
    for (let i = 0; i < list.length; i++) {
        await db.collection('members').where({ OPENID }).update({
            data: {
                integral: _.inc(list[i].num * list[i].scores)
            },
            success: () => { },
            fail: (e) => console.log(e)
        })
    }

    return new Promise((resolve, reject) => {
        db.collection('DishedTable').add({
            data: {
                list,
                total,
                tableID,
                timePart,
                timeComplete
            },
            success: (res) => { resolve(res) },
            fail: (err) => { resolve(err) },
        })
    })
}