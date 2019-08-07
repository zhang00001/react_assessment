import React from 'react'
import BreadCrumbs from './BreadCrumbs'
import TabViews from './TabViews'
import Account from './Account'
import './index.less'
import connect from 'connect'
import { Cookie } from 'utils/storage'
import { Badge, Icon } from 'antd'

@connect
export default class extends React.Component {
    componentDidMount(){
       this.props.initUnread();
    }
    navToNews(){
        this.props.history.push(`/news`)
    }
    render() {
        const { children, state, history, clearUser } = this.props
        const {unreadnews} =this.props.state
        console.log(unreadnews)
        return (
            <div>
                <div id="container" className={state.collapsed ? 'collapsed' : ''}>
                    <header className="layout-header">
                        <div className="layout-header-bar">
                            <div className="left">
                                <div className="logo iconfont dangjiankaohe_logo"></div>
                                <BreadCrumbs className='breadCrumbs' />
                            </div>
                            <div className="accountEnd">
                                <Account />
                            </div>
                            <div className="end">
                                <i className="iconfont dangjiankaohe_icon_xiaoxi" onClick={()=>this.navToNews()}></i>
                                <i className="iconfont dangjiankaohe_icon_tuichu" onClick={e => {
                                    Cookie.remove('Auth_Token')
                                    clearUser()
                                    history.push('/login')
                                }}></i>
                            </div>
                        </div>
                        <div className="layout-header-tabs">
                            <i style={{color:'#eee'}} className="goBack iconfont dangjiankaohe_icon_fanhui" onClick={() => this.props.history.goBack()}></i>
                            <div className="leftPoint"> <TabViews /></div>
                            <i className="refresh iconfont dangjiankaohe_icon_shuaxin" onClick={() => window.location.reload()}><span>刷新</span></i>
                        </div>
                    </header>
                    <main>
                        {children}
                    </main>
                    <div className="fixeNews">
                            <div className="newsItem" onClick={()=>this.navToNews()}>
                                <Badge count={unreadnews.obj}>
                                    <a  className="iconfont xiaoxi" />
                                </Badge>
                                <p className="unreadNews">未读消息</p>
                            </div>
                    </div>
                </div>
            </div>
        )
    }
    componentDidMount(){
      window.HISTORY = this.props.history
    }
}

