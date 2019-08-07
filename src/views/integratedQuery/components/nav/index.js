import React, { Component, Fragment } from 'react'
import connect from 'connect'
import { Link, withRouter } from 'react-router-dom'
import './nav.less'

@connect
@withRouter
class Nav extends Component {
  render() {
    const { location, nav } = this.props
    const { activePath } = this.props.state
    return (
      <Fragment>
        <ul className="nav">
          {
            nav.map((item,index)=>(
              <Link className={item.path==location.pathname?'navList active':'navList'} to={item.path} key={item.name+index}>
                <li >
                  <i>{item.name.substr(0, 1)}</i>
                  <span>{item.name}</span>
                </li>
              </Link>
            ))
          }
        </ul>
      </Fragment>
    )
  }
}

export default Nav