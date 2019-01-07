// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    studied: [],
    count: 3,
    day: 1,
    userImgSize: 160,
    styStateAnimation: {},
    userImgAnimation: {},
    hidden: "false",
    navigators: [
      
      {
        text: "最近文件",
        imageUrl: "/images/file.png",
        navigateTo: "",
      },
      {
        text: "身份绑定",
        imageUrl: "",
        navigateTo: "",
      },
      {
        text: "签到",
        imageUrl: "",
        navigateTo: "",
      },
      {
        text: "关于",
        imageUrl: "",
        navigateTo: "",
      },
      
    ]
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

  },
  scrooll: function (e) {
    var that = this,
      top = e.detail.scrollTop,
      hid = "false",
      ratio = 1 - top / that.data.userImgSize,
      animation = {},   //文字动画
      headAmt = {};     //头像动画    

    console.log(e);
    console.log("比率" + ratio);
    if (top > 400 - 130) {                   //upper过多
      hid = "true";
    } else {
      animation = wx.createAnimation({
        transformOrigin: "50% 50%",
        timingFunction: "linear",
        delay: 0
      });
      animation.scale(ratio, ratio).opacity(ratio).step();

      headAmt = wx.createAnimation({
        transformOrigin: "50% 50%",
        timingFunction: "linear",
        delay: 0
      });
      headAmt.scale(ratio, ratio).opacity(ratio).translateY(top * 2).step();//2是因为为rpx与px的原因 
    }
    that.setData({
      hidden: hid,
      styStateAnimation: animation.export(),
      userImgAnimation: headAmt.export(),
    });
    console.log(that.data);
  }
})