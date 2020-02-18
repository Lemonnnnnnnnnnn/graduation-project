const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

exports.main = async () => {
    // 人1000随机
    const randomSum = Math.round(Math.random() * 1000)
    // 评分5随机整数
    const randomScores = Math.round(Math.random() * 5)
    // 价格10-20随机
    const randomPrice = Math.round(Math.random() * 10 + 10)
    // 平均价1-5随机浮点数
    const average = (Math.random() * 5).toFixed(1)
    db.collection('Dishes').add({
        data: {
            'dishname': '绿海土豆烧牛肉',
            'freq': randomSum,
            'scores': randomScores,
            'average': average,
            'dishphoto': 'https://cbu01.alicdn.com/img/ibank/2020/531/889/13118988135_518461333.220x220.jpg',
            'dishprice': randomPrice
        },
        success: (res) => { return res },
        fail: (err) => { return err }
    })
}