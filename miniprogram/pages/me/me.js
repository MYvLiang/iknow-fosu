Page({
  data: {
    melist: [
      {
        imagePath: "/images/lunbotu/one.jpg",
      },
      {
        name: "/images/geren/four.jpg",
        imagePath: "/images/geren/five.jpg",
        time: "/images/geren/six.jpg",
      },

    ]
  },
  onShareAppMessage: function () {
    return {
      title: '佛大新生小助手',
      path: '/pages/index/index',
      imageUrl: 'cloud://develop-fx3l0.6465-develop-fx3l0-1301738912/share.png'
    }
  }
})