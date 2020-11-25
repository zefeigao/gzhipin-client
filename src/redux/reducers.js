// 包含多个reducer函数，根据老的state和指定的action返回一个新的state

import { combineReducers } from 'redux'

function xx(state=0, action){
    
    return state
}

function yy(state=0, action){
    
    return state
}

// 返回合并的reducer函数

export default combineReducers({
    xx, 
    yy
})