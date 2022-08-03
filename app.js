// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    token: null,
    loginType: 1,
    registerType: 2,
    is_login: false,
    baseUrl: "http://localhost:8000",
    checkLoginUrl: "/account/checkLogin",
    phoneRegExp: "^1[34578]\d{9}$/",
    userInfo: null,
    phone: null
  },
  //检测是否已经登录
  checkLogin: function (callback) {
    var token = this.globalData.token
    if (!token) {
      //从数据缓存中获取token
      token = wx.getStorageSync('token')
      if (token) {
        this.globalData.token = token;
      } else {
        callback({
          is_login: false
        })
        return
      }
    }
    // 验证token是否过期
    wx.request({
      url: this.globalData.baseUrl + this.globalData.checkLoginUrl,
      data: {
        token: token
      },
      success: res => {
        callback({
          is_login: res.data.is_login
        })
      }
    })
  }
})

