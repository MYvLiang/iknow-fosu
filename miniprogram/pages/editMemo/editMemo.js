const db = wx.cloud.database()
const app = getApp()
var updateid="";
Page({
data:{
  datalist:{},
  date:'',
  textLen: 0,
  textLen2: 0
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
        datalist: res.data,
        date:res.data.date,
        textLen:res.data.title.length,
        textLen2:res.data.dimension.length
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
    if (!title || !dimension){
      wx.showToast({ title: "备忘不能为空", icon:'none', duration: 2000 })
    }else{
      db.collection("memoList").doc(updateid).update({
        data:{
          title: title,
          dimension: dimension,
          date: date
        }
      }).then(res=>{
        console.log(res)
        app.globalData.flushMemo=true
        wx.navigateBack({
          delta: 1
        })
      }).catch(e=>{
        console.log(e)
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