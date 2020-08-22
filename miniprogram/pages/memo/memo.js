const db = wx.cloud.database()
Page({
  data:{
    datalist:[]
  },

  //获取云数据库数据
  onShow: function (options) {
    let that = this
    wx.cloud.database().collection("memoList").get({
      success(e) {
        console.log("请求成功", e)
        that.setData({
          datalist: e.data
        })
      },
      fail(e) {
        console.log("请求失败", e)
      }

    })
  },

  //点击查看备忘录内容
  shortTap:function(e){
    var id = e.currentTarget.dataset.id;
    console.log(id)
    wx.navigateTo({
      url: '/pages/insertMemo/insertMemo?id='+id,
    })
  },

  //长按弹出选择框
  longPress:function(e){
    var id = e.currentTarget.dataset.id;
    console.log(id)
    let that = this
    wx.showActionSheet({
      itemList: ['编辑','删除'],
      success(res){
        if (res.tapIndex == 0){
          //点击编辑跳转页面
          wx.navigateTo({
            url: '/pages/editMemo/editMemo?id='+id,
          })
        }else{
          //删除操作
          db.collection("memoList").doc(id).remove().then(res=>{
            console.log(res)
            console.log("成功删除数据")
          })
          console.log("点击了删除");
          that.onShow();
        }
      },
      fail(res){
        console.log("点击了取消")
      }
    })
  }

})