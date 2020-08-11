// miniprogram/pages/course/course.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseData: [
      {
        name: 'c语言',
        teacher: '张老师',
        place: '基础楼206',
        weeks: [1, 2, 3, 4, 5, 6, 7, 8],
        date: 1,//1-7表示星期1-7
        time: [3,4,5]//1-13节
      },
      {
        name: 'c语言',
        teacher: '张老师',
        place: '会通楼311',
        weeks: [1, 2, 3, 4, 5, 6, 7, 8],
        date: 4,//1-7表示星期1-7
        time: [6,7]//1-13节
      },
      {
        name: '高等数学',
        teacher: '李老师',
        place: '会通楼411',
        weeks: [1, 2, 3, 4, 5, 6, 7, 8,9,10,11,12,13,14,15,16],
        date: 4,
        time: [6,7]
      }
    ]
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

  }
})