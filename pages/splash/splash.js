// pages/splash/splash.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bg_img: '../../images/logo.png',//背景图地址，可相对/绝对，可本地/远程
    count: 4,//倒计时秒数
    show_button:false,//初始不显示跳过按钮
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    app.checkLogin;
    clearInterval(this.data.time);
    if(app.is_login){
      wx.switchTab({
        url: '/pages/home/home',
        success: (result)=>{
          
        },
        fail: ()=>{},
        complete: ()=>{}
      });
    }else{
      wx.navigateTo({
        url: '/pages/login/login',
        success: (result)=>{
          
        },
        fail: ()=>{},
        complete: ()=>{}
      });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  //延迟一秒显示跳转按钮
  show_button() {
    let that = this
    setTimeout(function() {
          that.setData({
                show_button: true
          })
    }, 1000)
},
//跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
switchTab() {
    clearInterval(this.data.time); //清除倒计时
    wx.switchTab({
          url: '/pages/home/home'
    })
},
//倒计时计数
countDown: function() {
    let that = this;
    let count = that.data.count;
    that.data.time = setInterval(function() {
          if (count > 0) {
                count--
                that.setData({
                      count: count
                })
          } else {
                that.setData({
                      count: count
                })
                that.switchTab();
                clearInterval(that.data.time)
          }
    }, 1000)
},
})