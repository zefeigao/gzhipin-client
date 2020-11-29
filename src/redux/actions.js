const { createPortal } = require("react-dom")

// 包含n个action creator
// 同步action
// 异步action

import { reqRegister, reqLogin } from '../api'
import {AUTH_SUCCESS, ERROR_MSG} from './action-types'

// 授权成功的同步action
const authSuccess = (user) => ({type: AUTH_SUCCESS, data: user})
// 错误提示信息的同步action
const errorMsg = (msg) => ({type: ERROR_MSG, data: msg})

// 注册异步action
export const register = (user) => {
    const {username, password, password2, type} = user
    // 做表单的前台验证，如果不通过，分发一个errorMsg的同步action
    if (!username){
        return errorMsg('用户名不能为空！')
    }
    else if (password !== password2){
        return errorMsg('两次密码不一致！')
    }
    // 表单数据合法，返回一个发ajax请求的异步action函数
    return async dispatch => {
        //发送注册的异步ajax请求

        // 下面是promise的写法
        // const promise = reqRegister(user)
        // promise.then(response => {
        //     const result = response.data // {code:0/1, data:user, msg:''}
        // })

        const response = await reqRegister({username, password, type}) // 如果写await，函数就必须是async
        const result = response.data // {code:0/1, data:user, msg:''}
        if (result.code === 0) { // 成功
            // 分发授权成功的同步action
            dispatch(authSuccess(result.data))
        } else { // 失败
            // 分发错误提示的同步action
            dispatch(errorMsg(result.msg))
        }
    }
}

// 登陆异步action
export const login = (user) => {
    const {username, password} = user
    // 做表单的前台验证，如果不通过，分发一个errorMsg的同步action
    if (!username){
        return errorMsg('用户名不能为空！')
    }
    else if (!password){
        return errorMsg('密码不能为空！')
    }
    // 表单数据合法，返回一个发ajax请求的异步action函数
    return async dispatch => {
        //发送注册的异步ajax请求

        // 下面是promise的写法
        // const promise = reqRegister(user)
        // promise.then(response => {
        //     const result = response.data // {code:0/1, data:user, msg:''}
        // })

        const response = await reqLogin(user) // 如果写await，函数就必须是async
        const result = response.data
        if (result.code === 0) { // 成功
            // 分发授权成功的同步action
            dispatch(authSuccess(result.data))
        } else { // 失败
            // 分发错误提示的同步action
            dispatch(errorMsg(result.msg))
        }
    }
}