import React, { Component, Fragment } from 'react';
import { Tabs } from 'antd';
const { TabPane } = Tabs;
import connect from 'connect'
import YearPicker from '../../components/YearPicker'

import PartyBuild from './PartyBuild'
import Sence from './Sence'
import Daily from './Daily'
import Initial from './Initial'
import Add from './Add'
import Sub from './Sub'
import Down from './Down'

@connect
class Rank extends Component {
  state = {
    activeKey:"partyBuild"
  }
  render() { 
    return ( 
      <Fragment>
        <Tabs defaultActiveKey="partyBuild" onChange={(e)=>this.handleTabChange(e)}>
          <TabPane tab="党建考核排行榜" key="partyBuild">
            <PartyBuild />
          </TabPane>
          <TabPane tab="现场考核排行榜" key="sence">
            <Sence />
          </TabPane>
          <TabPane tab="日常落实排行榜" key="daily">
            <Daily />
          </TabPane>
          <TabPane tab="初评分值排行榜" key="initial">
            <Initial />
          </TabPane>
          <TabPane tab="加分排行榜" key="add">
            <Add />
          </TabPane>
          <TabPane tab="减分排行榜" key="sub">
            <Sub />
          </TabPane>
          <TabPane tab="降档排行榜" key="down">
            <Down />
          </TabPane>
        </Tabs>
        <YearPicker keyStr={this.state.activeKey}/>
      </Fragment>
     );
  }
  componentDidMount(){
    const date = new Date()
    const year = date.getFullYear()
    this.props.handleChangeRankYear(year)
    console.log(year,this.props.state.rankYear,'============================')
    this.props[`${this.state.activeKey}TableDataHttp`]({page:1,check_year:year})
  }
  handleTabChange = (key)=>{
    this.setState({
      activeKey: key
    })
    this.props[`${key}TableDataHttp`]({page:1,check_year:this.props.state.rankYear})
  }
}
 
export default Rank;