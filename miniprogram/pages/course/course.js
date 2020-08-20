/**
 * 要初始化的信息：当前学期，当前周次，班级
 * 
 * 1第一次加载
 * 2切换周次
 * 3切换学期
 * 4切换班级
 * 优先加载本地缓存课程数据，下拉刷新缓存
 * {
 *  '班名':{
 *      '2019-2020-1':[],
 *      '2019-2020-2':[]
 *  },
 * '班名2':{
 *      '2019-2020-1':[],
 *      '2019-2020-2':[]
 *  },
 * }
 */

const db = wx.cloud.database()
console.log('初始化course.js')
let allCourseData={};//所有学期的课程数据

async function getMyCourse(myClass,term,flush){
  // console.log(allCourseData)
  let coursesList = [];//当前所选学期课程数据
  let courseKey=myClass+'-'+term
  const res = wx.getStorageInfoSync()
  console.log(res)

  if(flush){
    //刷新数据
    coursesList=await getCourse(myClass,term);
    allCourseData[courseKey]=coursesList;
    return coursesList;
  }else{
    //内存中没有数据时
    if(!allCourseData.hasOwnProperty(courseKey)){
      //从缓存获取
      coursesList=await getCourseStorage(courseKey);
      
      if(coursesList.length==0){
        //缓存没有数据时
        coursesList=await getCourse(myClass,term);
      }
      // console.log(coursesList)
      allCourseData[courseKey]=coursesList;
      return coursesList;
    }else{
      return allCourseData[courseKey];
    }
  }
}
/**
 * 从缓存读取课表
 */
async function getCourseStorage(courseKey){
  let coursesList=[];
  await wx.getStorage({
    key: courseKey
  }).then(res =>{
    console.log('从缓存成功读取课表'+courseKey)
    coursesList=res.data;
  }).catch(err =>{
    console.log('获取缓存失败')
    console.log(err) 
  })
  return coursesList;
}
/**
 * 从数据库获取课表,并写入缓存
 */
