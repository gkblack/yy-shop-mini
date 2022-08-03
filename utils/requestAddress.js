import { postRequest } from './request'

const app = getApp();
let loginType = app.globalData.loginType;
let registerType = app.globalData.registerType;

export const login = data => postRequest('/account/login',data,loginType)
export const register = data => postRequest('/account/register',data,registerType)