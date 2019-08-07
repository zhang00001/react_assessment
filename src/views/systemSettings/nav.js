import React from 'react'
import {Link,withRouter,Route} from 'react-router-dom'
import connect from 'connect'
import './page.less'
@connect
@withRouter
class NavBar extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        const Nav =[
            {
                path:'/systemSettings/zzgl',
                name:'组织管理'
            },
            {
                path:'/systemSettings/roleAdmin',
                name:'角色管理'
            },
            {
                path:'/systemSettings/userAdmin',
                name:'用户管理'
            },
            {
                path:'/systemSettings/levelAdmin',
                name:'分级管理'
            }
        ]
        const { location } = this.props;
        return(
                <div className='systemNavTab'>
                        {
                            Nav.map((el,index)=>{
                                return (
                                        <p className="systemList" key={el.path}>
                                            <Link to={el.path} key={el.path} 
                                            className={el.path==location.pathname?'active':''}>
                                             <span>{el.name.substr(0, 1)}</span> <b>{el.name}</b>
                                            </Link>
                                        </p> 
                                )
                            })
                        }
            </div>
        )
    }
}
export default NavBar