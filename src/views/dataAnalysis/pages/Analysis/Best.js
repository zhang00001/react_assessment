import React, { Component } from 'react';
import { Table } from 'antd'
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
import DataSet from "@antv/data-set";

@connect
class Best extends Component {
  // state = {  }
  render() { 
    const { BestTableData } = this.props.state
    const columns =  [
      {
        title: '排名',
        dataIndex: 'sort_order',
        key: 'sort_order',
      },
      {
        title: '考核点',
        dataIndex: 'dir_name',
        key: 'dir_name',
      },
      {
        title: '扣分频次（扣分组织数/总组织数）',
        dataIndex: 'count_org_kf',
        key: 'count_org_kf',
        render: (text, record) => (
          <span>{record.count_org_kf+'/'+record.count_org}</span>
        ),
      },
      {
        title: '平均扣分值',
        dataIndex: 'pingjunkoufenshu',
        key: 'pingjunkoufenshu',
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
    return (
      <div className='AddRank'>
        <div className='chartBlock' style={{borderBottom:'1px solid #EEEEEE',marginBottom: '50px'}}>
          <Chart height={400} data={BestTableData.chartData} forceFit>
            <Axis name="考核点" tickLine/>
            <Axis name="分数" label={label} />
            <Legend />
            <Tooltip
              crosshairs={{
                type: "y"
              }}
            />
            <Geom
              opacity={1} 
              type="interval"
              position="考核点*分数"
              color={['name', (name)=>{
                  if(name=='标准分值') return '#5A78ED'
                  if(name=='考核分值') return '#FF8A5C'
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
        <div className='tableBlock' style={{marginBottom: '20px'}}>
          <Table loading={BestTableData.loading} dataSource={BestTableData.list} columns={columns} pagination={false}/> 
        </div>
        <p style={{fontSize:'14px',color:'#333'}}><span style={{color:'#FF8A5C'}}>*</span>扣分频次指某一考核点发生扣分企业的数量；该考核点扣分的企业越多即扣分频次越高，反之则越低。</p>
        <p style={{fontSize:'14px',color:'#333',marginBottom: '50px'}}><span style={{color:'#FF8A5C'}}>*</span>平均扣分值指的是某一个考核点所有企业的扣分平均值</p>
      </div>
    );
  }
}

export default Best;