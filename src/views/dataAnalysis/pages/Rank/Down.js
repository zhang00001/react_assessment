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
class Down extends Component {
  render() {
    const { DownTableData } = this.props.state
    const columns =  [
      {
        title: '企业名称',
        dataIndex: 'org_name',
        key: 'org_name',
      },
      {
        title: '降档项目',
        dataIndex: 'down_project',
        key: 'down_project',
        render: (text, record) => {
          let index = 0
          return (
            record.down_project.map(item=>(
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
        title: '党委评估',
        dataIndex: 'appraise_content',
        key: 'appraise_content',
      },
      {
        title: '附件',
        dataIndex: 'appendix_path',
        key: 'appendix_path',
        render: (text, record) => (
          <a target="_blank" onClick={()=>{window.open(record.appendix_path)}} src={record.appendix_path} style={{display:'flex',alignItems:'center'}}>
            <i className='iconfont dangjiankaohe_icon_fujian' style={{marginRight:'10px',color:'#999',fontSize:'17px'}}></i>
            <span>{record.appendix_name}</span>
          </a>
        ),
      },
      {
        title: '降档结果',
        dataIndex: 'down_result',
        key: 'down_result',
        render: (text, record) => (
          <span>{`降至"${record.down_result}"`}</span>
        ),
      },
    ]
    const cols = {
      "结果": {
        formatter(val) {
          if(val=='1'){
            return '较差'
          }
          if(val=='2'){
            return '一般'
          }
          if(val=='3'){
            return '良好'
          }
          if(val=='4'){
            return '优秀'
          }
        }
      }
    };
    const label = {
      offset: 20,
      textStyle: {
        fontSize: '15',
        textAlign: 'right',
        fill: '#aaaaaa',
        fontWeight: '400',
      }, // 坐标轴文本属性配置
    }
    const tickLine = {
      stroke:'000ff'
    }
    return (
      <div className='AddRank'>
        <div className='chartBlock' style={{borderBottom:'1px solid #EEEEEE',marginBottom: '50px'}}>
          <Chart height={400} data={DownTableData.chartData} scale={cols} forceFit>
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
                console.log(name)
                  if(name=='初评') return '#5A78ED'
                  if(name=='降档') return '#FF8A5C'
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
        <div className='tableBlock' style={{marginBottom: '50px'}}>
          <Table loading={DownTableData.loading} dataSource={DownTableData.list} columns={columns} pagination={false}/> 
        </div>
      </div>
    );
  }
}
 
export default Down;