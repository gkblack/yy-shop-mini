//index.js
//获取应用实例
const { register } = require('../../utils/requestAddress.js')
const utils = require('../../utils/util.js')
const app = getApp()
 let phone=''
 let password=''
Page({
  data: {
    phone: '',
    password: '',
    clientHeight:''
  },
  onLoad(){
    var that=this
    // wx.getSystemInfo({ 
    //   success: function (res) { 
    //     console.log(res.windowHeight)
    //       that.setData({ 
    //           clientHeight:res.windowHeight
    //     }); 
    //   } 
    // }) 
  },
  //获取输入框内容
  getPhone(e){
    console.log("phone:"+ e.detail.value);
    phone=e.detail.value
  },
  getPassword(e){
    console.log("password:"+e.detail.value)
    password=e.detail.value
  },
  //注册事件
  goRegister(){
    console.log("goRegister")
    let flag = false  //表示账户是否存在,false为初始值
    if(phone=='')
    {
      wx.showToast({
        icon:'none',
        title: '手机号不能为空',
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
      register({
        phone: phone,
        password: password
      }).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
      // wx.request({
      //   url: registerUrl,
      //   data: {
      //     phone: phone,
      //     password: password
      //   },
      //   header: {'content-type':'application/json'},
      //   method: 'POST',
      //   dataType: 'json',
      //   responseType: 'text',
      //   success: (result)=>{
      //     if(result.data.resultCode == 200){
      //       wx.showToast({
      //         icon: 'none',
      //         title: '注册成功',
      //       })
      //       var session=db.session[result.data.token];
      //       wx.reLaunch({
      //         url: '/pages/login/login',
      //       })
      //       wx.switchTab({
      //         url: '/pages/home/home',
      //         success: function(res){
      //           // success
      //         },
      //         fail: function() {
      //           // fail
      //         },
      //         complete: function() {
      //           // complete
      //         }
      //       })
      //     }
      //   },
      //   fail: ()=>{},
      //   complete: ()=>{}
      // });
    }
  },
})