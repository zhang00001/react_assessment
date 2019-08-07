import React, { Component, Fragment } from 'react';
import { Tabs } from 'antd';
const { TabPane } = Tabs;
import connect from 'connect'
import YearPicker from '../../components/YearPicker'

import Last from './Last'
import Best from './Best'

@connect
class Analysis extends Component {
  state = {
    activeKey:"last"
  }
  render() { 
    return (
        <Fragment>
          <Tabs defaultActiveKey="last" onChange={(e)=>this.handleTabChange(e)}>
            <TabPane tab="最差TOP10" key="last">
              <Last />
            </TabPane>
            <TabPane tab="最优TOP10" key="best">
              <Best />
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
    console.log(this.props.state.rankYear,'============================')
    this.props[`${this.state.activeKey}TableDataHttp`]({page:1,check_year:year})
  }
  handleTabChange = (key)=>{
    this.setState({
      activeKey: key
    })
    this.props[`${key}TableDataHttp`]({page:1,check_year:this.props.state.rankYear})
  }
}

export default Analysis;