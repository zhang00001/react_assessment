import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import './index.less'
import connect from 'connect'
import Item from 'antd/lib/list/Item';


@withRouter
@connect
class BreadCrumbs extends React.Component {

    render() {
  
        let { routes } = this.props.state;
        return (
            <div className="sideBar">
                {routes.filter(e=>e.login==true&&!e.showOntab).map((el, index) =>{
                    return (<Link className={((this.props.location.pathname).indexOf(el.path+'/')===0)||el.path===this.props.location.pathname?'item active':'item'} key={index} to={el.path} >{el.name} </Link>) 
                }
                )}
            </div>
        )
    }
}


export default BreadCrumbs