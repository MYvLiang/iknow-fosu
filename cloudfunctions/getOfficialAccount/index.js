// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  /* return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
 */
  return db.collection('officialAccountList').get({
    success(e) {
      console.log('获取数据成功')
      return e
    },
    fail(err) {
      return err
    }
  })
}