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
  //添加备忘
  addData() {
    const DB = wx.cloud.database().collection("memoList")
    DB.add({
      data: {
        text: dimension
          
      }
    })
  },
})

Component({
  onShareAppMessage() {
    return {
      title: 'picker-view',
      path: 'page/component/pages/picker-view/picker-view'
    }
  },

  data: {

    uploaderList: [],
    uploaderNum: 0,
    showUpload: true,

    years,
    year: date.getFullYear(),
    months,
    month: date.getMonth() + 1,
    days,
    day: date.getDate(),
    value: [9999, 1, 1],
  },

  /**
   * 组件的属性列表
   */
  properties: {

    pickerShow: {
      type: Boolean, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: false, // 属性初始值（可选），如果未指定则会根据类型选择一个
      observer(newVal, oldVal, changedPath) {
        // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
        // 通常 newVal 就是新设置的数据， oldVal 是旧数据
      }
    },
    isShadow: {
      type: Boolean,
      value: true,
      observer(newVal, oldVal, changedPath) { }
    },
    range: {
      type: Array,
      value: []
    },
    title: {
      type: Array,
      value: []
    },
    value: {// picker-view 内的 picker-view-column 当前选择的是第几项
      type: Array,
      value: [30, 0, 0]
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    pickerHandler() {// 控制弹出层显示隐藏
      this.setData({ pickerShow: !this.data.pickerShow })
    },
    bindChange(e) {

      const val = e.detail.value
      this.setData({
        value: val,
        year: this.data.years[val[0]],
        month: this.data.months[val[1]],
        day: this.data.days[val[2]],
      })
      /*
            const val = e.detail.value
            this.setData({ value: val })
            let arr = []
            this.data.range.forEach((v, i) => {
              arr.push(v[this.data.value[i]])
            })
            this.triggerEvent('change', arr, {})
      */

    },
    pickerFinish() {// 滚动选择器 - 完成
      let arr = []
      this.data.range.forEach((v, i) => {
        arr.push(v[this.data.value[i]])
      })
      this.pickerHandler()
      this.triggerEvent('finish', arr, {})
    },
    pickerCancel() {// 滚动选择器 - 取消
      this.pickerHandler()
      this.triggerEvent('cancel', arr, {})
    },

    // 删除图片
    clearImg: function (e) {
      var nowList = [];//新数据
      var uploaderList = this.data.uploaderList;//原数据

      for (let i = 0; i < uploaderList.length; i++) {
        if (i == e.currentTarget.dataset.index) {
          continue;
        } else {
          nowList.push(uploaderList[i])
        }
      }
      this.setData({
        uploaderNum: this.data.uploaderNum - 1,
        uploaderList: nowList,
        showUpload: true
      })
    },
    //展示图片
    showImg: function (e) {
      var that = this;
      wx.previewImage({
        urls: that.data.uploaderList,
        current: that.data.uploaderList[e.currentTarget.dataset.index]
      })
    },
    //上传图片
    upload: function (e) {
      var that = this;
      wx.chooseImage({
        count: 9 - that.data.uploaderNum, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          console.log(res)
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          let tempFilePaths = res.tempFilePaths;
          let uploaderList = that.data.uploaderList.concat(tempFilePaths);
          if (uploaderList.length == 9) {
            that.setData({
              showUpload: false
            })
          }
          that.setData({
            uploaderList: uploaderList,
            uploaderNum: uploaderList.length,
          })
        }
      })
    },
    onLoad: function () { }



  }
})
