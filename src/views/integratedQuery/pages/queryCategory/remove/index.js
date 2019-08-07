import React, { Component, Fragment } from 'react';
import connect from 'connect'
import Table from '../../../components/Table'
import { Button, Input, Select } from 'antd';

@connect
class RemoveCategory extends Component {
  constructor(props){
    super(props)
 
  }

  // shouldComponentUpdate=( )=>{
  //   return true
  // }

  componentWillMount=()=>{
    console.log(this.props.index + '阿斯顿发送到发斯蒂芬')
  }
  render() {
    const { 
      handleDeleteBatch,
      handscoreInit
    } = this.props
    const { tableData } = this.props.state
    const columns = [
      {
        title: '编号',
        width: 90,
        render:(text,record,index)=>`${(index+1+'').padStart(4,0)}`
      },
      {
        title: '一级指标',
        width: 235,
        dataIndex: 'first_target',
        key: 'first_target',
        editable: true,
      },
      {
        title: '二级指标',
        width: 477,
        dataIndex: 'second_target',
        key: 'second_target',
        editable: true,
      },
      {
        title: '应满足条件',
        width: 558,
        dataIndex: 'condition',
        key: 'condition',
        editable: true,
      },
      {
        title: '分值',
        width: 130,
        dataIndex: 'score',
        key: 'score',
        editable: true,
      },
      
    ]
    return (
      <Fragment>
        <div>{this.props.index}</div>
        <Table columnsData ={columns} initFuc={(e)=>handscoreInit(2,e)} batchDeleteFuc={()=>handleDeleteBatch(tableData.list,tableData.selectedRowKeys,2)} /> 
      </Fragment>
    );
  }
  componentDidMount() {
      // this.props.handscoreInit(2)
  }
}
export default RemoveCategory;
