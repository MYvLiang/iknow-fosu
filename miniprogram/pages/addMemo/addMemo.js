const db=wx.cloud.database()
Page({
  data: {

    //index: 0,
    date: '2020-01-01',
    //customItem: '全部'
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
    var date=this.detail.value.date;
    //var year=e.detail.value.year;
    console.log(title,dimension,date)
    /*db.collection("memoList").add({
      data:{
        title:title,
        dimension:dimension
      }
    }).then(e=>{
      console.log(e)
    })*/
  }
})

