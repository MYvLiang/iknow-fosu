//index.js
//获取应用实例
const db = wx.cloud.database()
const opinions = db.collection('opinions')
const app = getApp()
Page({
  data: {
    uploaderList: [],
    uploaderNum: 0,
    showUpload: true,
    title: "",
    details: "",
    imglist: [],
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
      showUpload: true,
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
      count: 6 - that.data.uploaderNum, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFilePaths = res.tempFilePaths;
        let uploaderList = that.data.uploaderList.concat(tempFilePaths);
        if (uploaderList.length == 6) {
          that.setData({
            showUpload: false
          })
        }
        that.setData({
          uploaderList: uploaderList,
          uploaderNum: uploaderList.length,
        })
        //console.log(opinions)

      }
    })
  },
  titleinput: function (e) {
    //console.log(e.detail.value)
    this.setData({
      title: e.detail.value
    })
    console.log(this.data.title)
  },
  detailsinput: function (e) {
    //console.log(e.detail.value)
    this.setData({
      details: e.detail.value
    })
    console.log(this.data.details)
    //console.log(this.data.uploaderList)
  },
  submit() {
    console.log(this.data.uploaderNum)
    if (this.data.uploaderNum == 0) {
      if (this.data.title && this.data.details) {
        wx.showLoading({
          title: '提交中',
        })
        
        setTimeout(function () {
          wx.hideLoading()
        }, 6000)
        opinions.add({
          data: {
            title: this.data.title,
            details: this.data.details,
            img: this.data.imglist
          }
        })
        var fujian = new Array()
        wx.cloud.callFunction({
          name: "sendemail",
          data: {
            title: this.data.title,
            details: this.data.details,
            attachments: fujian
          },
          success(res) {
            console.log("发送成功", res)
            console.log(fujian)
            wx.hideLoading()
            wx.showToast({
              title: '提交成功！',  // 标题
              icon: 'success',   // 图标类型，默认success
              duration: 1000   // 提示窗停留时间，默认1500ms
            })
            
            setTimeout(function () {
              wx.switchTab({
                url: '/pages/me/me'
              })
            }, 1000)

          },
          fail(res) {
            console.log("发送失败", res)
            console.log(fujian)
          }
        })
      }

    } else {
      wx.showLoading({
        title: '提交中',
      })
      setTimeout(function () {
        wx.hideLoading()
      }, 6000)
      for (var l = 0; l < this.data.uploaderNum; l++) {
        wx.cloud.uploadFile({
          cloudPath: 'opinion/img' + Math.random() * 1000000 + '.png',
          filePath: this.data.uploaderList[l],
        }).then(res => {
          console.log(res.fileID)
          this.data.imglist.push(res.fileID)
          if (this.data.imglist.length == this.data.uploaderNum) {
            opinions.add({
              data: {
                title: this.data.title,
                details: this.data.details,
                img: this.data.imglist
              }
            }).then(res => {
              console.log(res)
              wx.cloud.getTempFileURL({
                fileList: this.data.imglist
              }).then(res => {
                // get temp file URL
                console.log('111', res.fileList)
                var fujian = new Array()
                for (var p = 0; p < res.fileList.length; p++) {
                  fujian.push({ filename: p.toString, path: res.fileList[p].tempFileURL })
                }
                wx.cloud.callFunction({
                  name: "sendemail",
                  data: {
                    title: this.data.title,
                    details: this.data.details,
                    attachments: fujian
                  },
                  success(res) {
                    console.log("发送成功", res)
                    console.log(fujian)
                    wx.hideLoading()
                    wx.showToast({
                      title: '提交成功！',  // 标题
                      icon: 'success',   // 图标类型，默认success
                      duration: 1000   // 提示窗停留时间，默认1500ms
                    })
                    setTimeout(function () {
                      wx.switchTab({
                        url: '/pages/me/me'
                      })
                    }, 1000)
                  },
                  fail(res) {
                    console.log("发送失败", res)
                    console.log(fujian)
                  }
                })
              }).catch(error => {
                // handle error
              })

              //console.log(event)

              //console.log(res)
            })

          }
        })
      }

    }

  },
  onLoad: function () { }
})