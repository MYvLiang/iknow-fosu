// miniprogram/pages/dorm/dorm.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  openTip:function(e){
    wx.showModal({
      title: '',
      content: '请前往易班使用，或复制网址在浏览器或微信中打开',
      confirmText:'复制网址',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.setClipboardData({
            data: 'http://47.107.38.172:8080/gateway/xsyz/index.html',
            success(res) {
              console.log('复制成功')
            }
          })
          
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  toIndex:function(e){
    wx.switchTab({
      url: '/pages/index/index'
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '邀你使用佛大新生小助手查询宿舍安排',
      path: '/pages/index/index?toPage=dorm'
    }
  }
})