const app = getApp()
Page({
  data: {
    myClass:'abc',
    courseData:[],
    indexlist: [
      {
        imagePath: "/images/lunbotu/one.jpg",
      },
      {
        imagePath: "/images/lunbotu/two.jpg",
      },
      {
        imagePath: "/images/lunbotu/three.jpg",
      },
      {
        imagePath: "/images/lunbotu/four.jpg",
      },
      {
        imagePath: "/images/lunbotu/five.jpg",
      }
    ]
  },
  getUserInfo:function(){
    let that=this
    wx.cloud.callFunction({
      name: 'getUserInfo'
    }).then(res => {
      let info = res.result.info
      console.log(info)
      if (info && info.length > 0) {
        that.setData({
          myClass:info[0].myClass
        })
      }else{
        that.setData({
          myClass:''
        })
      }
    }).catch(res => {
      console.log(res)
      that.setData({
        myClass:''
      })
      wx.showToast({
        title: '网络异常',
        icon: 'none',
        duration: 1000
      })
    })
  },
  onLoad: function() {
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getUserInfo()
  },
  onShareAppMessage: function () {
    return {
      title: '佛大新生小助手'
    }
  }
})
