const db = wx.cloud.database()
var id
Page({
  data:{
    datalist:[],
    editid:'',
    tip:false
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
    console.log('edid:',this.data.editid)
    db.collection('officialAccountList').doc(id).get().then(res => {
      // res.data 包含该记录的数据
      console.log(res.data)
      that.setData({
        datalist: res.data,
        urls:res.data.pic
      })
    })
  },
  //放大预览图片
  preview(e){
    let currentUrl=e.currentTarget.dataset.src
    let urls=[]
    urls=urls.concat(currentUrl)
    console.log(currentUrl)
    let that=this
    wx.previewImage({
      current: currentUrl, // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
    })
  },
})