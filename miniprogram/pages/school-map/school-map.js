let selectMarker = 0
let content = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    memu: false,
    selectMarkerContent: '',
    latitude: 23.021834,
    longitude: 113.097832,
    // latitude: 22.974028,
    // longitude: 112.392745,
    selectTabCampus: 0,
    placeList: [
      [{ id: 0, name: '会通楼', latitude: 23.024982, longitude: 113.09655 }, { id: 1, name: '基础楼' }, { id: 2, name: '信息楼' }, { id: 3, name: 'xx楼' }, { id: 4, name: 'xx楼' }],
      [],
      []],//主要地点标记
    selectTabPlace: -1,
    scale: 16,//比例
    showCompass: true,//指南针
    enableZoom: true,//缩放
    enableScroll: true,//拖动
    enableRotate: false,//旋转
    markers: [
      //   {
      //   id: 0,
      //   title: '佛科院江湾校区',
      //   iconPath: "/images/fosu-logo.png",
      //   latitude: 23.023346,
      //   longitude: 113.098427,
      //   width: 30,
      //   height: 30
      // },{
      //   id: 1,
      //   title: '佛科院仙溪校区',
      //   iconPath: "/images/fosu-logo.png",
      //   latitude: 23.137426,
      //   longitude: 113.057427,
      //   width: 30,
      //   height: 30
      // },{
      //   id: 2,
      //   title: '佛科院河滨校区',
      //   iconPath: "/images/fosu-logo.png",
      //   latitude: 23.046292,
      //   longitude: 113.118919,
      //   width: 30,
      //   height: 30
      // }
    ]
  },
  enlargeMap: function (e) {
    let scale = this.data.scale
    console.log('放大', scale)
    scale = scale + 1
    if (scale > 20) {
      scale = 20
    }
    this.setData({
      scale
    })
  },
  lessenMap: function (e) {
    let scale = this.data.scale
    console.log('缩小', scale)
    scale = scale - 1
    if (scale < 3) {
      scale = 3
    }
    this.setData({
      scale
    })
  },
  /**
   * VR地图按钮，弹窗提示复制网址
   */
  vrMap: function (e) {
    let scene_id = [8652633, 17972814, 8652633]
    let i = this.data.selectTabCampus
    let url = 'https://720yun.com/t/4f9jz04mtm2?scene_id=' + scene_id[i]
    wx.showModal({
      title: 'VR校园',
      confirmText: '复制网址',
      content: '暂不支持在小程序中查看VR校园，' +
        '请复制以下网址\n在浏览器或微信中打开：\n' + url,
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.setClipboardData({
            data: url,
            success(res) {
              console.log('复制成功')
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  bindregionchangeMap: function (e) {
    // console.log(e)
    let that = this
    if (e.type == 'end' && (e.causedBy == 'scale' || e.causedBy == 'drag')) {
      let mapContext = wx.createMapContext("fosumap")
      mapContext.getCenterLocation({
        success: function (res) {
          console.log(res)
          that.setData({
            latitude: res.latitude,
            longitude: res.longitude
          })
        }
      })
    }

  },
  /**
   * 点击地图事件，增加标记
   */
  bindtapMap: function (e) {
    // console.log(e.detail.latitude)
    // console.log(e.detail.longitude)
    let timestamp = new Date().getTime()
    // console.log(timestamp)
    let m = {
      id: timestamp,
      iconPath: "/images/marker.png",
      latitude: e.detail.latitude,
      longitude: e.detail.longitude,
      width: 18,
      height: 18,
      zIndex: -1,
      callout: {
        content: '标记' + timestamp,
        fontSize: 16,
        padding: 4,
        anchorY: 6,
        display: 'ALWAYS'
      }
    }
    wx.showLoading({
      title: '添加中',
    })
    let that = this
    wx.cloud.callFunction({
      name: 'addMarker',
      data: {
        marker: m
      },
      success: res => {
        console.log(res)
        that.loadMarkers()
      },
      fail: res => {
        console.log(res)
      }
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 1500)
  },

  /**
   * 输入标记修改内容
   */
  memuInput: function (e) {
    content = e.detail.value
  },

  /**
   * 修改标记
   */
  updateMarker: function (e) {
    let markers = this.data.markers
    let that = this
    wx.cloud.callFunction({
      name: 'updateMarker',
      data: {
        _id: markers[selectMarker]._id,
        content: content
      },
      success: res => {
        console.log(res)
        that.loadMarkers()
      },
      fail: res => {
        console.log(res)
      }
    })
    wx.showLoading({
      title: '修改中',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 1500)
    this.setData({
      memu: false
    })
  },

  /**
   * 删除标记按钮
   */
  delMarker: function (e) {
    wx.showLoading({
      title: '删除中',
    })
    let markers = this.data.markers
    let that = this
    wx.cloud.callFunction({
      name: 'delMarker',
      data: {
        _id: markers[selectMarker]._id,
      },
      success: res => {
        console.log(res)
        that.loadMarkers()
      },
      fail: res => {
        console.log(res)
      }
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 1500)
    this.setData({
      memu: false
    })
  },

  /**
   * 关闭菜单按钮
   */
  closeMemu: function (e) {
    this.setData({
      memu: false
    })
  },

  /**
   * 点击标记事件，打开弹窗菜单，选中对应的标记
   */
  bindmarkertapMap: function (e) {
    console.log(e.detail)
    // console.log(this.data.markers)
    let markers = this.data.markers
    for (let i = 0; i < markers.length; i++) {
      if (markers[i].id == e.detail.markerId) {
        // console.log(markers[i])
        selectMarker = i
      }
    }
    console.log(markers[selectMarker])
    this.setData({
      memu: true,
      selectMarkerContent: markers[selectMarker].callout.content
    })
  },

  /**
   * 选择校区
   */
  selectCampus: function (e) {
    let campus = [
      [23.021834, 113.097832, 16],
      [23.134401, 113.056397, 15],
      [23.045853, 113.118786, 18]];
    var that = this
    wx.showActionSheet({
      itemList: ['江湾校区', '仙溪校区', '河滨校区'],
      success(res) {
        let i = res.tapIndex;
        // console.log(res.tapIndex)
        that.setData({
          selectTabCampus: i,
          selectTabPlace: -1,
          latitude: campus[i][0],
          longitude: campus[i][1],
          scale: campus[i][2]
        })
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },

  /**
   * 选择底部tab地点
   */
  selectPlace: function (e) {
    // console.log(e.currentTarget.dataset.id)
    let i = e.currentTarget.dataset.id
    let placeList = this.data.placeList
    if (i == 0) {
      this.setData({
        latitude: placeList[0][0].latitude,
        longitude: placeList[0][0].longitude,
        selectTabPlace: i,
        scale: 18
      })
    } else {
      this.setData({
        latitude: 23.021834,
        longitude: 113.097832,
        selectTabPlace: i,
        scale: 16
      })
    }

  },

  loadMarkers: function () {
    let that = this
    wx.cloud.callFunction({
      name: 'getMarker',
      success: res => {
        let markers = res.result.data
        console.log(markers.length)
        that.setData({
          markers: markers
        })
      },
      fail: res => {
        console.log(res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.getLocation({
    //   type: 'gcj02',
    //   success(res) {
    //     // const latitude = res.latitude
    //     // const longitude = res.longitude
    //     // const speed = res.speed
    //     // const accuracy = res.accuracy
    //     console.log(res)
    //   },
    //   fail(res) {
    //     wx.getSetting({
    //       success: function (res) {
    //         var statu = res.authSetting;
    //         if (!statu['scope.userLocation']) {
    //           wx.showModal({
    //             title: '是否授权当前位置',
    //             content: '需要获取您的地理位置，请确认授权',
    //             success: function (tip) {
    //               console.log(tip)
    //               if (tip.confirm) {
    //                 wx.openSetting({
    //                   success: function (data) {
    //                     if (data.authSetting["scope.userLocation"] === true) {
    //                       wx.showToast({
    //                         title: '授权成功',
    //                         icon: 'success',
    //                         duration: 1000
    //                       })
    //                       wx.getLocation({
    //                         type: 'gcj02',
    //                         success(res) {
    //                           console.log(res)
    //                         }
    //                       })
    //                     } else {
    //                       wx.showToast({
    //                         title: '授权失败',
    //                         icon: 'none',
    //                         duration: 1000
    //                       })
    //                     }
    //                   }
    //                 })
    //               }
    //             }
    //           })
    //         }
    //       },
    //       fail: function (res) {
    //         wx.showToast({
    //           title: '调用授权窗口失败',
    //           icon: 'none',
    //           duration: 1000
    //         })
    //       }
    //     })
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    /**
     * 初始化标记数据
     */
    this.loadMarkers()
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
    return {
      title: '佛大校园地图，VR地图',
      path: '/pages/index/index?toPage=map'
    }
  }
})