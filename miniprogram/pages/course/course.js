// miniprogram/pages/course/course.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showDialog: false,
    weeks:['周一','周二','周三','周四','周五','周六','周日'],
    colors:['#eccc68','#60a3bc','#079992','#2ed573','#a4b0be','#ff6b81','#3498db','#9b59b6','#ff7f50','#1abc9c','#d35400','#1e90ff'],
    time: [
      ['08:00', '08:40'],
      ['08:45', '09:25'],
      ['09:40', '10:20'],
      ['10:25', '11:05'],
      ['11:10', '11:50'],
      ['13:30', '14:10'],
      ['14:15', '14:55'],
      ['15:10', '15:50'],
      ['15:55', '16:35'],
      ['16:40', '17:20'],
      ['18:30', '19:10'],
      ['19:15', '19:55'],
      ['20:05', '20:45'],
      ['20:50', '21:30'],
    ],
    c:{
      term: "2018-2019-1",
      class: "17汉语言文学(师范)",
      classId: 2017041,
      name: "唐宋名篇选读唐宋名篇选名篇选读",
      teacher: "李婵娟,田欣欣 ", 
      place: "大成楼204", 
      weeks: [1, 3, 5, 7, 9, 11, 13, 15],
      day: 4, 
      beginTime: 1,
      endTime: 2
    },
    courses: [
      [
        {
          "term": "2018-2019-1",
          "class": "17汉语言文学(师范)",
          "name": "唐宋名篇选读唐宋名篇选名篇选读",
          "teacher": "李婵娟,田欣欣 ", 
          "place": "基础楼204", 
          "weeks": [1, 2, 3, 4, 5, 6, 7, 8,9,10,11,12,13,16,15,16],
          "date": 1, 
          "beginTime": 1,
          "endTime": 2,
          "time": [1, 2]
        },
        { "term": "2018-2019-1", "class": "17汉语言文学(师范)", "name": "gfsdgsrdfgsfgregsergsrgsrgsrg", "teacher": "fsfgsgrgsregrgsegsergse ", "place": "c6-103", "weeks": [1, 2, 3, 4, 5, 6, 7, 8], "date": 1, "time": [3, 5] },
        { "term": "2018-2019-1", "class": "17汉语言文学(师范)", "name": "唐宋名篇选读3", "teacher": "李婵娟,田欣欣 ", "place": "c6-103", "weeks": [1, 2, 3, 4, 5, 6, 7, 8], "date": 1, "time": [6, 7] }
      ],
      [
        { "term": "2018-2019-1", "class": "17汉语言文学(师范)", "name": "唐宋名篇选读1", "teacher": "李婵娟,田欣欣 ", "place": "c6-103", "weeks": [1, 2, 3, 4, 5, 6, 7, 8], "date": 2, "time": [1, 2] },
        { "term": "2018-2019-1", "class": "17汉语言文学(师范)", "name": "唐宋名篇选读2", "teacher": "李婵娟,田欣欣 ", "place": "c6-103", "weeks": [1, 2, 3, 4, 5, 6, 7, 8], "date": 2, "time": [3, 5] },
        { "term": "2018-2019-1", "class": "17汉语言文学(师范)", "name": "唐宋名篇选读3", "teacher": "李婵娟,田欣欣 ", "place": "c6-103", "weeks": [1, 2, 3, 4, 5, 6, 7, 8], "date": 2, "time": [6, 7] }
      ],
      [
        { "term": "2018-2019-1", "class": "17汉语言文学(师范)", "name": "唐宋名篇选读1", "teacher": "李婵娟,田欣欣 ", "place": "c6-103", "weeks": [1, 2, 3, 4, 5, 6, 7, 8], "date": 3, "time": [6, 7] },
        { "term": "2018-2019-1", "class": "17汉语言文学(师范)", "name": "唐宋名篇选读2", "teacher": "李婵娟,田欣欣 ", "place": "c6-103", "weeks": [1, 2, 3, 4, 5, 6, 7, 8], "date": 3, "time": [8, 10] },
        { "term": "2018-2019-1", "class": "17汉语言文学(师范)", "name": "唐宋名篇选读3", "teacher": "李婵娟,田欣欣 ", "place": "c6-103", "weeks": [1, 2, 3, 4, 5, 6, 7, 8], "date": 3, "time": [11, 12] }
      ],
      [
        { "term": "2018-2019-1", "class": "17汉语言文学(师范)", "name": "唐宋名篇选读1", "teacher": "李婵娟,田欣欣 ", "place": "c6-103", "weeks": [1, 2, 3, 4, 5, 6, 7, 8], "date": 4, "time": [8, 10] },
        { "term": "2018-2019-1", "class": "17汉语言文学(师范)", "name": "唐宋名篇选读2", "teacher": "李婵娟,田欣欣 ", "place": "c6-103", "weeks": [1, 2, 3, 4, 5, 6, 7, 8], "date": 4, "time": [11, 12] },
        { "term": "2018-2019-1", "class": "17汉语言文学(师范)", "name": "唐宋名篇选读3", "teacher": "李婵娟,田欣欣 ", "place": "c6-103", "weeks": [1, 2, 3, 4, 5, 6, 7, 8], "date": 4, "time": [13, 14] }
      ],
      [
        { "term": "2018-2019-1", "class": "17汉语言文学(师范)", "name": "唐宋名篇选读1", "teacher": "李婵娟,田欣欣 ", "place": "c6-103", "weeks": [1, 2, 3, 4, 5, 6, 7, 8], "date": 5, "time": [3, 5] },
        { "term": "2018-2019-1", "class": "17汉语言文学(师范)", "name": "唐宋名篇选读2", "teacher": "李婵娟,田欣欣 ", "place": "c6-103", "weeks": [1, 2, 3, 4, 5, 6, 7, 8], "date": 5, "time": [11, 12] },
        { "term": "2018-2019-1", "class": "17汉语言文学(师范)", "name": "唐宋名篇选读3", "teacher": "李婵娟,田欣欣 ", "place": "c6-103", "weeks": [1, 2, 3, 4, 5, 6, 7, 8], "date": 5, "time": [1, 2] }
      ],
      [],
      [],
    ],
    selectCourse:{}
  },
  bindtapCourse:function(e){
    console.log(e)
    this.setData({
      showDialog:true,
      selectCourse:e.currentTarget.dataset.course
    })    
  },
  closeDialog:function(e){
    this.setData({
      showDialog:false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})