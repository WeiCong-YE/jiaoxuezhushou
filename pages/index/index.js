//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    currentTab: 0,
    studied:[
      {
        url:"../index-course/course",
        imgurl:"/images/course.jpg",
        title:"语文",
        state:"本次开课已经结束",
      },
      {
        url: "../index-course/course",
        imgurl: "/images/course.jpg",
        title: "语文",
        state: "本次开课已经结束",
      }
    ]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  add_pressed:function(e){
    wx.showActionSheet({
      itemList: ['创建课程', '加入班级',],
      success(res) {
        console.log(res.tapIndex)
        switch (res.tapIndex){
          case 0:

          break;
          case 1:

          break;
        }
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },
  //点击切换 
  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) { return false; }
    else {
      that.setData({ currentTab: e.target.dataset.current })
    }
  },
     //滑动切换 
   swiperTab: function (e) {
    var that = this;
    that.setData(
      {
        currentTab: e.detail.current
      }
    );
  }
  ,
})
