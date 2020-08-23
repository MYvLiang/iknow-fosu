// miniprogram/pages/club/club.js
// 连接数据库
 //const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //  inputShowed: false,
    //  inputVal: "",
     dataClub:" "
  },
  // 查询
  /*
  getData() {
     db.collection("clubList").get()
       .then(res => {
         console.log(res)
       })
   },*/
   //添加数据
   /*
  addData() {
    db.collection("clubList").add({
      data: {
        name: "土木工作室",
        jieshao: "一个以学校为根据地，以社会实践为目的的大学生团体。",
        school: "仙溪校区",
        pic: "cloud://develop-fx3l0.6465-develop-fx3l0-1301738912/club/tumu-logo.jpg	"
      }
    }).then(res => {
      console.log(res)
    })
  },*/


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.cloud.callFunction({
    //   name:"getList"
    // })
    // .then(res=>{
    //   console.log(res)
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  // 获取云数据
  onShow: function () {
     let that = this
     wx.cloud.callFunction({
       name:'getList',
       success(res){
         console.log("请求云函数成功", res)
         that.setData({
           dataClub:res.result.data
         })
         console.log(that.data.dataClub)
       },
       fail(res){
         wx.showToast({
           title: '获取数据失败',icon:'none',duration:2000
         })
         console.log("请求云函数失败",res)
       }
     })
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
