/*
使用axios封装的ajax请求函数
函数返回的是promise对象
*/

import axios from 'axios'

export default function ajax(url, data = {}, type = 'GET'){
    if (type === 'GET'){ // 发送get请求
        // 拼请求参数的串
        // data: {username: Tom, password: 123}
        // paramStr: username=Tom&password=123
        let paramStr = ''
        Object.keys(data).forEach(
            key => {
                paramStr += key + '=' + data[key] + '&'
            }
        )
        if (paramStr !== '') {
            paramStr = paramStr.substring(0, paramStr.length - 1)
            url = url + '?' + paramStr
        }
        // 使用axios发get请求
        return axios.get(url)
    } else { // 发送post请求
        // 使用axios发post请求
        return axios.post(url, data) // data: 包含请求体数据的对象
    }
}