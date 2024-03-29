// pages/index-course/course.js
var util = require('../../utils/util.js');      //引用外部的js文件
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navigators:[
      {
        text:"课程学习",
        imageUrl:"/images/learn.png",
        navigateTo:"",
    },
      {
        text: "课程文件",
        imageUrl: "/images/file.png",
        navigateTo: "../file_browser/file_browser?pos=predata",
      },
      {
        text: "课程作业",
        imageUrl: "",
        navigateTo: "",
      },
      {
        text: "基本信息",
        imageUrl: "",
        navigateTo: "",
      },
      {
        text: "签到记录",
        imageUrl: "",
        navigateTo: "",
      },
      {
        text: "交流答疑",
        imageUrl: "",
        navigateTo: "",
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.loadUrlPara(this,options)
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})