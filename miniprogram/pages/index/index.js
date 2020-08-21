const app = getApp()
Page({
  data: {
    indexlist: [
      {
        imagePath: "cloud://develop-fx3l0.6465-develop-fx3l0-1301738912/images/lunbotu/one.jpg",
      },
      {
        imagePath: "cloud://develop-fx3l0.6465-develop-fx3l0-1301738912/images/lunbotu/two.jpg",
      },
      {
        imagePath: "cloud://develop-fx3l0.6465-develop-fx3l0-1301738912/images/lunbotu/three.jpg",
      },
      {
        imagePath: "cloud://develop-fx3l0.6465-develop-fx3l0-1301738912/images/lunbotu/four.jpg",
      },
      {
        imagePath: "cloud://develop-fx3l0.6465-develop-fx3l0-1301738912/images/lunbotu/five.jpg",
      }
    ],
    courselist:[],
    date:'2020-'
  },
  onLoad: function() {
    //获取课程数据
    wx.cloud.callFunction({
      name:'getCourse',
      data:{
        myClass:'18数据科学与大数据技术3',
        term:'2019-2020-2',
      },success:function(res){
        console.log(res)

      },fail:function(res){
        console.log(res)
      }
    })




      /* if(app.globalData.hasOwnProperty('openid')){
            //以前已经获取过openid，可以直接用
            console.log(app.globalData.openid)
          }else{
            //调用云函数，现在获取
            wx.cloud.callFunction({
              name: 'getOpenid',
              complete: res => {
                console.log('openid: ', res.result.openid)
              }
            })
            //获取openid成功后
            app.globalData['openid']=opneid
          } */
    }

})
