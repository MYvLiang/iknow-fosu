const date = new Date()
const years = []
const months = []
const days = []

for (let i = 1990; i <= 9999; i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
}

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
    //const DB = wx.cloud.database().collection("memoList")
    var title=e.detail.value.title;
    var dimension = e.detail.value.dimension;
    //var year=e.detail.value.year;
    console.log(title,dimension)
    /*
    DB.add({
      data: {
        text: dimension
          
      }
    })*/
  },
})

