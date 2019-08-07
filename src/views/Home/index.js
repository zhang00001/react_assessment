import React from 'react'
import './index.less'
import  LeftSide from  './leftSide/leftSide'
import 	RightContent from './rightContent/RightContent'
export default () => (
	<div className="home_wrapper flex">
		<LeftSide />
		<RightContent />
	</div>
)