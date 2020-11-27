import React from 'react'
import { render } from 'react-dom'

import logo from 'logo.png'
import './logo.less'

export default function Logo() {
    return (
        <div className="logo-container">
            <img src={logo} alt="logo" className="logo-img"/>
        </div>
    )
}