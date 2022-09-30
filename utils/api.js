import {post} from './request'

export const login = data => post('/account/login',data)

