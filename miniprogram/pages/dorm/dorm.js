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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
      title: '佛大新生小助手--宿舍安排查询'
    }
  }
})