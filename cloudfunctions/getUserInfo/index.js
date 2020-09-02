// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let info = await db.collection('userInfo').where({
    openid: wxContext.OPENID
  }).get()
  return {
    openid: wxContext.OPENID,
    info:info.data
  }
}