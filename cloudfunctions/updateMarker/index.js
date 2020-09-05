// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  let result={}
  await db.collection('markers').doc(event._id).update({
    data: {
      callout:{
        content: event.content
      }
    },
    success: function(res) {
      result=res
    }
  })

  return {
    result
  }
}