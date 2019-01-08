//app.js
var MapiServer = "http://127.0.0.1:8888/api/"
App({
  apiServer: MapiServer,
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.setStorageSync("apiServer", MapiServer)
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: MapiServer + 'login/',
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: {
            code: res.code,
          },
          method: "POST",
          dataType: 'json',
          success: function (res) {
            console.log("request successs" + res.data['errCode'] + " " + res.data["3rd_session"])
            //storage 3rd_session
            //...
            wx.setStorageSync("sessionid", res.header["Set-Cookie"])
            //
            switch (res.data["errCode"]) {
              case 0b0000:
                // wx.navigateTo({
                //   url: '../bind/bind',
                // })
                wx.setStorageSync("loginStatus","notLogin")
                break;
              case 0b0001://re login  not get the openid maybe server error
              break;
              case 0b0100://student 
                // wx.navigateTo({
                //   url: '../student/index/index',//错误但是以后再说
                // })
                wx.setStorageSync("loginStatus","student")
                wx.setStorageSync("userInfo", JSON.parse( res.data["returnData"]))
                break;
              case 0b1000://teacher
                // wx.navigateTo({
                //   url: '../teacher/index/index',//错误但是以后再说
                // })
                wx.setStorageSync("loginStatus", "teacher")
                wx.setStorageSync("userInfo", JSON.parse(res.data["returnData"]))
                break;
              default:

            }

          },
          fail: function (err) {
            console.log("request fail ")
          }
          ,
          complete: function (err) {
            console.log("request complete ")
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})