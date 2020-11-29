import React, { Component } from 'react'
import {
    NavBar,
    WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Button
} from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { login } from '../../redux/actions'
import Logo from '../../components/logo/logo'

const ListItem = List.Item

class Login extends Component {
    state = {
        username: '', 
        password: '',
    }

    handleChange = (keyword, val) => {
        this.setState({
            [keyword]: val // 这里keyword是字符串，要加中括号表示变量
        })
    }

    login = () => {
        // console.log(this.state);
        this.props.login(this.state)
    }

    toRegister = () => {
        this.props.history.replace('/register')
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
                        <Button type="primary" onClick={this.login}>登&nbsp;&nbsp;&nbsp;录</Button>
                        <WhiteSpace />
                        <Button onClick={this.toRegister}>还没有账户</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user}),
    {login}
)(Login)