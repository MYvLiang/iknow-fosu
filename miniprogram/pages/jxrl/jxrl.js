const db = wx.cloud.database()
Page({
  data: {
    loadImg:true,
    myterm:'',
    mytermImg:'',
    terms:[''],
    termsIndex:0,
    termsImgObject:{},
  },
  
  //切换学年
  bindPickerChange: function(e) {
    let termsIndex=e.detail.value
    let term=this.data.terms[termsIndex]
    let termImgObject=this.data.termsImgObject
    let termsImg=termImgObject[term]
    console.log(termsIndex,term,termImgObject,termsImg)
    this.setData({
      termsIndex,
      termsImg,
      myterm:term,
      mytermImg:termsImg
    })
    

  /*   console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    }) */
  },
  
  //放大预览图片
  preview(e){
    let currentUrl=e.currentTarget.dataset.src
    // console.log(currentUrl)
    // console.log(Object.values(this.data.termsImgObject))
    let that=this
    wx.previewImage({
      current: currentUrl, // 当前显示图片的http链接
      urls: Object.values(that.data.termsImgObject).reverse() // 需要预览的图片http链接列表
    })
  },
  loadImage(e){
    wx.hideLoading()
  },
  loadImageErr(e){
    this.setData({
      loadImg:false
    })
    wx.hideLoading()
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    
    let that = this
    let terms=[]
    let termsImgObject={}
    db.collection('termCalendar')
      .doc('termCalendar123456')
      .get().then(res => {
        console.log(res.data)
        terms=res.data.term;
        termsImgObject=res.data.termImg
        that.setData({
          terms:terms,
          termsImgObject:termsImgObject,
          myterm:terms[0],
          mytermImg:termsImgObject[terms[0]]
        })
      }).catch(e=>{
        that.setData({
          loadImg:false
        })
        wx.hideLoading()
      })
      
  },
  onShareAppMessage: function () {
    return {
      title: '邀你查看佛大教学周历',
      path: '/pages/index/index?toPage=jxrl'
    }
  }
})