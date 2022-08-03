//index.js
//获取应用实例
import { login } from '../../utils/requestAddress.js'
const utils = require('../../utils/util.js')
const app = getApp()
 let phone=''
 let password=''
 let loginUrl = app.globalData.baseUrl + app.globalData.loginUrl
Page({
  data: {
    phone: '',
    password: '',
    clientHeight:''
  },
  onLoad(){
    var that=this
    wx.getSystemInfo({ 
      success: function (res) { 
        console.log(res.windowHeight)
          that.setData({ 
              clientHeight:res.windowHeight
        }); 
      } 
    }) 
  },
  phone(e){
    phone=e.detail.value
  },
  password(e){
    password=e.detail.value
  },
  toRegister(){
    wx.navigateTo({
      url: '/pages/register/register',
    })
  },
  //登录事件
  goLogin(){
    let flag = false  //表示账户是否存在,false为初始值
    if(phone=='')
    {
      wx.showToast({
        icon:'none',
        title: '账号不能为空',
      })
    }else if(password==''){
      wx.showToast({
        icon:'none',
        title: '密码不能为空',
      })
    }else if(!utils.isPhone(phone)){
      wx.showToast({
        icon: 'none',
        title: '请填写正确的手机号',
      })
    }else{
      var that = this;

      login({
        phone: phone,
        password: password
      }).then(res => {
        console.log("login-res:"+res)
      }).catch(err => {
        console.log("login-err:"+err)
      })
    }
  },
})
 
