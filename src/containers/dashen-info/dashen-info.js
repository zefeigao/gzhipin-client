// 大神信息完善的路由组件

import React, {Component} from 'react'
import { connect } from 'react-redux'
import { InputItem, NavBar, TextareaItem, Button } from 'antd-mobile'
import { Redirect } from 'react-router-dom'

import HeaderSelector from '../../components/header-selector/header-selector'
import {updateUser} from '../../redux/actions'

class DashenInfo extends Component {

    state = {
        header: '', // 头像名称
        post: '', // 职位
        info: '', // 个人或职位简介
    }

    setHeader = (header) => {
        this.setState({
            header,
        })
    }

    handleChange = (name, value) => {
        this.setState({
            [name]: value
        })
    }

    save = () => {
        // console.log(this.state);
        this.props.updateUser(this.state)
    }

    render () {
        // 如果信息已经完善，自动重定向到主页面
        const {header, type} = this.props.user
        if(header){
            const path = type === 'dashen' ? '/dashen' : '/laoban'
            return <Redirect to={path}/>
        }else{

        }

        return (
            <div>
                <NavBar>大神信息完善</NavBar>
                <HeaderSelector setHeader={this.setHeader}/>
                <InputItem placeholder="请输入求职岗位" onChange={val => {this.handleChange('post', val)}}>求职岗位:</InputItem>
                <TextareaItem 
                    title="个人介绍:"
                    rows={3} 
                    onChange={val => {this.handleChange('info', val)}}/>
                <Button type="primary" onClick={this.save}>保&nbsp;&nbsp;&nbsp;存</Button>
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user}),
    {updateUser}
)(DashenInfo)