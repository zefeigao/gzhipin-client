import React, { Component } from 'react'
import {
    NavBar,
    WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Radio,
    Button
} from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { register } from '../../redux/actions'
import Logo from '../../components/logo/logo'

const ListItem = List.Item

class Register extends Component {
    state = {
        username: '', 
        password: '',
        password2: '', //确认密码
        type: 'dashen', //用户类型
    }

    handleChange = (keyword, val) => {
        this.setState({
            [keyword]: val // 这里keyword是字符串，要加中括号表示变量
        })
    }
    // 点击注册调用
    register = () => {
        // console.log(this.state);
        this.props.register(this.state)
    }

    toLogin = () => {
        this.props.history.replace('/login')
    }

    render() {
        const {type} = this.state
        const {msg, redirectTo} = this.props.user
        // 如果redirectTo有值，就需要重定向到指定到路由
        if (redirectTo){
            return <Redirect to={redirectTo}></Redirect>
        }
        return (
            <div>
                <NavBar>硅&nbsp;谷&nbsp;直&nbsp;聘</NavBar>
                <Logo />
                <WingBlank>
                    <List>
                        {msg ? <div className='error-msg'>{msg}</div> : null}
                        <WhiteSpace />
                        <InputItem placeholder='请输入用户名' onChange={val => {this.handleChange('username', val)}}>用户名：</InputItem>
                        <WhiteSpace />
                        <InputItem placeholder='请输入密码' type="password" onChange={val => {this.handleChange('password', val)}}>密&nbsp;&nbsp;&nbsp;码：</InputItem>
                        <WhiteSpace />
                        <InputItem placeholder='请输入确认密码' type="password" onChange={val => {this.handleChange('password2', val)}}>确认密码：</InputItem>
                        <WhiteSpace />
                        <ListItem>
                            <span>用户类型：</span> &nbsp;&nbsp;&nbsp;
                            <Radio checked={type==='dashen'} onChange={val => {this.handleChange('type', 'dashen')}}>大神</Radio>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Radio checked={type==='laoban'} onChange={val => {this.handleChange('type', 'laoban')}}>老板</Radio>
                        </ListItem>
                        <WhiteSpace />
                        <Button type="primary" onClick={this.register}>注&nbsp;&nbsp;&nbsp;册</Button>
                        <WhiteSpace />
                        <Button onClick={this.toLogin}>已有账户</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user}),
    {register}
)(Register)