import React, { Component, Fragment } from 'react';
import { Tabs, Select, Button, DatePicker, TreeSelect } from 'antd';
const { TreeNode } = TreeSelect;
const { MonthPicker } = DatePicker;
const { TabPane } = Tabs;
import connect from 'connect'
import YearPicker from '../../components/YearPicker'

import Personal from './Personal'
import Organization from './Organization'

@connect
class Progress extends Component {
  state = {
    activeKey:'personal',
    searchType:'按月统计',
    years: [],
    year:'',
    month:'',
    org_id: undefined
  }
  handleTypeChange = this.handleTypeChange.bind(this)
  handleYearChange = this.handleYearChange.bind(this)
  handleMonthChange = this.handleMonthChange.bind(this)
  handleOrgChange = this.handleOrgChange.bind(this)
  search = this.search.bind(this)
  render() { 
    return (
        <Fragment>
          <Tabs defaultActiveKey="personal" onChange={(e)=>this.handleTabChange(e)}>
            <TabPane tab="个人排名" key="personal">
              <Personal year={this.state.year} month={this.state.month} />
            </TabPane>
            <TabPane tab="组织排名" key="organization">
              <Organization year={this.state.year} month={this.state.month} />
            </TabPane>
          </Tabs>
          <div className='searchBlock'>
            <Select 
              value={this.state.searchType}
              onChange={this.handleTypeChange}
              defaultValue="按月统计" 
              style={{ width: 240, marginRight: '10px' }}
              suffixIcon={<i style={{fontSize:'12px'}} className='iconfont dangjiankaohe_icon_xialakuang'></i>}
            >
              <Option value="按月统计">按月统计</Option>
              <Option value="按年统计">按年统计</Option>
            </Select>
            {
              this.state.searchType==='按月统计'&&(
                <Select 
                onChange={this.handleMonthChange}
                placeholder='1-12月' 
                style={{ width: 240, marginRight: '10px' }}
                suffixIcon={<i style={{fontSize:'12px'}} className='iconfont dangjiankaohe_icon_xialakuang'></i>}
                >
                {
                  [1,2,3,4,5,6,7,8,9,10,11,12].map(item=>(
                      <Option key={item} value={item}>{item}</Option>
                  ))
                }
                </Select>
              )
            }
            {
              this.state.searchType==='按年统计'&&(
                <Select
                  placeholder="考核年度"
                  style={{ width: 240, marginRight: '10px' }}
                  onChange={this.handleYearChange}
                  suffixIcon={<i style={{fontSize:'12px'}} className='iconfont dangjiankaohe_icon_xialakuang'></i>}>
                    {
                      this.state.years.map(item=>(
                        <Option key={item} value={item}>{item}</Option>
                      ))
                    }
                </Select>
              )
            }
            {
              this.state.activeKey==='personal'&&(
                <TreeSelect
                  treeData={this.props.state.OrganizationList}
                  style={{ width: 240, marginRight: '10px' }}
                  value={this.state.org_id}
                  suffixIcon={<i style={{fontSize:'12px'}} className='iconfont dangjiankaohe_icon_xialakuang'></i>}
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                  placeholder='选择组织'
                  allowClear
                  treeDefaultExpandAll
                  onChange={this.handleOrgChange}
                />
              )
            }
            <Button className='searchBtn' onClick={this.search}><i className='iconfont dangjiankaohe_icon_sousuo'></i>查询结果</Button>
          </div>
        </Fragment>
      );
  }
  componentDidMount(){
    const date = new Date()
    const year = date.getFullYear()
    this.setArr(year)
    // this.props.handleChangeRankYear(year)
    this.props[`${this.state.activeKey}TableDataHttp`]({page:1,check_year:year})
    this.props.organizationListHttp()
    console.log(this.props.state)
  }
  setArr(year){
    let arr = []
    for (let i = year-10; i < year+10; i++) {
      arr.push(i)
    }
    this.setState({
      year: year,
      years: arr
    })
  }
  handleTabChange = (key)=>{
    this.setState({
      activeKey: key
    })
    this.props[`${key}TableDataHttp`]({
      page:1,
      check_year:this.state.year,
      check_month:this.state.month,
      org_id:key==='personal'?this.state.org_id:'',
    })
  }
  handleYearChange(year){
    console.log(this.props)
    this.setState({
      year: year,
      month: ''
    })
    // this.props.handleChangeRankYear(year)
    this.setArr(year)
  }
  handleMonthChange(month){
    const date = new Date()
    const year = date.getFullYear()
    this.setState({
      year: year,
      month: month
    })
  }
  handleTypeChange(type){
    this.setState({
      searchType: type
    })
  }
  handleOrgChange(orgId){
    console.log(orgId,8888888)
    this.setState({
      org_id: orgId
    })
  }
  search(){
    this.props[`${this.state.activeKey}TableDataHttp`]({
      page:1,
      check_year:this.state.year,
      check_month:this.state.month,
      org_id:this.state.org_id,
    })
  }
}

export default Progress;