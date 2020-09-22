const app = getApp()
const db = wx.cloud.database()
let todayCourseList=[]
let today = new Date();
async function getMyCourse(myClass, term, flush) {
  console.log(app.globalData.allCourseData)
  if(!app.globalData.allCourseData){
    app.globalData.allCourseData={}
  }
  if (!app.globalData.beizhu) {
    app.globalData.beizhu = {}
  }
  let coursesList = [];//当前所选学期课程数据
  let courseKey = myClass + '-' + term
  const res = wx.getStorageInfoSync()
  console.log(res)
  let beizhu = ''
  if (flush) {
    //刷新数据
    //刷新数据
    let dataObj
    dataObj = await getCourse(myClass, term);
    coursesList = dataObj.coursesList
    beizhu = dataObj.beizhu
    app.globalData.beizhu[courseKey + 'bz']=beizhu
    app.globalData.allCourseData[courseKey] = coursesList;
    
    return coursesList;
  } else {
    //内存中没有数据时
    if (!app.globalData.allCourseData.hasOwnProperty(courseKey)) {
      //从缓存获取
      let dataObj
      dataObj = await getCourseStorage(courseKey);

      if (dataObj.coursesList.length == 0) {
        //缓存没有数据时
        dataObj = await getCourse(myClass, term);
      }
      coursesList = dataObj.coursesList
      beizhu = dataObj.beizhu
      console.log('coursesList:',coursesList)
      app.globalData.allCourseData[courseKey] = coursesList;
      app.globalData.beizhu[courseKey + 'bz']=beizhu
      return coursesList;
    } else {
      return app.globalData.allCourseData[courseKey];
    }
  }
}
/**
 * 从缓存读取课表
 */
async function getCourseStorage(courseKey) {
  let coursesList = [];
  await wx.getStorage({
    key: courseKey
  }).then(res => {
    console.log('从缓存成功读取课表' + courseKey)
    coursesList = res.data;
  }).catch(err => {
    console.log('获取缓存失败')
    console.log(err)
  })
  var beizhu = wx.getStorageSync(courseKey + 'bz')
  return {
    coursesList,
    beizhu
  }
}
/**
 * 从数据库获取课表,并写入缓存
 */
async function getCourse(myClass, term) {
  console.log('从数据库获取课表')
  let courseKey = myClass + '-' + term
  let coursesList = []
  let beizhu = ''
  await wx.cloud.callFunction({
    name: 'getCourse',
    data: {
      myClass,
      term
    }
  }).then(res => {
    coursesList = setCourseColor(res.result.data);
    console.log('写入缓存' + courseKey)
    beizhu = res.result.beizhu
    wx.setStorage({
      key: courseKey,
      data: coursesList,
      success: res => {
        console.log(res)
      },
      fail: err => {
        console.log(err)
      },
    })
    wx.setStorage({
      key: courseKey + 'bz',
      data: beizhu,
      success: res => {
        console.log(res)
      },
      fail: err => {
        console.log(err)
      },
    })
  }).catch(res => {
      console.log(res)
    })
  return {
    coursesList,
    beizhu
  }
}


function setCourseColor(coursesList) {
  /**
   * 识别同名课，设定同颜色；
   */
  let courseColor = {};
  let colorNum = 0;
  for (let i = 0; i < coursesList.length; i++) {
    let course = coursesList[i];
    if (!courseColor.hasOwnProperty(course.name)) {
      courseColor[course.name] = colorNum;
      colorNum++;
    }
    coursesList[i].color = courseColor[course.name];
  }
  // console.log(coursesList);
  return coursesList;
}

function checkWeek(weeks, beginWeek, endWeek) {
  for (let i = 0; i < weeks.length; i++) {
    if (weeks[i] >= beginWeek && weeks[i] <= endWeek) {
      return true;
    }
  }
  return false;
}
async function getCurrentWeek(termStr){
  let date = today;
  let currentWeek=-1
  await db.collection('termBeginDate').where({
    term: termStr,
  }).get().then(res => {
    // res.data 包含该记录的数据
    console.log('dateStart',res.data[0].dateStart)
    let dateStart = new Date(res.data[0].dateStart);
    currentWeek = Math.floor((date - dateStart) / (1000 * 60 * 60 * 24) / 7 + 1);
    console.log('currentWeek',currentWeek);
  })
  return currentWeek;
}

async function getTodayCourse(myClass,term){
  let status=true
  if(todayCourseList.length==0||todayCourseList[0].class!=myClass){
    console.log('获取今日课表')
    let day=today.getDay();
    if(day==0){
      day=7;
    }
    if(!app.globalData.currentWeek){
      app.globalData.currentWeek=await getCurrentWeek(term);
    }
    let currentWeek=app.globalData.currentWeek;

    let coursesList=await getMyCourse(myClass,term,false);
    let todayCourse=[];
    if(coursesList.length==0){
      status=false;
    }
    for(let n=0;n<coursesList.length;n++){
      if(coursesList[n].day==day){
        todayCourse.push(coursesList[n]);
      }
    }
    let courseObject={}
    let list=[]
    for(let i=0;i<todayCourse.length;i++){
      if(todayCourse[i].name.indexOf("大学体育")!=-1){
        console.log(todayCourse[i].name)
        todayCourse[i].name="大学体育";
        todayCourse[i].teacher="体育老师";
        todayCourse[i].place="按照体育老师安排";
      }
      if(!courseObject.hasOwnProperty(todayCourse[i].name+todayCourse[i].beginTime)
      &&checkWeek(todayCourse[i].weeksNum,currentWeek,currentWeek)){
        list.push(todayCourse[i]);
        courseObject[todayCourse[i].name+todayCourse[i].beginTime]=1;
      }
    }
    list.sort(function(a, b){return a.beginTime - b.beginTime});
    todayCourseList=list;
  }
  
  // console.log(todayCourseList)
  return {
    todayCourseList:todayCourseList,
    status:status,
    currentWeek:app.globalData.currentWeek
  }
}

