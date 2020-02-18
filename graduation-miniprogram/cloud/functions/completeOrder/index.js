const cloud = require('wx-server-sdk')
const environment = 'test-j9lpk'

cloud.init({
    env: environment,
})

const db = cloud.database()

exports.main = async (event, context) => {
    const { _id } = event
    let targetData = null

    // 将指定数据添加至回收站（增加完成时间）
    await db.collection('DishedTable').doc(_id)
        .get()
        .then(res => targetData = res)

    return targetData

    // 删除指定数据
    // return new Promise((resolve, reject) => {
    //     db.collection('DishedTable').doc(_id).remove({
    //         success: () => { resolve('删除成功') },
    //         fail: () => { resolve('删除失败') },
    //     })
    // })

}