const app = getApp()
const db = wx.cloud.database()
Page({
  data:{
    datalist:[],
    tip:false,
    select:-1
  },
  //获取云数据库数据
  getData:function(e){
    let that = this
    this.setData({
      tip:false
    })
    wx.showLoading({
      title: '加载数据',
    })
    setTimeout(function () {
      that.setData({
        tip:true
      })
      wx.hideLoading()
    }, 2000)
    
    wx.cloud.callFunction({
      name:'getMemo',
      success(res){
        console.log("请求云函数成功",res)
        that.setData({
          datalist: res.result.data,
          tip:true
        })
        wx.hideLoading()
        //console.log(that.data.datalist)
        },
      fail(res) {
        wx.hideLoading()
        wx.showToast({ title: "获取数据失败", icon:'none', duration: 2000 })
        console.log("请求云函数失败", res)
        }
    })
  },
  onLoad: function () {
    this.getData();
    app.globalData.flushMemo=false
  },
  onShow: function (options) {
    console.log('刷新:',app.globalData.flushMemo)
    if(app.globalData.flushMemo){
      this.getData();
    }
    this.setData({
      select:-1
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    app.globalData.flushMemo=false
  },
  //点击查看日程内容
  shortTap:function(e){
    var id = e.currentTarget.dataset.id;
    console.log(id)
    wx.navigateTo({
      url: '/pages/insertMemo/insertMemo?id='+id,
    })
  },

  //长按弹出选择框
  longPress:function(e){
    // wx.hideTabBar();
    var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    console.log(id)
    let that = this
    this.setData({
      select:index
    })
    wx.showActionSheet({
      itemList: ['查看','编辑','删除'],
      success(res){
        if(res.tapIndex==0){
          // wx.showTabBar();
          wx.navigateTo({
            url: '/pages/insertMemo/insertMemo?id='+id,
          })
        }
        if (res.tapIndex == 1){
          // wx.showTabBar();
          //点击编辑跳转页面
          wx.navigateTo({
            url: '/pages/editMemo/editMemo?id='+id,
          })
        }
        if(res.tapIndex==2){
          // wx.showTabBar();
          //删除操作
          wx.showModal({
            content: '确定删除该条日程？',
            success (res) {
              if (res.confirm) {
                db.collection("memoList").doc(id).remove().then(res=>{
                  that.getData()
                  console.log(res)
                  console.log("成功删除数据")
                  
                })
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
              that.setData({
                select:-1
              })
            }
          })
          console.log("点击了删除");
          
        }
      },
      fail(res){
        console.log("点击了取消")
        // wx.showTabBar();
        that.setData({
          select:-1
        })
      }
    })
  }
})