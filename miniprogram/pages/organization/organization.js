// miniprogram/pages/organization/organization.js 
var app = getApp();
Page({
  data: {
    typeList:['校级','医学','法学','数学','经管',
    '环化','材能','工陶','粤台','机电','食品','交建','物电','生科','电信','人文'],
    winHeight: "",//窗口高度 
    currentTab: 0, //预设当前项的值 
    scrollLeft: 0, //tab标题的滚动条位置 
    showDataList:[1,2,3,4,5,6,7,8,9,10,11,12],
    allData:{
      '校级':[{
        type:'类型',
        name:'佛大校团委',
        introduce:'校团委是共青团的重要组成成分，结合学校情况，依靠青年组织开展活动。',
        logo:'cloud://develop-fx3l0.6465-develop-fx3l0-1301738912/organization/xiaotuanwei-logo.jpg',
        img:['cloud://develop-fx3l0.6465-develop-fx3l0-1301738912/organization/xiaotuanwei-logo.jpg','cloud://develop-fx3l0.6465-develop-fx3l0-1301738912/organization/xiaotuanwei-logo.jpg']
      },{
        type:'类型',
        name:'佛大学生会',
        introduce:'佛山科学技术学院学生会以“服务同学，提升自我”为根本宗旨，组织开展活动',
        logo:'cloud://develop-fx3l0.6465-develop-fx3l0-1301738912/organization/xiaohui-logo.jpg',
        img:['cloud://develop-fx3l0.6465-develop-fx3l0-1301738912/organization/xiaotuanwei-logo.jpg','cloud://develop-fx3l0.6465-develop-fx3l0-1301738912/organization/xiaotuanwei-logo.jpg']
      },{
        type:'类型',
        name:'佛大校青协',
        introduce:'佛山科学技术学院青年志愿者协会以“立人立己，助人自助”为宗旨，组织开展活动。<。',
        logo:'cloud://develop-fx3l0.6465-develop-fx3l0-1301738912/organization/qingxie-logo.jpg',
        img:['cloud://develop-fx3l0.6465-develop-fx3l0-1301738912/organization/xiaotuanwei-logo.jpg','cloud://develop-fx3l0.6465-develop-fx3l0-1301738912/organization/xiaotuanwei-logo.jpg']
      },{
        type:'类型',
        name:'佛大社联',
        introduce:'佛山科学技术学院社团联合会在校团委的指导下，管理协调三个校区的社团，代表佛科院的力量。',
        logo:'cloud://develop-fx3l0.6465-develop-fx3l0-1301738912/organization/shelian-logo.jpg',
        img:['cloud://develop-fx3l0.6465-develop-fx3l0-1301738912/organization/xiaotuanwei-logo.jpg','cloud://develop-fx3l0.6465-develop-fx3l0-1301738912/organization/xiaotuanwei-logo.jpg']
      },{
        type:'类型',
        name:'佛大研究生会',
        introduce:'佛山科学技术学院研究生会是学校党委与研究生的桥梁与纽带。',
        logo:'cloud://develop-fx3l0.6465-develop-fx3l0-1301738912/organization/yanjiu-logo.jpg',
        img:['cloud://develop-fx3l0.6465-develop-fx3l0-1301738912/organization/xiaotuanwei-logo.jpg','cloud://develop-fx3l0.6465-develop-fx3l0-1301738912/organization/xiaotuanwei-logo.jpg']
      },{
        type:'类型',
        name:'佛大校团委',
        introduce:'校团委是共青团的重要组成成分，结合学校情况，依靠青年组织开展活动。',
        logo:'cloud://develop-fx3l0.6465-develop-fx3l0-1301738912/organization/xiaotuanwei-logo.jpg',
        img:['cloud://develop-fx3l0.6465-develop-fx3l0-1301738912/organization/xiaotuanwei-logo.jpg','cloud://develop-fx3l0.6465-develop-fx3l0-1301738912/organization/xiaotuanwei-logo.jpg']
      },{
        type:'类型',
        name:'佛大校团委',
        introduce:'校团委是共青团的重要组成成分，结合学校情况，依靠青年组织开展活动。',
        logo:'cloud://develop-fx3l0.6465-develop-fx3l0-1301738912/organization/xiaotuanwei-logo.jpg',
        img:['cloud://develop-fx3l0.6465-develop-fx3l0-1301738912/organization/xiaotuanwei-logo.jpg','cloud://develop-fx3l0.6465-develop-fx3l0-1301738912/organization/xiaotuanwei-logo.jpg']
      },{
        type:'类型',
        name:'佛大校团委',
        introduce:'校团委是共青团的重要组成成分，结合学校情况，依靠青年组织开展活动。',
        logo:'cloud://develop-fx3l0.6465-develop-fx3l0-1301738912/organization/xiaotuanwei-logo.jpg',
        img:['cloud://develop-fx3l0.6465-develop-fx3l0-1301738912/organization/xiaotuanwei-logo.jpg','cloud://develop-fx3l0.6465-develop-fx3l0-1301738912/organization/xiaotuanwei-logo.jpg']
      },{
        type:'类型',
        name:'佛大校团委',
        introduce:'校团委是共青团的重要组成成分，结合学校情况，依靠青年组织开展活动。',
        logo:'cloud://develop-fx3l0.6465-develop-fx3l0-1301738912/organization/xiaotuanwei-logo.jpg',
        img:['cloud://develop-fx3l0.6465-develop-fx3l0-1301738912/organization/xiaotuanwei-logo.jpg','cloud://develop-fx3l0.6465-develop-fx3l0-1301738912/organization/xiaotuanwei-logo.jpg']
      },{
        type:'类型',
        name:'佛大校团委',
        introduce:'校团委是共青团的重要组成成分，结合学校情况，依靠青年组织开展活动。',
        logo:'cloud://develop-fx3l0.6465-develop-fx3l0-1301738912/organization/xiaotuanwei-logo.jpg',
        img:['cloud://develop-fx3l0.6465-develop-fx3l0-1301738912/organization/xiaotuanwei-logo.jpg','cloud://develop-fx3l0.6465-develop-fx3l0-1301738912/organization/xiaotuanwei-logo.jpg']
      }],
      '医学':[{
        type:'类型',
        name:'佛大校团委',
        introduce:'校团委是共青团的重要组成成分，结合学校情况，依靠青年组织开展活动。',
        logo:'cloud://develop-fx3l0.6465-develop-fx3l0-1301738912/organization/xiaotuanwei-logo.jpg',
        img:['cloud://develop-fx3l0.6465-develop-fx3l0-1301738912/organization/xiaotuanwei-logo.jpg','cloud://develop-fx3l0.6465-develop-fx3l0-1301738912/organization/xiaotuanwei-logo.jpg']
      }],
      '法学':[],
      '数学':[],
      '经管':[],
      '环化':[],
      '材能':[],
      '工陶':[],
      '粤台':[],
      '机电':[],
      '食品':[],
      '交建':[],
      '物电':[],
      '生科':[],
      '电信':[],
      '人文':[],
    }
  },



  // 滚动切换标签样式 
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
    this.checkCor();
  },
  // 点击标题切换当前页时改变样式 
  swichNav: function (e) {
    this.setData({
      currentTab: e.target.dataset.current
    })
  },
  //判断当前滚动，设置tab标题滚动条。 
  checkCor: function (direction) {
    let that=this
    let query = wx.createSelectorQuery()
    query.select('.active').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec(function(res){
      // console.log(res)
      if (that.data.currentTab >1) {
        that.setData({
          scrollLeft: res[0].width*(that.data.currentTab-1)
        })
      }else{
        that.setData({
          scrollLeft: 0
        })
      }
    })
  },
  onLoad: function () {
    var that = this;
    //  高度自适应 
    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        var clientHeight = res.windowHeight;
        var clientWidth = res.windowWidth;
        var  rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR ;
        console.log(calc)
        that.setData({
          winHeight: calc
        });
      }
    });
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '邀你使用佛大新生小助手查询学校机构',
      path: '/pages/index/index?toPage=organization'
    }
  }
}) 