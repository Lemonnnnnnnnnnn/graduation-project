// 引用微信服务npm库 定义云开发环境变量
const cloud = require('wx-server-sdk')
const environment = 'test-j9lpk'

// 初始化云开发服务
cloud.init({
    env: environment,
})

// 定义数据库和查询指令变量
const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
    // 从event中可以读到传递过来的变量
    const { list, total, tableID, timePart, timeComplete, OPENID } = event

    // 将数据添加到菜单表
    await db.collection('DishedTable').add({
        data: {
            list,
            total,
            tableID,
            timePart,
            timeComplete
        }
    }).then(async () => {
        if (OPENID) {
            for (let i = 0; i < list.length; i++) {
                await db.collection('members').where({ OPENID }).update({
                    data: {
                        integral: _.inc(list[i].num * list[i].scores)
                    },
                    success: () => { },
                    fail: (e) => console.log('失败')
                })
            }
        }

        for (let i = 0; i < list.length; i++) {
            await db.collection('Dishes').doc(list[i].dishesId).update({
                data: {
                    freq: _.inc(list[i].num)
                },
                success: () => { },
                fail: (e) => console.log('失败')
            })
        }
        return '成功'
    })
}

        // success: (res) => {
            // 更新用户积分
            // 遍历list，从数据库中找到下单的用户，更新用户积分

            // 更新菜品销售量
            // 遍历list，从数据库中找到目标id的菜品，执行数量增加操作

        //     resolve(res)
        // }
        // fail: (err) => {
        //     resolve(err)
        // }