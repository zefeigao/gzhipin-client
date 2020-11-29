// 主界面的路由组件

import { Switch } from 'antd-mobile'
import React, {Component} from 'react'
import { Route } from 'react-router-dom'

import LaobanInfo from '../laoban-info/laoban-info'
import DashenInfo from '../dashen-info/dashen-info'

export default class Main extends Component {
    render() {
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