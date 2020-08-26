// miniprogram/pages/organization/organization.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //  搜索框9-10
    // inputShowed: false,
    // inputVal: ""
    // 搜索框
    // 顶部tab栏
    tab:['校级', '数学', '电子','环化',"人文"],
    active:0
  },
  //改变active的值
  change:function(e){
    //console.log(e.currentTarget.dataset.organization)
    this.setData({
       active:e.currentTarget.dataset.organization
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

  },
  
  // 搜索框 四个函数
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  }
  // 搜索框 四个函数
})

