const app = getApp()
const db = wx.cloud.database()
async function getOpenid(){
    if(!app.globalData.hasOwnProperty('openid')){
      //以前没获取过，现在获取
      let res=await wx.cloud.callFunction({
        name:'getOpenid',
      })
      app.globalData['openid']=res.result.openid
    }
    return app.globalData.openid
  }
Page({
  data:{
    datalist:[]
  },
  //获取云数据库数据
  onShow: function (options) {
    let that = this
    wx.cloud.callFunction({
      name:'getMemo',
      success(res){
        console.log("请求云函数成功",res)
        that.setData({
          datalist: res.result.data
        })
        //console.log(that.data.datalist)
        },
      fail(res) {
        wx.showToast({ title: "获取数据失败", icon:'none', duration: 2000 })
        console.log("请求云函数失败", res)
        }
    })
  },

  //点击查看备忘录内容
  shortTap:function(e){
    var id = e.currentTarget.dataset.id;
    console.log(id)
    wx.navigateTo({
      url: '/pages/insertMemo/insertMemo?id='+id,
    })
  },

  //长按弹出选择框
  longPress:function(e){
    wx.hideTabBar();
    var id = e.currentTarget.dataset.id;
    console.log(id)
    let that = this
    wx.showActionSheet({
      itemList: ['查看','编辑','删除'],
      success(res){
        if(res.tapIndex==0){
          wx.showTabBar();
          wx.navigateTo({
            url: '/pages/insertMemo/insertMemo?id='+id,
          })
        }
        if (res.tapIndex == 1){
          wx.showTabBar();
          //点击编辑跳转页面
          wx.navigateTo({
            url: '/pages/editMemo/editMemo?id='+id,
          })
        }
        if(res.tapIndex==2){
          wx.showTabBar();
          //删除操作
          wx.showModal({
            content: '确定删除该条备忘？',
            success (res) {
              if (res.confirm) {
                db.collection("memoList").doc(id).remove().then(res=>{
                  console.log(res)
                  console.log("成功删除数据")
                })
                that.onShow();
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
          console.log("点击了删除");
          that.onShow();
        }
      },
      fail(res){
        console.log("点击了取消")
        wx.showTabBar();
      }
    })
  }
})