async function getCourse(myClass,term){
  console.log('从数据库获取课表')
  let courseKey=myClass+'-'+term
  let coursesList=[]
  await wx.cloud.callFunction({
    name:'getCourse',
    data:{
      myClass,
      term
    }
  }).then(res => {
    coursesList=setCourseColor(res.result.data);
    console.log('写入缓存'+courseKey)
    wx.setStorage({
      key:courseKey,
      data:coursesList,
      success: res => {
        console.log(res)
      },
      fail: err => {
        console.log(err)
      },
    })

  })
  .catch(res => {
    console.log(res) 
  })
  return coursesList;
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

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showCourseDialog: false,
    showSetDialog: false,
    keepWeek:false,
    days: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    weeks: [
      [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],
      [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]],
    weeksIndex: [0,0],
    colors: ['#eccc68', '#60a3bc', '#079992', '#2ed573','#ff6b81', '#3498db', 
    '#9b59b6', '#ff7f50', '#1abc9c', '#d35400', '#1e90ff','#fff'],
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
    courses: [[],[],[],[],[],[],[]],
    selectCourses: [],
    term: 0,
    termStr: '2019-2020-2',
    termList:['2019-2020-2','2019-2020-1'],
    beginWeek: 1,
    endWeek: 16,
    myClass: '',
    moreCourse:[{},{},{},{},{},{},{}]//重复的课程中选出周次最早的课程
  },
  /**
   * 点击课程查看详情,有重复课程时显示多个
   */
  bindtapCourse: function (e) {
    let course=e.currentTarget.dataset.course
    // console.log(course)
    let day=course.day
    let todayCourses=this.data.courses[day-1]
    // console.log(todayCourses)
    let selectCourses=[]
    for(let i=0;i<todayCourses.length;i++){
      if(todayCourses[i].beginTime==course.beginTime){
          selectCourses.unshift(todayCourses[i])
      }
    }
    console.log(selectCourses)
    this.setData({
      showCourseDialog: true,
      selectCourses
    })
  },
  /**
   * 关闭课程详情
   */
  closeCourseDialog: function (e) {
    this.setData({
      showCourseDialog: false
    })
  },

  /**
   * 打开设置
   */
  openSetting:function(e){
    this.setData({
      showSetDialog: true
    })
  },
  /**
   * 关闭设置弹窗
   */
  closeSetting:function(e){
    this.setData({
      showSetDialog: false
    })
  },
  /**
   * 设置周次范围
   */
  changeWeeks: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    let weeks= this.data.weeks;
    this.setData({
      beginWeek: weeks[0][e.detail.value[0]],
      endWeek: weeks[1][e.detail.value[1]]
    })
    this.loadCourse(false);
    let termStr =  this.data.termStr;
    let beginWeek = this.data.beginWeek;
    let endWeek = this.data.endWeek;
    let weekStr=beginWeek + '-' + endWeek;
    if(beginWeek==endWeek){
      weekStr=endWeek;
    }
    wx.setNavigationBarTitle({
      title: weekStr + '周(' + termStr + ')'
    })
    let keepWeek=this.data.keepWeek;
    wx.setStorage({
      key:'keepWeek',
      data:{
        keepWeek,
        beginWeek,
        endWeek
      }
    })
  },
  bindWeeksColumnChange: function (e) {
    // console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    let weeks= this.data.weeks;
    let weeksIndex=this.data.weeksIndex
    weeksIndex[e.detail.column]=e.detail.value;
    if (e.detail.column==0) {
      weeks[1]=Array(16-e.detail.value);
      for(let i=0;i<weeks[1].length;i++){
        weeks[1][i]=i+e.detail.value+1;
      }
      weeksIndex[1]=0;
    }
    // console.log(weeks[1])
    this.setData({
      weeks,
      weeksIndex
    })
  },

  /**
   * 保持周次范围设置
   */
  keepWeekSet:function(e){
    console.log('保持周次范围设置'+e.detail.value)
    let beginWeek=this.data.beginWeek;
    let endWeek=this.data.endWeek;
    this.setData({
      keepWeek:e.detail.value
    })
    wx.setStorage({
      key:'keepWeek',
      data:{
        keepWeek:e.detail.value,
        beginWeek,
        endWeek
      },
      success: res => {
        // console.log(res)
        wx.showToast({
          title: '设置成功',
          icon: 'success',
          duration: 500
        })
      },
      fail: err => {
        console.log(err)
        wx.showToast({
          title: '设置失败',
          icon: 'none',
          duration: 500
        })
      },
    })
  },

  /**
   * 设置学期
   */
  bindTermChange:function(e){
    console.log(e.detail.value)
    let termStr=this.data.termList[e.detail.value]
    this.setData({
      term: e.detail.value,
      termStr
    })
    this.loadCourse(false);
    let beginWeek = this.data.beginWeek;
    let endWeek = this.data.endWeek;
    let weekStr=beginWeek + '-' + endWeek;
    if(beginWeek==endWeek){
      weekStr=endWeek;
    }
    wx.setNavigationBarTitle({
      title: weekStr + '周(' + termStr + ')'
    })
  },

  clearS:function(e){
    console.log('清除数据缓存')
    let res = wx.getStorageInfoSync()
    console.log(res.keys)
    for(let i=0;i<res.keys.length;i++){
      wx.removeStorageSync(res.keys[i])
    }
  },
  /**
   * 加载和筛选课程数据
   */
  loadCourse: function(flush){
    
    let myClass=this.data.myClass
    if(myClass.length<4){
      //没有绑定班级时
      myClass='abc'
    }
    let that=this
    getMyCourse(myClass,that.data.termStr,flush).then((res)=>{
      let coursesList=res
      console.log('loadCourse')
      // console.log(res)
      // console.log(coursesList)
      /**
       * 根据设置的周次范围筛选课程
       */
      // console.log(this.data.beginWeek+'-'+this.data.endWeek)
      let coursesArray = [[], [], [], [], [], [], []];//用于渲染页面的课程数据
      let flag=[{},{},{},{},{},{},{}];//同时开始的课程的标记
      let moreCourse=[{},{},{},{},{},{},{}];//重复的课程中选出周次最早的课程
      for (let i = 0; i < coursesList.length; i++) {
        let course = coursesList[i];
        let d=coursesList[i].day - 1;
        if (checkWeek(course.weeksNum, this.data.beginWeek, this.data.endWeek)) {
          //根据day添加进二维数组渲染到页面
          if(flag[d].hasOwnProperty(course.beginTime)&&
            course.weeksNum[0]>flag[d][course.beginTime]){
            //在前面添加，不显示
            coursesArray[d].unshift(course);
          }else{
             //在后面添加，显示
            flag[d][course.beginTime]=course.weeksNum[0];
            coursesArray[d].push(course);
          }
          
          if(moreCourse[d].hasOwnProperty(course.beginTime)){
            if(course.weeksNum[0]<moreCourse[d][course.beginTime].course.weeksNum[0]){
              moreCourse[d][course.beginTime].course=course
            }
            moreCourse[d][course.beginTime].num=2
          }else{
            moreCourse[d][course.beginTime]={
              course:course,
              num:1
            }
          }
        }
      }
      // console.log(coursesArray);
      // console.log(flag)
      // console.log(moreCourse)
      that.setData({
        courses: coursesArray,
        moreCourse
      })
      if(flush){
        wx.hideLoading();
        wx.stopPullDownRefresh();
        if(coursesList.length==0){
          wx.showToast({
            title: '刷新失败',
            icon: 'none',
            duration: 1000
          })
        }else{
          wx.showToast({
            title: '刷新成功',
            icon: 'success',
            duration: 500
          })
        }
      }
    }).catch(res=>{
      if(flush){
        wx.hideLoading();
        wx.stopPullDownRefresh();
        wx.showToast({
          title: '刷新失败',
          icon: 'none',
          duration: 1000
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this
    console.log('onLoad')
    let date=new Date();
    let y=date.getFullYear();
    let month=date.getMonth()+1;
    // let d=date.getDate();
    // let week=date.getDay();
    /**
     * 初始化学期列表，至学期2019-2020-1
     */
    let termList=[]
    let num=1//第一学期
    if(month<9){
      num=2//第二学期
    }
    let termS=''
    while(y>=2020||num==1){
      if(num==1){
        termS=(y)+'-'+(y+1)+'-'+num;
      }else{
        termS=(y-1)+'-'+y+'-'+num;
        y--;
      }
      num=(num%2+1);
      termList.push(termS);
    }
    console.log(termList)
    //初始化学期，班级
    this.setData({
      term: 0,
      termStr: termList[0],
      myClass: '18数据科学与大数据技术3',
      termList
    })
    db.collection('termBeginDate').where({
      term: termList[0],
    }).get().then(res => {
      // res.data 包含该记录的数据
      console.log(res.data[0].dateStart)
      let dateStart = new Date(res.data[0].dateStart);
      let currentWeek = Math.floor((date - dateStart) / (1000 * 60 * 60 * 24)/7+1);
      let beginWeek = 1;
      let endWeek = 16;
      if(currentWeek<=16&&currentWeek>0){
        beginWeek=currentWeek;
        endWeek=currentWeek;
      }
      console.log(currentWeek)
      that.setData({
        keepWeek: false,
        beginWeek,
        endWeek
      })
      try {
        let res = wx.getStorageSync('keepWeek')
        if (res) {
          // console.log(res)
          if(res.keepWeek){
            that.setData({
              keepWeek: res.keepWeek,
              beginWeek: res.beginWeek,
              endWeek: res.endWeek
            })
          }
        }
      } catch (err) {
        console.log(err) 
      }
      beginWeek = this.data.beginWeek;
      endWeek = this.data.endWeek;
      let weekStr=beginWeek + '-' + endWeek;
      if(beginWeek==endWeek){
        weekStr=endWeek;
      }
      wx.setNavigationBarTitle({
        title: weekStr + '周(' + termList[0] + ')'
      })
      this.loadCourse(false);
    }).catch(res => {
      console.log(res)
    })

  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // console.log('onReady')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // console.log('onShow')
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
    // console.log('刷新')
    wx.showLoading({
      title: '刷新中',
    })
    this.loadCourse(true);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // console.log('上拉触底事件')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '佛大课程表'
    }
  }
})