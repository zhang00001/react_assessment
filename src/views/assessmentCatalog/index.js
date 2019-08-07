import React,{ Component } from 'react'
import './index.less'
import Nav from './components/Nav'
import Catalog from './pages/Catalog/index'
import AddClass from './pages/AddClass/index'
import SubClass from './pages/SubClass/index'
import DownClass from './pages/DownClass/index'
import { Route } from 'react-router-dom'


export default () => (
  <div className="aclog">
    <Nav nav={[
      {
        name:'考核目录',
        path:'/assessmentCatalog/Catalog'
      },
      {
        name:'加分项',
        path:'/assessmentCatalog/AddClass'
      },
      {
        name:'减分项',
        path:'/assessmentCatalog/SubClass'
      },
      {
        name:'降档项',
        path:'/assessmentCatalog/DownClass'
      }
    ]} />
    <div className='content'>
        <Route path={`/assessmentCatalog/Catalog`} component={Catalog}/>  
        <Route path={`/assessmentCatalog/AddClass`} component={AddClass}/>  
        <Route path={`/assessmentCatalog/SubClass`} component={SubClass}/>  
        <Route path={`/assessmentCatalog/DownClass`} component={DownClass}/>
    </div>
  </div>
)