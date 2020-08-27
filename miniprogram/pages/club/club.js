// miniprogram/pages/club/club.js
// 连接数据库
 //const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab: ['江湾校区', '仙溪校区', '河滨校区'],
    active: 0,
    jiangwan:[],
    xianxi:[],
    hebin:[],
    inputShowed: false,
    inputValue: "",
    search: [],
    all: [],
    click: false,
    afterclick: ""
    // dataClub:" "
  },
  //改变active的值
  change: function (e) {
    console.log(e.currentTarget.dataset.organization)
    this.setData({
      active: e.currentTarget.dataset.organization
    })
  },
  //搜索框获取信息并判断
  getinputvalue(e) {
    
    this.setData({
      inputValue: e.detail.value,
      active:3
    })
    if(e.detail.value==''){
      this.setData({
        active:0
      })
    }
    console.log(this.data.inputValue)
    if (e.detail.value != this.data.afterclick.name) {
      this.setData({
        click: false
      })
    }
    var newlists = new Array();
    for (var i = 0; i < this.data.all.length; i++) {
      if (this.data.all[i].name.indexOf(e.detail.value) != -1) {
        newlists.push(this.data.all[i])
      }
    }
    this.setData({
      search: newlists,
    })
    console.log(this.data.all)
    if (e.detail.value != "") {
      this.setData({
        searchresult: true,
      })
    };
    if (e.detail.value == "") {
      this.setData({
        searchresult: false,
      })
    };
  },
  searchbegin: function (e) {

    this.setData({
      searchresult: false,
      inputValue: e.currentTarget.dataset.postname,
      click: true,
      afterclick: ""
    })
    for (var i = 0; i < this.data.all.length; i++) {
      if (this.data.all[i].name == e.currentTarget.dataset.postname) {
        this.setData({
          afterclick: this.data.all[i]
        })
      }
    }
    console.log(this.currentTarget)
    console.log(this.data.afterclick)
  },

  // 查询
  /*getData() {
     db.collection("clubList").where({
       school:'仙溪校区'
     })
     .get()
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
  
  //点击事件 点击列表查看详情
  selectClub:function(e){
    // console.log(res.currentTarget)
    this.setData({
      searchresult: false,
      inputValue: e.currentTarget.dataset.postname,
      click: true,
      afterclick: ""
    })
  },

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
         var jw = new Array()
         var xx = new Array()
         var hb = new Array()
         for(var i=0;i<res.result.data.length;i++){
          if(res.result.data[i].school=="江湾校区"){
            console.log(res.result.data[i].school)
            
            jw.push(res.result.data[i])
           
          }
          if(res.result.data[i].school=="仙溪校区"){
           
            xx.push(res.result.data[i])
           
         }
         if(res.result.data[i].school=="河滨校区"){
         
          hb.push(res.result.data[i])
          
         }
        }
        that.setData({
          jiangwan:jw,
          xianxi:xx,
          hebin:hb
        })
        for(var i=0;i<that.data.jiangwan.length;i++){
          that.data.all.push(that.data.jiangwan[i])
        }
        for(var i=0;i<that.data.xianxi.length;i++){
          that.data.all.push(that.data.xianxi[i])
        }
        for(var i=0;i<that.data.hebin.length;i++){
          that.data.all.push(that.data.hebin[i])
        }
        console.log(that.data.all)
      
         /*that.setData({
           dataClub:res.result.data
         })
         console.log(that.data.dataClub)*/
         
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
