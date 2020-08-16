const db = wx.cloud.database()
Page({
  data:{
    datalist:[]
  },
  onLoad: function(options) {
    let that = this
    var id = options.id
    //console.log(id)
    db.collection('memoList').doc(id).get().then(res => {
      // res.data 包含该记录的数据
      console.log(res.data)
      that.setData({
        datalist: res.data
      })
    })
  }
})