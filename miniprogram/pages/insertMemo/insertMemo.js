const db = wx.cloud.database()
var id
Page({
  data:{
    datalist:[],
    editid:''
  },
  onLoad: function(options) {
    id = options.id
  },
  onShow:function(e){
    let that = this
    //console.log('edid:',editid)
    console.log('id:',id)
    this.setData({
      editid:id
    })
    console.log('edid:',this.data.editid)
    db.collection('memoList').doc(id).get().then(res => {
      // res.data 包含该记录的数据
      console.log(res.data)
      that.setData({
        datalist: res.data
      })
    })
  },
  shortTap:function(e){
    let that=this
    wx.navigateTo({
      url: '/pages/editMemo/editMemo?id='+that.data.editid,
    })
  },
})