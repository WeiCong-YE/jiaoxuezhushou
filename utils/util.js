const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  mrequest: mrequest,
  jsonPK: jsonPK,
  jsonFields: jsonFields,
  mrequest_withSetdata: mrequest_withSetdata,
  mrequest_withoutSetdata: mrequest_withoutSetdata,
  loadUrlPara: loadUrlPara,
}



function jsonPK(json, field) {
  return json["pk"]
}
function jsonFields(json, field) {
  return json["fields"][field]
}
function mrequest(subUrl, successFunc, postData) {

  var loginStatus = wx.getStorageSync("loginStatus")
  switch (loginStatus){
    case "notLogin":
    return;
  }
  wx.request({
    url: getApp().apiServer + subUrl,
    header: {
      "Content-Type": "application/x-www-form-urlencoded",
      'cookie': wx.getStorageSync("sessionid")//读取cookie
    },
    data: postData,
    method: "POST",
    dataType: 'json',
    success: function (res) {
      successFunc(res)

    },
    fail: function (err) {
      console.log("request fail ")
      wx.showToast({
        title: '网络连接失败',
        image: '/images/fail.png'
      })
    }
    ,
    complete: function (err) {
      console.log("request complete ")
    }
  })
}
//一个包装好的函数用户网络get数据
function mrequest_withSetdata(that,subUrl, pos, postData,eachFunc,callbackfunc) {
  mrequest(wx.getStorageSync('loginStatus')+"/"+subUrl, function (res) {
    console.log("request successs" + res.data['errCode'] + " " + res.data["returnValue"])
    if (res.data["returnValue"] == 1) {//bind success
      var retData = JSON.parse(res.data["returnData"])
      console.log(retData)
      var showData = []
      for (var index = 0; index < retData.length; index++) {//写一个传入json传出json的
        // var courseID = util.jsonPK(retData[index], "courseID")
        // var courseName = util.jsonFields(retData[index], "courseName")
        // var courseCreator = util.jsonFields(retData[index], "courseCreator")
        // var count = util.jsonFields(retData[index], "count")
        var data=retData[index]["fields"]
        data["pk"] = retData[index]["pk"]
        data = eachFunc(data,index)

        showData.push(data)
      }
      that.setData({
        [pos]: showData
      })
      if(typeof callbackfunc == 'function'){
        callbackfunc()
      }
    } else {
      console.error("request fail")
    }

  }, postData)
}

//一个包装好的函数用户网络get数据
function mrequest_withoutSetdata(subUrl, postData, success,fail) {
  mrequest(wx.getStorageSync('loginStatus') + "/"+subUrl, function (res) {
    console.log("request successs" + res.data['errCode'] + " " + res.data["returnValue"])
    if (res.data["returnValue"] == 1) {//bind success
      if (typeof success == 'function') {
        success()
      }
    } else {
      if (typeof fail == 'function') {
        fail()
      }
      console.error("request fail")
    }

  }, postData)
}

function loadUrlPara(that,options){

  let pages = getCurrentPages();
  var prevPage;
  if (pages.length >= 2) {
    prevPage = pages[pages.length - 2];
  }
  console.log(options.index)
  if (options.index==null){
    var predata = prevPage.data[options.pos]
  }
  else{
  var predata =  prevPage.data[options.pos][options.index]
  }
  that.setData({
    predata
  })
}