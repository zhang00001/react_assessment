import React from 'react'
import './content.less'
import RightTop from './rightTop'
import BottomLeft from './rightBottomLeft'
import BottomRight from './rightBottomRight'
class RightContent extends React.Component{
    render(){
        return(
            <div className="rightContent">
                <RightTop />
                <div className="rightContentBottom">
                    <BottomLeft />
                    <BottomRight />
                </div>
            </div>
        )
    }
}
export default RightContent