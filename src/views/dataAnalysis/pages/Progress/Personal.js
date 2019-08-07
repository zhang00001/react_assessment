import React, { Component } from 'react';
import { Table, Progress, Button, message } from 'antd'
import axios from 'axios'
import connect from 'connect'
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util
} from "bizcharts";

@connect
class Personal extends Component {
  state = {
    sortOrder:null
  }
  setSortOrder = this.setSortOrder.bind(this)
  sendMessage = this.sendMessage.bind(this)
  render() { 
    console.log(this.props.state,'this.props.state')
    const { PersonalTableData } = this.props.state
    const columns =  [
      {
        title: '排名',
        dataIndex: 'sort_order',
        key: 'sort_order',
      },
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '所在组织',
        dataIndex: 'org_name',
        key: 'org_name',
      },
      {
        title: '考核点',
        dataIndex: 'total',
        key: 'total',
        sorter: (a, b) => a.total - b.total,
        sortOrder: this.state.sortOrder,
      },
      {
        title: '已完成',
        dataIndex: 'complete_num',
        key: 'complete_num',
      },
      {
        title: '完成率',
        dataIndex: 'completion_rate',
        key: 'completion_rate',
        render: (text, record) => (
          <Progress percent={record.completion_rate*100} />
        ),
      },
    ]
    const label = {
      offset: 20,
      textStyle: {
        fontSize: '15',
        textAlign: 'right',
        fill: '#aaaaaa',
        fontWeight: '400',
      }, // 坐标轴文本属性配置
    }
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
      onChange: (page) => { this.props.personalTableDataHttp({page:page,check_year:this.props.state.rankYear}) },
      itemRender: itemRender
    }
    return (
      <div className='AddRank'>
      <div className='chartBlock' style={{borderBottom:'1px solid #EEEEEE',marginBottom: '50px'}}>
        <Chart height={400} data={PersonalTableData.chartData} forceFit>
          <Axis name="支部" tickLine/>
          <Axis name="结果" label={label} />
          <Legend />
          <Tooltip
            crosshairs={{
              type: "y"
            }}
          />
          <Geom
            opacity={1} 
            type="interval"
            position="支部*结果"
            color={['name', (name)=>{
              console.log(name,'00000000000')
                if(name=='考核点') return '#5A78ED'
                if(name=='已完成') return '#FF8A5C'
              }]}
            adjust={[
              {
                type: "dodge",
                marginRatio: 0
              }
            ]}
          />
        </Chart>
      </div>
        <div className='btnBlock' style={{marginBottom: '30px'}}>
          <Button onClick={this.setSortOrder} style={{width:'84px'}} className='btn'><i style={{fontSize:'13px'}} className='iconfont dangjiankaohe_icon_paixu'></i>排序</Button>
          <Button onClick={this.sendMessage} className='lessBtn'><i className='iconfont dangjiankaohe_icon_yijiantixing'></i>一键提醒</Button>
        </div>
        <div className='tableBlock'>
          <Table style={{marginBottom:'20px'}} loading={PersonalTableData.loading} dataSource={PersonalTableData.list} columns={columns} pagination={false}/> 
        </div>
      </div>
    );
  }
  setSortOrder(){
    if(this.state.sortOrder==='ascend'||this.state.sortOrder===null){
      this.setState({
        sortOrder: 'descend'
      });
    }else{
      this.setState({
        sortOrder: 'ascend'
      })
    }
  }
  async sendMessage(){
    console.log(this.props,8997843543)
    const url = `v1/DataAnalysis/one_click_reminder`
    let res = await axios.get(url,{params: {check_year: this.props.year,check_month:this.props.month}})
    if(res.data.code===0){
      message.success(res.data.data)
    }else{
      message.error(res.data.msg)
    }
  }
}

export default Personal;