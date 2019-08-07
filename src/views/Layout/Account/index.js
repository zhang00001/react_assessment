import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu, Dropdown } from 'antd'
import connect from 'connect'
import './index.less'

function navToPassword(record){
    console.log(record)
    this.props.history.push(`/home/modifyPassword?id=${record.id}`)
}
function navToBasic(record){
    this.props.history.push(`/home/modifyInfo?id=${record.id}`)
}


@connect
@withRouter
export default class Account extends React.Component {
    
    navToPassword(record){
        console.log(record)
        this.props.history.push(`/modifyPassword`)
    }
    navToBasic(record){
        this.props.history.push(`/modifyInfo`)
    }
    render() {
        const {user} = this.props.state;
        console.log(this.props.state)
        console.log(user)
        const Item = Menu.Item;
        const menu = (history, clearUser) => (
            <Menu>
                <Item onClick={(user)=>this.navToPassword(user)}>修改密码</Item>
                <Item onClick={(user)=>this.navToBasic(user)}> 基本信息</Item>
            </Menu>
        );
        // user = this.props.state.user
        return (
            <div className="account_wrapper">
                <Dropdown overlay={menu(this.props.state.user, this.props.history, this.props.clearUser)} placement="bottomLeft">
                    <div style={{cursor: 'pointer'}} className="user"><img className="avatar" src={this.props.state.user ? this.props.state.user.avatar : ''}></img> <div className="name">{this.props.state.user ? this.props.state.user.name : ''} </div> <div className="des">{` ( ${this.props.state.user ? this.props.state.user.role_name : ''} )`}</div></div>
                </Dropdown>
            </div>
        )
    }
}