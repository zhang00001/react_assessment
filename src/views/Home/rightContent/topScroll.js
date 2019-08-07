import React from 'react'
import { Icon,Empty } from 'antd';
import './scroll.less'
import connect from 'connect'
@connect
class TopScroll extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        const {IndexData} =this.props.state;
        var scrollList=[
          
        ]
        return(
            <div className='topScroll'>
                <div className={`noFormData ${Object.keys(IndexData.message).length==0?"show":'hide'}`}><Empty  /></div>
                <div className={` ${Object.keys(IndexData.message).length>0?"show":'hide'}`}>
                {
                    IndexData.message.map((el,index)=>{
                        if(index<=5){
                            return (
                                <li className="topScrollList flex" key={index}>
                                    <span className="name">{el.send_time}</span>
                                    {/* ${el.read_flag==0}?'read':'unread' */}
                                    <p className={`content flex-1 ${el.read_flag==0?'unread':'read'}`} ><span className="iconfont dangjiankaohe_icon_weidu"></span>{el.content}</p>
                                    <span className={`author ${el.read_flag==0?'unread':'read'}`} ><b>发布者:</b>{el.real_name}</span>
                                    <a className={`rightIcon ${el.read_flag==0?'unread':'read'}`} >
                                        <Icon type="arrow-right" />
                                    </a>
                                </li>
                            )
                        }
                        
                    })
                }
                </div>
               
            </div>
        )
    }
}
export default TopScroll