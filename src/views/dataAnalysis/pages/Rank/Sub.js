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

@connect
class Sub extends Component {
  render() { 
    const { SubTableData } = this.props.state
    const cols = {
      sub_score: {
        tickInterval: 20,
      }
    };
    const label = {
      offset: 20,
      textStyle: {
        fontSize: '15',
        textAlign: 'center',
        fill: '#aaaaaa',
        fontWeight: '400',
      }, // 坐标轴文本属性配置
    }
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
        title: '减分项目',
        dataIndex: 'sub_project',
        key: 'sub_project',
        render: (text, record) => {
          let index = 0
          return (
            record.project_info.map(item=>(
              item.condition.map(item=>{
                index++
                return (
                  <span>
                    <p>{index + '.' + item.replace(/(^\s*)|(\s*$)/g, "")}</p>
                  </span>
                )
              })
            ))
          )
        },
      },
      {
        title: '减分材料',
        dataIndex: 'sub_stuff',
        key: 'sub_stuff',
      },
      {
        title: '附件',
        dataIndex: 'appendix_name',
        key: 'appendix_name',
        render: (text, record) => (
          <a target="_blank" onClick={()=>{window.open(record.appendix_path)}} src={record.appendix_path} style={{display:'flex',alignItems:'center'}}>
            <i className='iconfont dangjiankaohe_icon_fujian' style={{marginRight:'10px',color:'#999',fontSize:'17px'}}></i>
            <span>{record.appendix_name}</span>
          </a>
        ),
      },
      {
        title: '减分分值（分）',
        dataIndex: 'sub_score',
        key: 'sub_score',
      },
    ]
    return (
      <div className='AddRank'>
        <div className='chartBlock'>
          <Chart height={400} data={SubTableData.list} scale={cols} forceFit>
            <Axis name="org_name" tickLine />
            <Axis name="sub_score" label={label} />
            <Tooltip
              crosshairs={{
                type: "y"
              }}
            />
            <Geom type="interval" position="org_name*sub_score" color='#5A78ED' size={58} opacity={1} 
            tooltip={['org_name*sub_score', (org_name, sub_score) => {
              return {
                //自定义 tooltip 上显示的 title 显示内容等。
                name: '减分分值',
                title: org_name,
                value: sub_score
              };
            }]}/>
          </Chart>
        </div>
        <div className='tableBlock' style={{marginBottom:'50px'}}>
          <Table loading={SubTableData.loading} dataSource={SubTableData.list} columns={columns} pagination={false}/> 
        </div>
      </div>
    );
  }
}
 
export default Sub;