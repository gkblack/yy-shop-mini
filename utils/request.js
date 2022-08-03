// const { rejects } = require("assert");
// const { resolve } = require("path");

const app = getApp();
let serverUrl = app.globalData.baseUrl;
let loginType = app.globalData.loginType;
let registerType = app.globalData.registerType;
let flag = true; 
//通过flag是判断用户是否登录以及token过期后再次登录的参数

// 构建请求头
function CreateHeader(url, type){
    let header = {}
	if (type == 'POST') {
		header = {
			'content-type': 'application/json',
			'token': wx.getStorageSync('token')
		}
	} else {
		header = {
			'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
			'token': wx.getStorageSync('token')
		}
	}
	return header;
}

function postRequest(url, data, type){
  
    let header = CreateHeader(url, 'POST');
    if(type == null){
        wx.showLoading({
            title: "加载数据中...",
            mask: true,
        });
    }
    return new Promise((resolve, reject) => {
        wx.request({
            url: serverUrl + url,
            data: data,
            header: header,
            method: 'POST',
            dataType: 'json',
            success: (res)=>{
                console.log("res:"+ res)
                if(type == null){
                    wx.hideLoading();
                }
                var data = res.data;
                if(data.code == 200){
                    if(type == loginType){
                        // 保存token
                        wx.setStorage({
                            key: 'token',
                            data: data.token,
                        });
                        wx.showToast({
                            title: data.message,
                            icon: 'none',
                            duration: 1500,
                        })
                        wx.switchTab({
                            url: 'pages/home/home',
                        })
                    }else if (type == registerType){
                        wx.showToast({
                            title: data.message,
                            icon: 'none',
                            duration: 1500,
                        })
                        wx.navigateTo({
                            url: 'pages/login/login',
                        })
                    }
                }
                // token过期
                if(data.code == 304){
                    if(flag){
                        flag = false;
                        wx.showToast({
                            title: '请先登录',
                            icon: 'none',
                            duration: 1500,
                            success() {
                                var timer = setTimeout(function () {
                                    flag = true;
                                    // 跳转登录
                                    wx.navigateTo({
                                        url: '/pages/login/login',
                                    })
                                    
                                    clearTimeout(timer)
                                }, 1600);
                            }
                        })
                    }
                }else if(data.statusCode == 500){
                    wx.showToast({
                        title: data.message,
                        icon: 'none',
                        duration: 1500,
                    })
                }
                reject(data)
            },
            fail: (res)=>{
                if(type == null){
                    wx.hideLoading();
                }
                reject(res)
            },
            complete: ()=>{}
        });
    })

}

function getRequest(url){
    let header = CreateHeader(url, 'GET');
    return new Promise((resolve, reject) => {
        wx.request({
            url: serverUrl + url,
            data: '',
            header: header,
            method: 'GET',
            success: (res)=>{
                var data = res.data;
                if(data.code == 200){
                    
                }
                // token过期
                if(data.code == 304){
                    if(flag){
                        flag = false;
                        wx.showToast({
                            title: '请先登录',
                            icon: 'none',
                            duration: 1500,
                            success() {
                                var timer = setTimeout(function () {
                                    flag = true;
                                    // 跳转登录
                                    wx.navigateTo({
                                        url: '/pages/login/login',
                                    })
                                    
                                    clearTimeout(timer)
                                }, 1600);
                            }
                        })
                    }
                }else if(data.statusCode == 500){
                    wx.showToast({
                        title: data.message,
                        icon: 'none',
                        duration: 1500,
                    })
                }
                reject(data)
            },
            fail: (res)=>{
                reject(data)
            },
            complete: ()=>{}
        });
    })
}

module.exports = {
    postRequest,
    getRequest,
}