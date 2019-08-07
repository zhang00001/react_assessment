import React, { Component, Fragment } from 'react';
import connect from 'connect'
import Table from '../../components/Table'
import Alert from '../../components/Alert'
import BulkUpload from './BulkUpload'
import { Button, Input, Select, Icon } from 'antd';
import { Link, withRouter } from 'react-router-dom'
@connect
class Catalog extends Component {
  render() {
    const {
      handleChangeBulkUploadVisible,
      cataTableInt,
      handleChangeKeywords,
      handleChangeFirstId,
      getDircateSecondList,
      handleChangeSecondId
    } = this.props
    const { catalogSearchForm, dircateList, tableData } = this.props.state
    const BulkUploadWidth = 700
    const columns = [
      {
        title: '编号',
        width: 90,
        render:(text,record,index)=>`${(index+1+'').padStart(4,0)}`
      },
      {
        title: '一级指标',
        dataIndex: 'dir_name_1',
        key: 'dir_name_1',
        editable: true,
        width: 125
      },
      {
        title: '二级指标',
        dataIndex: 'dir_name_2',
        key: 'dir_name_2',
        editable: true,
        width: 220
      },
      {
        title: '重点考核内容',
        dataIndex: 'dir_name_3',
        key: 'dir_name_3',
        editable: true,
        width: 357
      },
      {
        title: '评分要点',
        dataIndex: 'dir_name_4',
        key: 'dir_name_4',
        editable: true,
        width: 357
      },
      {
        title: '分值',
        dataIndex: 'standard_score',
        key: 'standard_score',
        editable: true,
        width: 104
      },
      {
        title: '频次（次/年）',
        dataIndex: 'frequency',
        key: 'frequency',
        editable: true,
        width: 144
      },
      {
        title: '操作',
        key: '操作',
        width: 116,
        render: (text, record, index) => {
          return (
            <span>
              <Link to={`/assessmentCatalog/EditCheckList?checkdir_id=${record.checkdir_id}&level=${record.level}`} style={{marginRight:'16px'}}><i className='iconfont dangjiankaohe_icon_bianji'></i></Link>
              <i onClick={()=>this.handelDeleteBtnClick(text, record, index)} className='iconfont dangjiankaohe_icon_shanchu'></i>
            </span>
          )
        },
      }
    ]
    return (
      <Fragment>
        <div className='toolsBlock'>
          <div className='btns'>
            <Link to={'/assessmentCatalog/AddCheckList'}><Button className='btn'><i className='iconfont dangjiankaohe_icon_tianjia'></i>添加目录</Button></Link>
            <Button className='lessBtn' onClick={()=>{handleChangeBulkUploadVisible({visible:true})}}><i className='iconfont dangjiankaohe_icon_piliangshangchuan'></i>批量上传</Button>
          </div>
          <div className='searchs'>
            <Input placeholder="输入关键字查询" value={catalogSearchForm.keywords} onChange={(e)=>handleChangeKeywords(e.target.value)} />
            <Select
            allowClear
            placeholder="请选择一级指标"
            value={catalogSearchForm.first_target_id}
            onChange={(e)=>{handleChangeFirstId(e),getDircateSecondList(e),handleChangeSecondId()}}
            suffixIcon={<i style={{fontSize:'12px'}} className='iconfont dangjiankaohe_icon_xialakuang'></i>}
            >
              {dircateList.first_list.map(item => (
                <Select.Option key={item.checkdir_id} value={item.checkdir_id}>
                  {item.dir_name}
                </Select.Option>
              ))}
            </Select>
            <Select 
            allowClear
            placeholder="请选择二级指标" 
            value={catalogSearchForm.second_target_id} 
            onChange={(e)=>handleChangeSecondId(e)}
            suffixIcon={<i style={{fontSize:'12px'}} className='iconfont dangjiankaohe_icon_xialakuang'></i>}
            >
              {dircateList.second_list.map(item => (
                <Select.Option key={item.checkdir_id} value={item.checkdir_id}>
                  {item.dir_name}
                </Select.Option>
              ))}
            </Select>
            <Button className='searchBtn' onClick={()=>cataTableInt(1,catalogSearchForm)}><i className='iconfont dangjiankaohe_icon_sousuo'></i>查询结果</Button>
          </div>
        </div>
        <Table columnsData={columns} initFuc={(e)=>cataTableInt(e,catalogSearchForm)} batchDeleteFuc={()=>this.handelBatchDeleteBtnClick(tableData.list,tableData.selectedRowKeys)} /> 
        <BulkUpload width={BulkUploadWidth}/>
        <Alert />
      </Fragment>
    );
  }
  componentDidMount(){
    this.props.cataTableInt()
    this.props.getDircateList()
  }
  handelDeleteBtnClick(text, record, index){
    this.props.alertOpen({
      title: '删除流程',
      des: '删除后无法恢复，确认要删除当前流程？',
      okText: '删除',
      handleOk: () => {
        this.props.deleteCataItem({data:[{checkdir_id:record.checkdir_id, level:record.level}]},this.props.state.tableData.pagination.page)
      }
    })
  }
  handelBatchDeleteBtnClick(list, selectedRowKeys){
    let data = []
    selectedRowKeys.forEach(index => {
      data.push({
        checkdir_id: list[index].checkdir_id,
        level: list[index].level
      })
    });
    this.props.alertOpen({
      title: '删除流程',
      des: '删除后无法恢复，确认要删除当前流程？',
      okText: '删除',
      handleOk: () => {
        this.props.deleteCataItem({data:data},this.props.state.tableData.pagination.page)
      }
    })
  }
}
export default Catalog;