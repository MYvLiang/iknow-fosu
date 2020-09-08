// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
var xlsx = require('node-xlsx');

exports.main = async (event, context) => {
  let fileID = event.fileID
  const res = await cloud.downloadFile({
    fileID: fileID,
  })
  var sheets = xlsx.parse(res.fileContent); 
  return sheets[0]
}