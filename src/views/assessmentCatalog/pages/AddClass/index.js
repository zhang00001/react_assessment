import React, { Component, Fragment } from 'react';
import connect from 'connect'
import Table from '../../components/Table'
import { Button, Input, Select } from 'antd';
import Alert from '../../components/Alert'

@connect
class AddClass extends Component {
  render() {
    const { 
      handleEditBtnClick,
      handleDeleteBtnClick,
      handleSaveEditBtnClick,
      handleCanelEditBtnClick,
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
        width: 477,
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
      {
        title: '操作',
        key: '操作',
        width: 167,
        render: (text, record, index) => {
          return (
            !record.edit?(
              <span>
                <i className='iconfont dangjiankaohe_icon_bianji' onClick={()=>handleEditBtnClick(index)}></i>
                <i className='iconfont dangjiankaohe_icon_shanchu' onClick={()=>this.delete({index:index,id:record.hand_id,type:1})}></i>
              </span>
            ):(
              <span>
                <Button className='saveBtn' onClick={()=>handleSaveEditBtnClick(1,{index:index,record:record})}>保存</Button>
                <Button className='canelBtn' onClick={()=>{handleCanelEditBtnClick(index)}}>取消</Button>
              </span>
            )
          )
        },
      }
    ]
    return (
      <Fragment>
        <div className='toolsBlock'>
          <div className='btns'>
            <Button className='btn' onClick={this.handleAddTrBtnClick.bind(this)}><i className='iconfont dangjiankaohe_icon_tianjia'></i>添加项目</Button>
          </div>
        </div>
        <Table columnsData ={columns} initFuc={(e)=>handscoreInit(1,e)} batchDeleteFuc={()=>this.batchDelete(tableData.list,tableData.selectedRowKeys,1)} /> 
        <Alert />
      </Fragment>
    );
  }
  componentDidMount() {
    this.props.handscoreInit(1)
  }
  handleAddTrBtnClick(){
    this.props.addTableRow()
  }
  delete(data){
    this.props.alertOpen({
      title: '删除流程',
      des: '删除后无法恢复，确认要删除当前流程？',
      okText: '删除',
      handleOk: () => {
        this.props.handleDeleteBtnClick(data)
      }
    })
  }
  batchDelete(data,selectedRowKeys,type){
    this.props.alertOpen({
      title: '删除流程',
      des: '删除后无法恢复，确认要删除当前流程？',
      okText: '删除',
      handleOk: () => {
        this.props.handleDeleteBatch(data,selectedRowKeys,type)
      }
    })
  }

}
export default AddClass;