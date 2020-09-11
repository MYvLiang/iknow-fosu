// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let status=false
  let myCourseData = await db.collection('myCourse').where({
    openid: wxContext.OPENID,
    myClass: event.myClass,
    term: event.term
  }).get()
  if(myCourseData.data.length > 0){
    //update
    await db.collection('myCourse')
      .where({
        openid: wxContext.OPENID,
        myClass: event.myClass,
        term: event.term
      })
      .update({
        data:{
          beizhu:event.beizhu,
          coursesList:event.coursesList
        }
      }).then(res=>{
        status=true
      })
  }else{
    //add
    await db.collection('myCourse').add({
      data:{
        openid:wxContext.OPENID,
        myClass: event.myClass,
        term: event.term,
        beizhu:event.beizhu,
        coursesList:event.coursesList
      }
    }).then(res=>{
      status=true
    })
  }
  return {
    status
  }
}