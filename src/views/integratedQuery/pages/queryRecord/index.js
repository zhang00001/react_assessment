
import React, { Component, Fragment } from 'react';
import connect from 'connect'
import { Button, Input, Select, Icon ,Table,TreeSelect } from 'antd';
import { Link, withRouter } from 'react-router-dom'
import AddCategory from './add'
import RemoveCategory from './remove'
import SubDown from './subDown'
@connect
class QueryRecord extends Component {
    constructor(props){
        super(props);
        this.state={
            index:0,
            currentYear:new Date().getFullYear(),
            yearArr:[],
            zzList:[]
        }
    }
    setTab(index){
        this.setState({
           index:index
        });
        if(index==0){
          this.props.cataTableInt()
          this.props.getDircateList();
        }else{
          this.props.handRecordInit(index)
        }
        this.props.upDateCatlog();
  }
  searchFromTable(){
    if(this.state.index==0){
      this.props.getcatelogRecord(this.props.state.initSelfSearch);
      // this.props.cataTableSearch(1,this.props.state.initSelfSearch)
      // this.props.cataTableInt(1,this.props.state.catalogSearchForm)
    }else{
      console.log(this.props.state.initSelfSearch)
      this.props.handRecordInit(this.state.index,this.props.state.initSelfSearch)
    }
  }
  navToassessment(record){
      console.log(record)
    // /:checkdir_id/:level/:org_id
     this.props.history.push({ pathname: `/assessment/siteEvaluationEdit/${record.checkdir_id}/${record.level}/${record.id}`})
  }
  render() {
    const {changeCheckYear,changeSelfCompany,getSelfCompany ,changeSelfPage,getcatelogRecord } =this.props;
    const { catalogSearchForms,initSelfSearch, zzlist,RecordTable ,RecordTableOther } = this.props.state;
    console.log(RecordTableOther)
    console.log(RecordTable)
    // console.log(RecordTable.total)
    // const pagination={
    //     defaultPageSize:999,
    //     hideOnSinglePage:false,
    //     total:RecordTable.pages*999,
    //     onChange:(page, pageSize)=>{
    //         getcatelogRecord(...initSelfSearch,{page});
    //     },
    //     // showTotal:(total,range)=>{
    //     //     console.log(total);
    //     //     console.log(range);
    //     //     return `共 ${Math.ceil(pagination.total/pagination.defaultPageSize)}页/${total}条数据`
    //     // }
    // }
    
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
    console.log(RecordTable)
    const pagination = {
      showQuickJumper:  true,
      showTotal: total => `共 ${total/999<1?1:total/999} 页`,
      defaultCurrent: 1,
      current:RecordTable.pagination.page,
      defaultPageSize: 999,
      total: RecordTable.pagination.pages*999,
       onChange:(page, pageSize)=>{
            getcatelogRecord(...initSelfSearch,{page});
        },
    }
    const columns = [
      {
        title: '编号',
        width: 90,
        render:(text,record,index)=>`${(index+1+'').padStart(4,0)}`,
        key:'id'
      },
      { 
        title: '一级指标',
        dataIndex: 'dir_name_1',
        key: 'dir_name_1',
        width: 125
      },
      {
        title: '二级指标',
        dataIndex: 'dir_name_2',
        key: 'dir_name_2',
        width: 220
      },
      {
        title: '重点考核内容',
        dataIndex: 'dir_name_3',
        key: 'dir_name_3',
        width: 357
      },
      {
        title: '评分要点',
        dataIndex: 'dir_name_4',
        key: 'dir_name_4',
        width: 497
      },
      {
        title: '分值',
        dataIndex: 'standard_score',
        key: 'standard_score',
        width: 104
      },
      {
        title: '频次（次/年）',
        dataIndex: 'frequency',
        key: 'frequency',
        width: 144
      },
      {
        title: '自评分值',
        render: (text,record)=>{
            if(record.hand_list){
                return (
                  <span>{record.hand_list.appraise_score}</span>
                )
            }else{
              return null
            }
        }
      },
      {
        title: '自评人员',
        render: (text,record)=>{
          if(record.hand_list){
              return (
                <span>{record.hand_list.appraise_user}</span>
              )
          }else{
            return null
          }
      }
      },
      {
        title: '考核分值',
        render: (text,record)=>{
          if(record.hand_list){
              return (
                <span>{record.hand_list.review_score}</span>
              )
          }else{
            return null
          }
      }
      },
      {
        title: '考核人员',
        render: (text,record)=>{
          if(record.hand_list){
              return (
                <span>{record.hand_list.check_man}</span>
              )
          }else{
            return null
          }
      }
      },
      {
        title: '操作',
        dataIndex: 'operation',
        className:'operation',
        render: (text,record) =>(
               <span>
                    <a className='editor iconfont query1' onClick={()=>this.navToassessment(record)} ></a>
               </span>
        )
      }
      

    ]
    return (
      <Fragment>
        <div className='toolsBlock'>
          <div className="leftLink left">
              <div className={`leftName ${0 == this.state.index ? 'active' : ''}`} onClick={()=>this.setTab(0)} >
                    <span>考核目录</span>
              </div>
              <div className={`leftName ${1 == this.state.index ? 'active' : ''}`} onClick={()=>this.setTab(1)}>
                    <span>加分项</span>
              </div>
              <div className={`leftName ${2 == this.state.index ? 'active' : ''}`} onClick={()=>this.setTab(2)}>
                    <span>减分项</span>
              </div>
              <div className={`leftName ${3 == this.state.index ? 'active' : ''}`} onClick={()=>this.setTab(3)}>
                    <span>降档项</span>
              </div>
          </div>
          <div className='searchs right'>
            <Select
                    allowClear
                    placeholder="请选择考核年度"
                    value={initSelfSearch.check_year}
                    suffixIcon={<i style={{fontSize:'12px'}} className='iconfont dangjiankaohe_icon_xialakuang'></i>}
                    onChange={(e)=>changeCheckYear(e)}
                    >
                    {this.state.yearArr.map(item => (
                        <Select.Option key={item} value={item}>
                            {item}
                        </Select.Option>
                    ))}
                </Select>
                {/* <Select
                allowClear
                placeholder="请选择考核企业"
                value={initSelfSearch.org_id}
                suffixIcon={<i style={{fontSize:'12px'}} className='iconfont dangjiankaohe_icon_xialakuang'></i>}
                onChange={(e)=>changeSelfCompany(e)}
                >
                {zzlist.org_ist.map(item => (
                    <Select.Option key={item.id} value={item.id}>
                            {item.org_name}
                    </Select.Option>
                ))}
                </Select> */}
                 <TreeSelect
                      style={{ width: 300 }}
                      value={initSelfSearch.org_id}
                      treeData={zzlist.org_ist}
                      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                      placeholder="选择组织查询"
                      allowClear
                      treeDefaultExpandAll
                      onChange={(e)=>changeSelfCompany(e)}
                          >
                      </TreeSelect>
            {/* <Button className='searchBtn' onClick={()=>cataTableSearch(1,catalogSearchForms)}><i className='iconfont dangjiankaohe_icon_sousuo'></i>查询结果</Button> */}
            <Button className='searchBtn' onClick={()=>this.searchFromTable(1,catalogSearchForms)}><i className='iconfont dangjiankaohe_icon_sousuo'></i>查询结果</Button>
          </div>
        </div>
        <div className="tabContent">
              <div  className={`tabContentList ${0 == this.state.index ? 'active' : ''}`}>
                    <Table
                        rowKey="id"
                        columns={columns}
                        pagination={pagination}
                        dataSource={RecordTable.list}
                        bordered
                        loading={RecordTable.loading}
                    />
              </div> 
              <div   className={`tabContentList ${1 == this.state.index ? 'active' : ''}`}>
                    <AddCategory dataSource={RecordTableOther} />
              </div>
              <div   className={`tabContentList ${2== this.state.index ? 'active' : ''}`}  index={this.state.index}> 
                    <RemoveCategory />
              </div>
              <div    className={`tabContentList ${3 == this.state.index ? 'active' : ''}`}>
                    <SubDown />
              </div>
        </div>
      </Fragment>
    );
  }
  componentDidMount(){
    this.props.getcatelogRecord();
    this.props.getZzlist();
    const tempYear =[];
    for(var i=0;i<10;i++){
        tempYear.push(this.state.currentYear-i)
    }
    this.setState({
        yearArr:tempYear
    })
  }

}
export default QueryRecord;