// pages/file_browser/file_browser.js
var util = require('../../utils/util.js');      //引用外部的js文件
Page({

  /**
   * 页面的初始数据
   */
  data: {
    files:[{

    },{

    }]
    ,
    navigators: [{
      text: "文件夹",
      imageUrl: "/images/learn.png",
      navigateTo: "",
    },
      {
        text: "word文档",
        imageUrl: "/images/learn.png",
        navigateTo: "",
      },
      {
        text: "excel文档",
        imageUrl: "/images/learn.png",
        navigateTo: "",
      },
      {
        text: "PPT",
        imageUrl: "/images/learn.png",
        navigateTo: "",
      },
    ]
  },


  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.loadUrlPara(this, options)
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
function file_extension_to_imgUrl(extension){
  switch(extension){
    case "txt":
      return "/images/files/txt.png"
    case "doc":
    case "docx":
      return "/images/files/word.png"
    case "xls":
    case "xlsx":
      return "/images/files/excel.png"
    case "ppt":
      return "/images/files/ppt.png"
    case "pdf":
      return "/images/files/pdf.png"
    case "rar":
    case "zip":
      return "/images/files/pdf.png"
    case "bmp":
    case "jpg":
    case "png":
    case "gif":
      return "/images/files/img.png"
    default:
      return "/images/files/file.png"
  }
}