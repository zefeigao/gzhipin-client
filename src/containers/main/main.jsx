// 主界面的路由组件

import React, {Component} from 'react'
import { Switch,Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Cookies from 'js-cookie' // 可以操作前端cookie的对象，set()/get()/remove()

import LaobanInfo from '../laoban-info/laoban-info'
import DashenInfo from '../dashen-info/dashen-info'
import {getRedirectTo} from '../../utils'
import {getUser} from '../../redux/actions'

class Main extends Component {

    componentDidMount(){
        // 如果登陆过(cookie中有userid)，但没有登录(redux管理的user中没有_id)，发请求获得对应的user
        const userid = Cookies.get('userid')
        const {_id} = this.props.user
        if(userid && !_id){
            // 发送异步请求，获取user
            this.props.getUser()
        }
    }

    render() {
        // 读取cookie中的userid
        const userid = Cookies.get('userid') 
        // 如果没有，自动重定向到登录界面
        if (!userid){ 
            return <Redirect to='/login/'/>
        } 
        // 如果有，读取redux中的user状态
        const {user} = this.props
        // debugger
        if(!user._id){ // 如果user没有_id，返回null，componentDidMount()已经处理过，等待异步请求user返回
            return null
        } else{ // 如果user有_id，显示对应的界面
            // 如果请求根路径，根据user的type和header来计算出一个重定向的路径，自动重定向
            let path = this.props.location.pathname
            if (path === '/'){
                path = getRedirectTo(user.type, user.header)
                return <Redirect to={path} />
            }
        }
        return(
            <div>
                <Switch>
                    <Route path='/laobaninfo' component={LaobanInfo}></Route>
                    <Route path='/dasheninfo' component={DashenInfo}></Route>
                </Switch>
            </div>
            
        )
    }
}

export default connect(
    state => ({user: state.user}),
    {getUser}
)(Main)

/*
1. 实现自动登录：
    1. componentDidMount()
        如果登陆过(cookie中有userid)，但没有登录(redux管理的user中没有_id)，发请求获得对应的user，
    2. render()
        1）.如果cookie中没有userid，直接重定向到login，
        2）.判断redux管理的user中是否有_id，如果没有，暂时不做任何显示，
        3）.如果有，说明当前已经登录，显示对应的界面
        4）.如果请求根路径，根据user的type和header来计算出一个重定向的路径，自动重定向
 */