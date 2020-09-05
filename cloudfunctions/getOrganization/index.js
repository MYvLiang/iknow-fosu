const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  //直接返回调取结果。
  return cloud.database().collection("organization").get({
    success(res) {
      return res
    },
    fail(err) {
      return err
    }
  })
}
