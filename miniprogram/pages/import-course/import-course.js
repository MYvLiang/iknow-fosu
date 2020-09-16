// miniprogram/pages/import-course/import-course.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tip: ''
  },
  chooseExcel(e) {
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      extension: ['xls', 'xlsx'],
      success: (res) => {
        let path = res.tempFiles[0].path
        let name = res.tempFiles[0].name
        console.log('name:', name)
        this.uploadExcel(path, name)
      }
    })
  },
  uploadExcel(path, name) {
    wx.showLoading({
      title: '导入中',
    })
    this.setData({
      tip: '读取表格文件中'
    })
    console.log(path, name)
    wx.cloud.uploadFile({
      filePath: path,
      cloudPath: 'course/file' + new Date().getTime() + name,
      success: (res) => {
        console.log(res.fileID)
        this.handleExcel(res.fileID)
      },
      fail: (res) => {
        wx.hideLoading()
        wx.showToast({
          title: '上传文件失败',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  handleExcel(fileID) {
    this.setData({
      tip: '解析表格中'
    })
    console.log('解析表格', fileID)
    wx.cloud.callFunction({
      name: 'handleExcel',
      data: {
        fileID
      },
      success: (res) => {
        console.log(res)
        this.importCourseData(res.result.data)
      },
      fail: (res) => {
        wx.hideLoading()
        wx.showToast({
          title: '解析表格失败',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  importCourseData(courseData) {
    console.log('courseData:', courseData)
    let coursesList = []
    try {
      //第二行课程信息，分离出班级，学期
      let courseInfo = courseData[1][0].trim().split(/\s+/)
      console.log(courseInfo)
      let term = courseInfo[0].trim().split('：')[1]
      let myClass = courseInfo[1].trim().split('：')[1]
      console.log(term, myClass)
      if ((!term)) {
        throw "无学期信息。";
      }
      if ((!myClass)) {
        throw "无班级信息。";
      }
      this.setData({
        tip: '正在导入，学期：' + term + '，班级：' + myClass
      })
      let _id = 0
      // 第4-9行每一节课
      for (let t = 3; t <= 8; t++) {
        //第t-2节
        for (let d = 1; d <= 7; d++) {
          // 周1-7
          if (courseData[t][d]) {
            let courses = courseData[t][d].trim().split('\n\n')
            //同一时间段可能有多门课
            for (let i = 0; i < courses.length; i++) {
              //如果有课，即courses[i]不为空字符串
              if (courses[i] && courses[i].length > 10) {
                // console.log('周' + d + '第' + (t - 2) + '节',courses[i].length)
                let c = courses[i].split('\n')
                //分离出课程的5个信息
                let name = c[0].trim()
                let teacher = c[1].trim()
                let weeks = c[2].trim()
                let place = c[3].trim()
                let times = c[4].split(/[^0-9]+/)

                let beginTime = parseInt(times[1])
                let endTime = parseInt(times[times.length - 2])

                let weeksNum = []
                let weeksArr = c[2].split(',')
                for (let w = 0; w < weeksArr.length; w++) {
                  let weekNumArr = weeksArr[w].split(/[^0-9]+/)
                  // console.log(weekNumArr)
                  if (weekNumArr.length == 1 && weekNumArr[0] != "") {
                    weeksNum.push(parseInt(weekNumArr[0]))
                  } else if (weekNumArr.length == 2 && weekNumArr[1] == "") {
                    weeksNum.push(parseInt(weekNumArr[0]))
                  } else if (weekNumArr.length == 2 && weekNumArr[0] == "") {
                    weeksNum.push(parseInt(weekNumArr[1]))
                  } else if ((weekNumArr.length == 2 && weekNumArr[0] != "" && weekNumArr[1] != "") || weekNumArr.length == 3) {
                    let beginW = parseInt(weekNumArr[0])
                    let endW = parseInt(weekNumArr[1])
                    for (let ww = beginW; ww <= endW; ww++) {
                      weeksNum.push(ww)
                    }
                  }
                }
                let oneCourse = {
                  _id: new Date().getTime() + '' + (++_id),
                  'class': myClass,
                  term: term,
                  day: d,
                  name: name,
                  teacher: teacher,
                  weeks: weeks,
                  weeksNum: weeksNum,
                  place: place,
                  beginTime: beginTime,
                  endTime: endTime
                }
                coursesList.push(oneCourse)
                console.log(oneCourse)
              }
            }
          }
        }
      }
      let beizhu = courseData[9][1]
      console.log(beizhu, coursesList)
      wx.cloud.callFunction({
        name: 'addMyCourse',
        data: {
          myClass: myClass,
          term: term,
          beizhu: beizhu,
          coursesList: coursesList
        },
        success: (res) => {
          console.log(res)
          wx.hideLoading()
          if (res.result.status) {
            let courseKey = myClass + '-' + term
            app.globalData.allCourseData[courseKey] = coursesList
            app.globalData.beizhu[courseKey + 'bz'] = beizhu
            app.globalData.flushC = true
            wx.showToast({
              title: '导入成功',
              icon: 'success',
              duration: 2500
            })
            setTimeout(function () {
              wx.navigateBack({
                delta: 1
              })
            }, 2550)

          } else {
            wx.showToast({
              title: '导入失败，系统异常',
              icon: 'none',
              duration: 2000
            })
          }
        },
        fail: (res) => {
          console.log(res)
          wx.hideLoading()
          wx.showToast({
            title: '导入失败，网络异常',
            icon: 'none',
            duration: 2000
          })
        }
      })

    } catch (e) {
      wx.hideLoading()
      let mes = ""
      if (e.message) {
        mes = e.message
      } else {
        mes = e
      }
      this.setData({
        tip: '导入失败，' + mes
      })
      wx.showToast({
        title: '导入失败，课程数据格式错误 ' + mes,
        icon: 'none',
        duration: 4000
      })
      console.log(e)
    }

  },
  copyQQ:function(e){
    wx.setClipboardData({
      data: '1035264989',
      success(res) {
        console.log('复制成功')
      }
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

  }
})