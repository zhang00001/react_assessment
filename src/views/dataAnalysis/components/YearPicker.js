import React, { Component } from 'react';
import { Select, Button } from 'antd';
import connect from 'connect';
import './YearPicker.less'
@connect
class YearPicker extends Component {
  state = {
    options:[]
  }
  handleChange = this.handleChange.bind(this)
  searchByYear = this.searchByYear.bind(this)
  render() { 
    console.log(this.props,11)
    return (
      <div className='YearPicker'>
        <Select
          placeholder="考核年度"
          onChange={this.handleChange}
          suffixIcon={<i style={{fontSize:'12px'}} className='iconfont dangjiankaohe_icon_xialakuang'></i>}>
            {
              this.state.options.map(item=>(
                <Option key={item} value={item}>{item}</Option>
              ))
            }
        </Select>
        <Button className='searchBtn' onClick={this.searchByYear}><i className='iconfont dangjiankaohe_icon_sousuo'></i>查询结果</Button>
      </div>
    );
  }
  componentDidMount(){
    const date = new Date()
    const year = date.getFullYear()
    this.setArr(year)
  }
  setArr(year){
    let arr = []
    for (let i = year-10; i < year+10; i++) {
      arr.push(i)
    }
    this.setState({
      options: arr
    })
  }
  handleChange(year){
    console.log(this.props)
    this.props.handleChangeRankYear(year)
    this.setArr(year)
  }
  searchByYear(){
    const key = this.props.keyStr
    this.props[`${key}TableDataHttp`]({page:1,check_year:this.props.state.rankYear})
  }
}
 
export default YearPicker;