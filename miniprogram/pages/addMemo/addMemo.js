const app = getApp()
const db=wx.cloud.database()
Page({
  data: {
    date: '2020-01-01',
    textLen: 0,
    textLen2: 0
  },
  onLoad: function() {
    let d=new Date()
    let month=(d.getMonth()+1)
    let m='-'+month
    if(month<10){
      m='-0'+month
    }
    let date=d.getDate()
    let dateStr='-'+date
    if(date<10){
      dateStr='-0'+date
    }
    this.setData({
      date: d.getFullYear()+m+dateStr
    })
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  //添加日程
  addData(e) {
    var title=e.detail.value.title;
    var dimension = e.detail.value.dimension;
    let that=this
    var date = that.data.date;  //日程日期
    console.log(title,dimension,date)
    if (!title){
      wx.showToast({ title: "标题不能为空", icon:'none', duration: 2000 })
    }else{
      db.collection("memoList").add({
        data:{
          title:title,
          dimension:dimension,
          date:date
        }
      }).then(e=>{
        console.log(e)
        app.globalData.flushMemo=true
        wx.switchTab({
          url: '/pages/memo/memo',
        }) 
      }).catch(e=>{
        wx.showToast({ title: "网络异常，保存失败", icon:'none', duration: 2000 })
      })
    }
  },
  getWords(e){
    let textLen = e.detail.value.length;
    this.setData({
       textLen: textLen
    });
  },
  getWords2(e){
    let textLen2 = e.detail.value.length;
    this.setData({
      textLen2: textLen2
    });
  }
})

