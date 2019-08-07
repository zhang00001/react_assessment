import React from 'react'
import './top.less'
import { Icon } from 'antd';
import TopScroll from './topScroll'
class RightTop extends React.Component{
    render(){
        return(
            <div className="rightTop">
               <p className="topHeader">
                   <span>待办工作</span>
                   <a >
                       <Icon type="plus" />
                       查看更多
                   </a>
               </p>
                <TopScroll />
            </div>
        )
    }
}
export default RightTop