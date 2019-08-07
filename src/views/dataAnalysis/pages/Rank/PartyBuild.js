import React, { Component, Fragment } from 'react';
import { Progress, Button, Table, message } from 'antd';
import axios from 'axios';
import connect from 'connect'
import * as XLSX from 'xlsx'
import { download } from '../../../../utils/excel.js'

@connect
class PartyBuild extends Component {
  state={
    exportLoading: false
  }
  render() { 
    const { PartyBuildTableData, PartyBuildChart } = this.props.state
    const columns =  [
      {
        title: '排名',
        dataIndex: 'sort_order',
        key: 'sort_order',
      },
      {
        title: '企业名称',
        dataIndex: 'org_name',
        key: 'org_name',
      },
      {
        title: '自评分值',
        dataIndex: 'self_score',
        key: 'self_score',
      },
      {
        title: '现场考核分值',
        dataIndex: 'scene_score',
        key: 'scene_score',
      },
      {
        title: '日常落实分值',
        dataIndex: 'daily_score',
        key: 'daily_score',
      },
      {
        title: '加分',
        dataIndex: 'add_score',
        key: 'add_score',
      },
      {
        title: '减分',
        dataIndex: 'sub_score',
        key: 'sub_score',
      },
      {
        title: '初评分值',
        dataIndex: 'multiple_score',
        key: 'multiple_score',
      },
      {
        title: '降档项',
        dataIndex: 'down_result',
        key: 'down_result',
        render: (text, record) => (
          <span>{record.down_result=='优秀'?'无降档':`降至"${record.down_result}"`}</span>
        ),
      },
      {
        title: '考核结果',
        dataIndex: 'down_result',
        key: 'down_result',
      },
    ]
    const itemRender = (current, type, originalElement) => {
      if (type === 'prev') {
        return (
          <div className='prevBtn'>
            <i className='iconfont dangjiankaohe_icon_fenye_l'></i>
          </div>
        )
      }
      if (type === 'next') {
        return (
          <div className='nextBtn'>
            <i className='iconfont dangjiankaohe_icon_fenye_r'></i>
          </div>
        )
      }
      return originalElement;
    }
    // 分页
    const pagination = {
      showQuickJumper:  true,
      showTotal: total => `共 ${Math.ceil(total/10)} 页 / ${total} 条数据`,
      defaultCurrent: 1,
      onChange: (page) => { this.props.partyBuildTableDataHttp({page:page,check_year:this.props.state.rankYear}) },
      itemRender: itemRender
    }
    return (
      <div className='partyBuild'>
        <ul className='progressBlock'>
          <li className='progressItem'>
            <Progress type="circle" format={percent => `${percent}%`} percent={(PartyBuildChart.poor/PartyBuildChart.total)*100} strokeWidth={10} width={243} strokeColor="#5A78ED" />
            <p>较差 {PartyBuildChart.poor}</p>
          </li>
          <li className='progressItem'>
            <Progress type="circle" format={percent => `${percent}%`} percent={(PartyBuildChart.commonly/PartyBuildChart.total)*100} strokeWidth={10} width={243} strokeColor="#FF8453" />
            <p>一般 {PartyBuildChart.commonly}</p>
          </li>
          <li className='progressItem'>
            <Progress type="circle" format={percent => `${percent}%`} percent={(PartyBuildChart.good/PartyBuildChart.total)*100} strokeWidth={10} width={243} strokeColor="#3ACA5F" />
            <p>良好 {PartyBuildChart.good}</p>
          </li>
          <li className='progressItem'>
            <Progress type="circle" format={percent => `${percent}%`} percent={(PartyBuildChart.excellent/PartyBuildChart.total)*100} strokeWidth={10} width={243} strokeColor="#8363FD" />
            <p>优秀 {PartyBuildChart.excellent}</p>
          </li>
        </ul>
        <Button loading={this.state.exportLoading} onClick={()=>{this.downloadExl()}} className='exportBtn' type="primary">
        {
          !this.state.exportLoading&&(<i className='iconfont dangjiankaohe_icon_daochu'></i>)
        }
        导出
        </Button>
        <Table style={{marginBottom:'50px'}} loading={PartyBuildTableData.loading} dataSource={PartyBuildTableData.list} columns={columns} pagination={false} /> 
      </div>
    );
  }
  componentDidMount(){
    this.props.partyBuildChartHttp({page:1,limit:9999,check_year:this.props.state.rankYear})
  }
  downloadExl = ()=>{
    this.setState({
      exportLoading: true
    })
    setTimeout(() => {
      this.setState({
        exportLoading: false
      })
    }, 10000);
    const results = this.props.state.PartyBuildTableData.list //需要导出的json数据
    let datas = _.clone(results)//这里为了不影响项目的数据的使用 采用了lodash中的深克隆方法
    let json = datas.map(item=> { //将json数据的键名更换成导出时需要的键名
        return {
            '排名' :item.sort_order,
            '企业名称' : item.org_name,
            '自评分值': item.self_score,//将类型代号转为汉字
            '现场考核分值': item.scene_score,
            '日常落实分值': item.daily_score,
            '加分': item.add_score,
            '减分': item.sub_score,
            '初评分值': item.multiple_score,
            '降档项': item.down_result=='优秀'?'无降档':`降至"${item.down_result}`,
            '考核结果': item.down_result,
        }
    })
    download(json,'考核排行榜.xlsx')//导出的文件名
  }
}

export default PartyBuild;