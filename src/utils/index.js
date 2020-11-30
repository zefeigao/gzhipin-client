// 包含n个工具函数的模块

/*
用户主界面路由：
    dashen: /dashen
    laoban: /laoban
用户完善界面路由：
    dashen: /dasheninfo
    laoban: laobaninfo
需要判断是否已经完善信息? user.header 是否有值
判断用户类型: user.type
*/

export function getRedirectTo(type, header){
    let path
    // type
    if (type === "laoban"){
        path = '/laoban'
    } else {
        path = '/dashen'
    }
    // header
    if (!header){
        path += 'info'
    }
    return path
}