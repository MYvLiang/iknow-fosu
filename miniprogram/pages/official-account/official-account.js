const app = getApp()
const db = wx.cloud.database()
Page({
  data:{
    datalist:[],
    tip:false
  },

/*   //添加数据
  addData(e) {
    var name=e.detail.value.name;
    var logo = e.detail.value.logo;
    var about = e.detail.value.about;
    var pic = e.detail.value.pic;
    let that=this
    console.log(name,logo,about,pic)
    db.collection("officialAccountList").add({
      data:{
        name,
        logo,
        about,
        pic,
      }
    }).then(e=>{
      console.log(e)
    })
  }, */


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
      name:'getOfficialAccount',
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
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    app.globalData.flushMemo=false
  },
  //点击查看公众号内容
  shortTap:function(e){
    var id = e.currentTarget.dataset.id;
    console.log(id)
    wx.navigateTo({
      url: '/pages/insert-official-account/insert-official-account?id='+id,
    })
  },
})