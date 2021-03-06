const app = getApp()
const db = wx.cloud.database()
let allData=[]
Page({
  data:{
    datalist:[],//所有公众号
    tip:false,
    inputValue: '', //搜索的内容
    search:[],      //搜索到的公众号
    afterclick:"",
    click:false,
    searchresult:false,
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
   for(var i=0;i<this.data.datalist.length;i++){
      if(this.data.datalist[i].name.indexOf(e.detail.value)!=-1){
        newlists.push(this.data.datalist[i])
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
    for(var i=0;i<this.data.datalist.length;i++){
      if(this.data.datalist[i].name==e.currentTarget.dataset.postname){
        this.setData({
          afterclick:this.data.datalist[i]
        })
      }
    }
    //console.log(this.data.datalist)
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
    if(allData.length==0){
      wx.cloud.callFunction({
        name:'getOfficialAccount',
        success(res){
          console.log("请求云函数成功",res)
          allData=res.result.data
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
    }else{
      that.setData({
        datalist: allData
      })
      wx.hideLoading()
    }
    
  },
  onLoad: function () {
    this.getData();
  },
  onShow: function (options) {
    
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },
  //点击查看公众号内容
  shortTap:function(e){
    var id = e.currentTarget.dataset.id;
    console.log(id)
    wx.navigateTo({
      url: '/pages/insert-official-account/insert-official-account?id='+id,
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '邀你查询佛大校园公众号',
      path: '/pages/index/index?toPage=official-account'
    }
  }
})