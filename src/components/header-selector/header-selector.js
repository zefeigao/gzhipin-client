// 选择用户头像的ui组件

import React, { Component } from 'react'
import {List, Grid} from 'antd-mobile'
import PropTypes from 'prop-types'

export default class HeaderSelector extends Component {

    static PropTypes = {
        setHeader: PropTypes.func.isRequired
    }

    state = {
        icon: null // 图片对象，初始没有值

    }

    constructor(props){
        super(props)
        // 准备需要显示的列表数据
        this.headerList = []
        for (var i = 0; i < 20; i++) {
            const text = `头像${i+1}`
            const icon = require(`../../assets/images/${text}.png`).default //不能使用import, 如果加载不出来就log一下看看数据类型
            this.headerList.push({text, icon})
        }
    }

    handleClick = ({text, icon}) => {
        //更新当前组件状态
        this.setState({icon})
        //调用函数更新父组件状态
        this.props.setHeader(text)
    }

    render () {
        const {icon} = this.state
        const listHeader = !this.state.icon ? "请选择头像" : 
            (<div>
                已选择头像:
                <img src={icon} />
            </div>)// 表头提示文字

        return(
            <div>
                <List renderHeader={() => listHeader}>
                    <Grid data={this.headerList}
                        columnNum={5}
                        onClick={this.handleClick}
                    />
                </List>
            </div>
        )
    }
}