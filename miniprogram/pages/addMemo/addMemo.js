const db=wx.cloud.database()
Page({
  data: {
    date: '2020-01-01',
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
    
    db.collection("memoList").add({
      data:{
        title:title,
        dimension:dimension,
        date:date
      }
    }).then(e=>{
      console.log(e)
    })
    //const url="pages/memo/memo";
    wx.switchTab({
      url: '/pages/memo/memo',
    })
  }
})

