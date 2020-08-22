const db = wx.cloud.database()
var updateid="";
Page({
data:{
  datalist:[]

},
  onLoad: function(options) {
    let that = this
    var id = options.id
    updateid = id
    //console.log(id)
    db.collection('memoList').doc(id).get().then(res => {
      // res.data 包含该记录的数据
      console.log(res.data)
      that.setData({
        datalist: res.data
      })
    })
    //console.log(datalist)
  },
  //备忘日期
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  //更新备忘
  editData(e){
    var title = e.detail.value.title;
    var dimension = e.detail.value.dimension;
    let that = this
    var date = that.data.date;  //备忘日期
    console.log(title, dimension, date, updateid)
    db.collection("memoList").doc(updateid).update({
      data:{
        title: title,
        dimension: dimension,
        date: date
      }
    }).then(res=>{
      console.log(res)
    })
    wx.switchTab({
      url: '/pages/memo/memo',
    })
  }

})