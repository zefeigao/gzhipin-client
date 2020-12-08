// 显示指定用户列表的UI组件

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, WhiteSpace, WingBlank } from 'antd-mobile'

const Header = Card.Header
const Body = Card.Body

export default class UserList extends Component {

    static propTypes = {
        userList: PropTypes.array.isRequired
    }

    render() {

        const {userList} = this.props

        return (
            <WingBlank style={{marginBottom:55, marginTop:50}}>
                {
                    userList.map(user => (
                        <div key={user._id}>
                            <WhiteSpace />
                            <Card>
                                <Header
                                    thumb={require(`../../assets/images/${user.header?user.header:"头像1"}.png`).default}
                                    extra={user.username}
                                />
                                <Body>
                                    <div>职位：{user.post}</div>
                                    {user.company ? <div>公司：{user.company}</div> : null}
                                    {user.salary ? <div>月薪：{user.salary}</div> : null}
                                    <div>描述：{user.info}</div>
                                </Body>
                            </Card>
                        </div>
                    ))
                }
            </WingBlank>
        )
    }
}