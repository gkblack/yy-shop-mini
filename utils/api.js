import {post} from './request'

export const login = data => post('/account/login',data)
export const register = data => post('/account/register',data)
