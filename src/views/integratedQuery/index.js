import React,{ Component } from 'react'
import './index.less'
import Nav from './components/nav'
import QueryCategory from './pages/queryCategory'
import QueryCompany from './pages/queryCompany'
import QueryRecord from './pages/queryRecord'
import { Route } from 'react-router-dom'


export default () => (
  <div className=" aclogSearch">
    <Nav nav={[
      {
        name:'考核目录查询',
        path:'/integratedQuery/queryCategory'
      },
      {
        name:'考核记录查询',
        path:'/integratedQuery/queryRecord'
      },
      {
        name:'企业报告查询',
        path:'/integratedQuery/queryCompany'
      },
    ]} />
    <div className='content'>
        <Route path={`/integratedQuery/queryCategory`} component={QueryCategory} /> 
        <Route path={`/integratedQuery/queryRecord`} component={QueryRecord}/>  
        <Route path={`/integratedQuery/queryCompany`} component={QueryCompany}/>  
    </div>
  </div>
)