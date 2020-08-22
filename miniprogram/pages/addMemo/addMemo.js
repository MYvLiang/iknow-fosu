const app = getApp()
const db=wx.cloud.database()
Page({
  data: {
    date: '2020-01-01',
    maxTextLen: 20,
    textLen: 0
  },
  onLoad: function() {
      if(app.globalData.hasOwnProperty('openid')){
            //以前已经获取过openid，可以直接用
            console.log(app.globalData.openid)
          }else{
            //调用云函数，现在获取
            wx.cloud.callFunction({
              name: 'getOpenid',
              complete: res => {
                console.log('openid: ', res.result.openid)
              }
            })
            //获取openid成功后
            app.globalData['openid']=opneid
          }
    },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  //添加备忘
  addData(e) {
    var title=e.detail.value.title;
    var dimension = e.detail.value.dimension;
    let that=this
    var date = that.data.date;  //备忘日期
    console.log(title,dimension,date)
    if (!title && !dimension){
      wx.showToast({ title: "请输入备忘内容", icon:'none', duration: 2000 })
    }else{
      db.collection("memoList").add({
        data:{
          //openid:app.globalData.openid,
          title:title,
          dimension:dimension,
          date:date
        }
      }).then(e=>{
        console.log(e)
      }) 
  
      wx.switchTab({
        url: '/pages/memo/memo',
      }) 
    }
  },
  getWords(e){
    let page = this;
    let maxTextLen = page.data.maxTextLen;
    let textLen = e.detail.value.length;
    page.setData({
       maxTextLen: maxTextLen,
       textLen: textLen
    });
  }
})

