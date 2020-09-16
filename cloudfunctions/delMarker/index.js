// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'online-fosuapp'
})
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  await db.collection('markers').doc(event._id).remove()

  return {
    event
  }
}