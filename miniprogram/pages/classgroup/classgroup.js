// miniprogram/pages/classgroup/classgroup.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: '',
    search:[],
    all:[],
    click:false,
    afterclick:""
  },

  getinputvalue(e){
    this.setData({
      inputValue: e.detail.value
    })
    if(e.detail.value != this.data.afterclick.college){
      this.setData({
        click:false
      })
    }
    var newlists = new Array();
   for(var i=0;i<this.data.all.length;i++){
      if(this.data.all[i].college.indexOf(e.detail.value)!=-1){
        newlists.push(this.data.all[i])
      }
    }
    this.setData({
      search:newlists
    })
    if(e.detail.value!=""){
      this.setData({
        searchresult: true,
      })
    };
    if(e.detail.value==""){
      this.setData({
        searchresult: false,
      })
    };
  },
  searchbegin:function(e){
    this.setData({
      searchresult:false,
      inputValue:e.currentTarget.dataset.postname,
      click:true,
      afterclick:""
    })
    for(var i=0;i<this.data.all.length;i++){
      if(this.data.all[i].college==e.currentTarget.dataset.postname){
        this.setData({
          afterclick:this.data.all[i]
        })
      }
    }
    //console.log(this.data.all)
  },
  


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    db.collection("college").get({
      success:res=>{
        console.log(res)
        this.setData({
          all:res.data
        })
      }
    })
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
      title: '佛大新生小助手--组织群查询',
      path: '/pages/index/index?toPage=classgroup'
    }
  }
})
