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
class Add extends Component {
  render() { 
    const { AddTableData } = this.props.state
    const cols = {
      add_score: {
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
        title: '加分项目',
        dataIndex: 'project_info',
        key: 'project_info',
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
        title: '加分详情',
        dataIndex: 'add_detail',
        key: 'add_detail',
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
        title: '加分分值（分）',
        dataIndex: 'add_score',
        key: 'add_score',
      },
    ]
    return (
      <div className='AddRank'>
        <div className='chartBlock'>
          <Chart height={400} data={AddTableData.list} scale={cols} forceFit>
            <Axis name="org_name" tickLine />
            <Axis name="add_score" label={label} />
            <Tooltip
              crosshairs={{
                type: "y"
              }}
            />
            <Geom type="interval" position="org_name*add_score" color='#5A78ED' size={58} opacity={1} 
            tooltip={['org_name*add_score', (org_name, add_score) => {
              return {
                //自定义 tooltip 上显示的 title 显示内容等。
                name: '加分分值',
                title: org_name,
                value: add_score
              };
            }]}/>
          </Chart>
        </div>
        <div className='tableBlock' style={{marginBottom:'50px'}}>
          <Table loading={AddTableData.loading} dataSource={AddTableData.list} columns={columns} pagination={false}/> 
        </div>
      </div>
    );
  }
}
 
export default Add;