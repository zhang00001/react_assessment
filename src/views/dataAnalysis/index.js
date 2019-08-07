import React from 'react'
import './index.less'
import Nav from '../assessmentCatalog/components/Nav'
import Rank from './pages/Rank/index'
import Analysis from './pages/Analysis/index'
import Progress from './pages/Progress/index'
import { Route } from 'react-router-dom'

export default () => (
	<div className="dataAns">
    <Nav nav={[
      {
        name:'考核排行榜',
        path:'/dataAnalysis/Rank'
      },
      {
        name:'考核数据分析',
        path:'/dataAnalysis/Analysis'
      },
      {
        name:'内评工作进度',
        path:'/dataAnalysis/Progress'
      }
    ]} />
    <div className='content'>
        <Route path={`/dataAnalysis/Rank`} component={Rank}/>  
        <Route path={`/dataAnalysis/Analysis`} component={Analysis}/>  
        <Route path={`/dataAnalysis/Progress`} component={Progress}/>  
    </div>
	</div>
)