function getcurrentTerm(){
  let date = today;
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  // let d=date.getDate();
  let currentTerm
  if (month < 9) {
    //第二学期
    currentTerm=(year-1)+'-'+year+'-'+2
  }else(
    currentTerm=year+'-'+(year+1)+'-'+1
  )
  console.log(currentTerm)
  return currentTerm;
}

async function getUserClass(){
  if(!app.globalData.myClass){
    console.log('初始化班级')
    await wx.cloud.callFunction({
      name: 'getUserInfo'
    }).then(res => {
      let info = res.result.info
      if (info && info.length > 0) {
        app.globalData.myClass=info[0].myClass
      }
    }).catch(res => {
      console.log(res)
    })
  }
  console.log('app.globalData.myClass:',app.globalData.myClass)
  return app.globalData.myClass;
}
let todayWeek=today.getDay();
if(todayWeek==0){
  todayWeek=7;
}

Page({
  data: {
    todayWeek:todayWeek,
    showHeader:true,
    showTip:false,
    showApp:false,
    tipStr:'今天没课，去看看完整课表吧',
    currentWeek:'',
    myClass: '',
    courseData: [],
    /*默认加载的indexlist数据*/
    indexlist: [],
    days: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
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
    ]
  },
  toMyInfo(e){
    wx.navigateTo({
      url: '/pages/my-info/my-info'
    })
  },
  bindSwiper: function(e){
    let i=e.target.dataset.swi
    let item=this.data.indexlist[i]
    console.log(i,item)
    wx.previewImage({
      current: item.img, // 当前显示图片的http链接
      urls: item.data // 需要预览的图片http链接列表
    })
    db.collection('indexClickCount').add({
      data: {
        item:item,
        clickTime:new Date()
      }
    })
  },
  colseHeader:function(e){
    wx.showModal({
      title: '',
      content: '以后不再显示',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.setStorage({
            key:"showHeader",
            data:false
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    this.setData({
      showHeader:false
    })
  },
  loadImage:function(e){
    wx.hideLoading()
  },
  loadImageErr:function(e){
    wx.showToast({
      title: '系统异常',
      icon: 'none',
      duration: 2000
    })
  },
  loadIndexImg:function(){
    let that=this
    db.collection('indexList').where({
        show:1
      })
      .orderBy('weight', 'desc').get().then(res=>{
      console.log('indexList',res.data)
      if(res.data.length>0){
        that.setData({
          indexlist:res.data
        })
        // console.log(that.data.indexlist)
      }
    })
    
  },
  onLoad: function (query) {
    db.collection('indexShow').doc('index20200914').get().then(res=>{
      // console.log(res.data.show)
      this.setData({
        showApp:res.data.show
      })
    })
    console.log(query)
    if(query.toPage){
      wx.navigateTo({
        url: '/pages/'+query.toPage+'/'+query.toPage
      })
    }
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 1000)
    this.loadIndexImg()
    wx.getStorage({
      key: 'showHeader',
      success :res=> {
        console.log(res.data)
        this.setData({
          showHeader: res.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let tipStr='今天没课，去看看完整课表吧'
    let that=this
    getUserClass().then(res=>{
      that.setData({
        myClass: res
      })
      if(!res){
        res='abc'
      }
      getTodayCourse(res,getcurrentTerm()).then(res=>{
        /**res={
              todayCourseList:todayCourseList,
              status:status,
              currentWeek:app.globalData.currentWeek
            }
         */
        if(!res.status){
          tipStr='暂无您的班级课程数据'
        }
        let currentWeek='第'+res.currentWeek+'周'
        if(res.currentWeek>19||res.currentWeek<1){
          tipStr='放假中...'
          currentWeek=''
        }
        
        console.log('TodayCourse:',res)
        that.setData({
          showTip:true,
          courseData:res.todayCourseList,
          tipStr,
          currentWeek
        })
      }).catch(e=>{
        console.log(e)
        that.setData({
          showTip:true
        })
        wx.showToast({
          title: '网络异常',
          icon: 'none',
          duration: 1000
        })
      })
    }).catch(e=>{
      console.log(e)
      that.setData({
        showTip:true
      })
      wx.showToast({
        title: '网络异常',
        icon: 'none',
        duration: 1000
      })
    })
  },
  onHide: function () {
    this.setData({
      showTip:false
    })
  },
  onShareAppMessage: function () {
    return {
      title: '邀你使用iknow佛大',
      path: '/pages/index/index',
      imageUrl: 'https://fosuwxapp.gitee.io/wxapp-images/indexImages/shareapp200902.png'
    }
  }
})
