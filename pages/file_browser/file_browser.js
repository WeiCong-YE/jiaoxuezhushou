// pages/file_browser/file_browser.js
var util = require('../../utils/util.js');      //引用外部的js文件
Page({

  /**
   * 页面的初始数据
   */
  data: {
    files:[{

    },{

    }],
    currentPath:""
    ,
    navigators: [{
      text: "文件夹",
      imageUrl: "/images/learn.png",
      navigateTo: "file_browser?pos=predata",
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
    if (this.data.predata.currpath!=null){
      if (this.data.predata.currpath==""){
        this.data.predata.currpath = this.data.predata.currpath  + options.folder
      }else{
      this.data.predata.currpath = this.data.predata.currpath+"/"+options.folder
    }
    }else{
      this.data.predata.currpath=""
    }
    util.mrequest_withSetaList(this, "file_browser", "files", { "courseID": this.data.predata["pk"], "dir": this.data.predata["currpath"] }, function (data, index) {
      // data["url"] = "../index-course/course?pos=studied&index=" + index
      data["imageUrl"] = file_extension_to_imgUrl(data["fileType"])
      data["text"] = data["fileName"]
      data["navigateTo"] = "file_browser?pos=predata&folder=" + data["fileName"]
      // data["state"] = "state"
      return data;
    })

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
  ,
  onOpenFile:function(evnet){
    var that=this;
    console.log(evnet.currentTarget.dataset.filename)
    var filetype = evnet.currentTarget.dataset.filetype
    var url;
    if (this.data.predata.currpath!=""){
      url = this.data.predata.currpath + "/" + evnet.currentTarget.dataset.filename
      }
    else{
      url = evnet.currentTarget.dataset.filename
    }
    console.log(wx.getStorageSync('apiServer') + "/" + "file_download?courseID=" + that.data.predata.pk + "&dir=" + url )
    wx.downloadFile({
      // 示例 url，并非真实存在
      url: wx.getStorageSync('apiServer') + "/" + "file_download?courseID="+that.data.predata.pk+"&dir="+url,
      success(res) {
        const filePath = res.tempFilePath
        console.log("下载完成")
        wx.openDocument({
          filePath, fileType: filetype.substring(1),
          success(res) {
            console.log('打开文档成功')
          },fail(res){
            console.log('打开文档失败')
          }
        })
      }
    })

  }
  
})
function file_extension_to_imgUrl(extension){
  switch(extension){
    case ".txt":
      return "/images/files/txt.png"
    case ".doc":
    case ".docx":
      return "/images/files/word.png"
    case ".xls":
    case ".xlsx":
      return "/images/files/excel.png"
    case ".ppt":
    case ".pptx":
      return "/images/files/ppt.png"
    case ".pdf":
      return "/images/files/pdf.png"
    case ".rar":
    case ".zip":
      return "/images/files/rar.png"
   
    case ".jpg":
    case ".png":
    case ".gif":
    case ".bmp":
      return "/images/files/img.png"
    case "folder":
      return "/images/files/folder.png"
    default:
      return "/images/files/file.png"
  }
}