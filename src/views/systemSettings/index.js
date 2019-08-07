import React from 'react'
import PageIndex from './systemPage'
// import {router} from 'react-router-dom'
import './index.less'
import NavBar from './nav'
export default () => (
	<div className="setting_wrapper">
		<NavBar  />
		<PageIndex/>
	</div>
)