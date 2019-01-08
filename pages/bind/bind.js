// pages/bind/bind.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userTypes: ["学生", "老师",],
    userTypeIndex: 0,
  },
  /**
   * 提交绑定数据
   */
  formSubmit:function(e){

    wx.request({
      url: getApp().apiServer  + 'bind',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': wx.getStorageSync("sessionid")//读取cookie
      },
      data: e.detail.value,
      method: "POST",
      dataType: 'json',
      success: function (res) {
        console.log("request successs" + res.data['errCode'] + " " + res.data["returnValue"])
        if (res.data["returnValue"]==1){//bind success
          wx.showToast({
            title: '绑定身份成功，欢迎你',
          })
         
        }else{
          console.error("bind fail please check the errCode")
          wx.showToast({
            title: '绑定身份失败',
            image: '/res/pic/fail.png'
          })
        }
      },
      fail: function (err) {
        console.log("request fail ")
        wx.showToast({
          title: '网络连接失败',
          image:'/res/pic/fail.png'
        })
      }
      ,
      complete: function (err) {
        console.log("request complete ")
      }
    })
  },
  bindUserTypeChange: function (e) {
    console.log('picker country 发生选择改变，携带值为', e.detail.value);

    this.setData({
      userTypeIndex: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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