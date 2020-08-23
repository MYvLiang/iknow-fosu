const app = getApp()
Page({
  data: {
    myClass: 'abc',
    courseData: [],
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
    ]
  },
  getUserInfo: function () {
    let that = this
    wx.cloud.callFunction({
      name: 'getUserInfo'
    }).then(res => {
      let info = res.result.info
      console.log(info)
      if (info && info.length > 0) {
        that.setData({
          myClass: info[0].myClass
        })
      } else {
        that.setData({
          myClass: ''
        })
      }
    }).catch(res => {
      console.log(res)
      that.setData({
        myClass: ''
      })
      wx.showToast({
        title: '网络异常',
        icon: 'none',
        duration: 1000
      })
    })
  },
  loadImage:function(e){
    wx.hideLoading()
  },
  loadImageErr:function(e){
    wx.showToast({
      title: '系统异常',
      icon: 'none',
      duration: 2000
    })
  },
  onLoad: function () {
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
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
