// miniprogram/pages/classgroup/classgroup.js
const db = wx.cloud.database()
let allData=[]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: '',
    search:[],
    all:[],
    click:false,
    afterclick:"",
    pic:[]
  },
  clearInput(e){
    this.setData({
      inputValue: '',
      click:false
    })
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
      afterclick:"",
      pic:[]
    })
    for(var i=0;i<this.data.all.length;i++){
      if(this.data.all[i].college==e.currentTarget.dataset.postname){
        this.setData({
          afterclick:this.data.all[i]
        })
      }
    }
    //console.log(this.currentTarget)
    console.log(this.data.afterclick)
    for(var j=0;j<this.data.afterclick.qun.length;j++){
      this.data.pic.push(this.data.afterclick.qun[j].pic)
    }
    for(var k=0;k<this.data.afterclick.zhuban.length;k++){
      this.data.pic.push(this.data.afterclick.zhuban[k].pic)
    }
    console.log(this.data.pic)
  },
  previewImage:function(e){
    var current = e.currentTarget.dataset.src
    console.log(current)
    wx.previewImage({
      current:current,
      urls:this.data.pic
    })
  },
  longPressSaveImg:function(e){
    var url =  e.currentTarget.dataset.src;
   //用户需要授权
   wx.getSetting({
    success: (res) => {
      if (!res.authSetting['scope.writePhotosAlbum']) {
        wx.authorize({
          scope: 'scope.writePhotosAlbum',
          success:()=> {
            // 同意授权
            this.saveImg1(url);
          },
          fail: (res) =>{
            console.log(res);
          }
        })
      }else{
        // 已经授权了
        this.saveImg1(url);
      }
    },
    fail: (res) =>{
      console.log(res);
    }
  })   
},
saveImg1(url){
  wx.getImageInfo({
    src: url,
    success:(res)=> {
      let path = res.path;
      wx.saveImageToPhotosAlbum({
        filePath:path,
        success:(res)=> { 
          console.log(res);
        },
        fail:(res)=>{
          console.log(res);
        }
      })
    },
    fail:(res)=> {
      console.log(res);
    }
  })
  },
 


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    if(allData.length==0){
      db.collection("classgroup").get().then(res=>{
        console.log(res)
        allData=res.data
        this.setData({
          all:res.data
        })
        wx.hideLoading()
      }).catch(res=>{
        wx.hideLoading()
        console.log(res)
        wx.showToast({
          title: '网络异常',
          icon: 'none',
          duration: 2000
        })
      })
    }else{
      this.setData({
        all:allData
      })
      wx.hideLoading()
    }
    
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
      title: '邀你查询佛大新生群',
      path: '/pages/index/index?toPage=classgroup'
    }
  }
})