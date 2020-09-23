// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'online-fosuapp'
})
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  let info = await db.collection('userInfo').where({
    openid: wxContext.OPENID
  }).get()
  let type = ''
  let result={}
  if (info.data.length > 0) {
    type = 'update'
    if(info.data[0].count>9){
      result={
        count:true
      }
    }else{
      if(!info.data[0].count){
        info.data[0].count=2
      }else{
        info.data[0].count=info.data[0].count+1
      }
      result=await db.collection('userInfo')
      .where({
        openid: wxContext.OPENID
      })
      .update({
        data: {
          myClass: event.myClass,
          myDepartment: event.myDepartment,
          myGrade: event.myGrade,
          userInfo:event.userInfo,
          count:info.data[0].count
        }
      })
    }
    
  } else {
    type = 'add'
    result=await db.collection('userInfo').add({
      data: [
        {
          myClass: event.myClass,
          openid: wxContext.OPENID,
          myDepartment: event.myDepartment,
          myGrade: event.myGrade,
          userInfo:event.userInfo,
          count:1
        }
      ]
    })
  }
  return {
    openid: wxContext.OPENID,
    type,
    result,
    info
  }
}