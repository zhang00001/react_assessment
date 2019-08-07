import React from 'react'
import connect from 'connect'
import { Link, withRouter } from 'react-router-dom'
import './index.less'
import { Breadcrumb } from 'antd';

@connect
@withRouter
class TabViews extends React.Component {

    render() {
        let { state, delTabView, location } = this.props
        let pathname = location.pathname;
        let number = '1561629085448';
        // console.log(state.tabViews)
        return (
                <Breadcrumb>
                <span className="position">当前位置：</span>
                {/* {state.tabViews.filter(e => e.path == this.props.location.pathname).map((tab, index) =>
                    <Breadcrumb.Item key={tab.path} ><Link to={tab.path}>{tab.name}</Link></Breadcrumb.Item>
                )} */}
                  {state.tabViews.filter(e => e.path == this.props.location.pathname).map((tab, index) =>
                    <Breadcrumb.Item key={tab.path} ><Link to={tab.path}>{tab.name}</Link></Breadcrumb.Item>
                )}
                 </Breadcrumb>
  
        )
    }
}

export default TabViews