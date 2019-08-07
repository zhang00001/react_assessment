import React, { Component } from 'react';
import { Table, message } from 'antd'
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
class Sence extends Component {
  render() { 
    const { SenceTableData } = this.props.state
    const cols = {
      sales: {
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
        title: '组织名称',
        dataIndex: 'org_name',
        key: 'org_name',
      },
      {
        title: '现场考核',
        dataIndex: 'scene_score',
        key: 'scene_score',
      },
    ]
    return (
      <div className='sence'>
        <div className='chartBlock'>
          <Chart height={400} data={SenceTableData.list} scale={cols} forceFit>
            <Axis name="org_name" tickLine />
            <Axis name="scene_score" label={label} />
            <Tooltip
              crosshairs={{
                type: "y"
              }}
            />
            <Geom type="interval" position="org_name*scene_score" color='#5A78ED' size={30} opacity={1} 
            tooltip={['org_name*scene_score', (org_name, scene_score) => {
              return {
                //自定义 tooltip 上显示的 title 显示内容等。
                name: '现场考核',
                title: org_name,
                value: scene_score
              };
            }]}/>
          </Chart>
        </div>
        <div className='tableBlock'>
          <Table loading={SenceTableData.loading} dataSource={SenceTableData.list} columns={columns} pagination={false}/> 
        </div>
      </div>
    );
  }
}
export default Sence;