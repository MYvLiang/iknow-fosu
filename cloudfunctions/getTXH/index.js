// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'online-fosuapp'
})
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  let data=await db.collection("tongxianghui").get()
  return {
    data
  }
}