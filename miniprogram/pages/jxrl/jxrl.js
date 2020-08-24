const db = wx.cloud.database()
Page({
  data: {
    loadImg:true,

    myterm:'2020-2021第一学期',
    mytermImg:'cloud://develop-fx3l0.6465-develop-fx3l0-1301738912/images/calendar/2020_2021_1.jpg',
    terms:['2020-2021第一学期'],
    termsIndex:0,
    termsImgObject:{},
    termsImg:['cloud://develop-fx3l0.6465-develop-fx3l0-1301738912/images/calendar/2020_2021_1.jpg'],
    termsImgIndex:0,

    /* array: ['cloud://develop-fx3l0.6465-develop-fx3l0-1301738912/images/calendar/2020_2021_1.jpg', 
    'cloud://develop-fx3l0.6465-develop-fx3l0-1301738912/images/calendar/2019_2020_2.png', 
    'cloud://develop-fx3l0.6465-develop-fx3l0-1301738912/images/calendar/2019_2020_1.jpg', 
    'cloud://develop-fx3l0.6465-develop-fx3l0-1301738912/images/calendar/2018_2019_2.jpg',
    'cloud://develop-fx3l0.6465-develop-fx3l0-1301738912/images/calendar/2018_2019_1.jpg',
    'cloud://develop-fx3l0.6465-develop-fx3l0-1301738912/images/calendar/2017_2018_2.png',
    'cloud://develop-fx3l0.6465-develop-fx3l0-1301738912/images/calendar/2017_2018_1.png'],
    array1: ['2020-2021第一学期', '2019-2020第二学期', '2019-2020第一学期', '2018-2019第二学期', '2018-2019第一学期',
    '2017-2018第二学期', '2017-2018第一学期'],
    objectArray: [
      {
        id: 0,
        name: '2020-2021第一学期'
      },
      {
        id: 1,
        name: '2019-2020第二学期'
      },
      {
        id: 2,
        name: '2019-2020第一学期'
      },
      {
        id: 3,
        name: '2018-2019第二学期'
      },
      {
        id: 4,
        name: '2018-2019第一学期'
      },
      {
        id: 5,
        name: '2017-2018第二学期'
      },
      {
        id: 6,
        name: '2017-2018第一学期'
      },
    ],
    index: 0, */
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
    console.log(currentUrl)
    let that=this
    wx.previewImage({
      current: currentUrl, // 当前显示图片的http链接
      urls: Object.values(that.data.termsImgObject) // 需要预览的图片http链接列表
    })
  },
  loadImage(e){
    wx.hideLoading()
  },
  loadImageErr(e){
    this.setData({
      loadImg:false
    })
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)

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
        })
      })
      console.log(termsImgObject)
  },
  onShareAppMessage: function () {
    return {
      title: '佛大新生小助手--佛大周历',
    }
  }
})