import React from 'react'
import './leftSide.less'
import LeftComponent from './leftComponent'
import { Menu, Dropdown, Icon } from 'antd';
import connect from 'connect'
@connect
class LeftSide extends  React.Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
        this.props.indexDatInit();
        // this.props.echartInit();
        
    }
    render(){
        
        const menu = (
            <Menu>
                <Menu.Item>党务工作人员</Menu.Item>
                <Menu.Item>党群管理者</Menu.Item>
                <Menu.Item>评价测试人员</Menu.Item>
                <Menu.Item>测试人员</Menu.Item>
            </Menu>
        );
        return(
            <div className='leftSide'>
                <p className="leftTop">
                    <span className="quickEnter">快速入口</span>
                    <Dropdown overlay={menu} className="dropDown">
                        <a className="ant-dropdown-link" href="#">
                            党务工作人员<Icon type="caret-down" />
                        </a>
                    </Dropdown>
                </p>
                <LeftComponent />
            </div>
        )
    }
}
export  default LeftSide;