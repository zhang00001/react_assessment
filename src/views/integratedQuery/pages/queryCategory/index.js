import React, { Component, Fragment } from 'react';
import connect from 'connect'
import Table from '../../components/Table'
import { Button, Input, Select, Icon ,Modal} from 'antd';
import { Link, withRouter } from 'react-router-dom'
import AddCategory from './add'
import RemoveCategory from './remove'
import SubDown from './subDown'
@connect
class QueryCategory extends Component {
    constructor(props){
        super(props);
        this.state={
            index:0,
            currentYear:new Date().getFullYear(),
            yearArr:[],
            visible:false,
            check_method:''
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
          this.props.handscoreInit(index)
        }
        this.props.upDateCatlog();
  }
  searchFromTable(){
    if(this.state.index==0){
      this.props.cataTableSearch(1,this.props.state.catalogSearchForms)
      // this.props.cataTableInt(1,this.props.state.catalogSearchForm)
    }else{
      console.log(this.props.state.catalogSearchForms)
      this.props.handSearchInit(this.state.index,this.props.state.catalogSearchForms)
    }
  }
  changeFirstId(e){
      console.log(e);
      this.props.initSecond_category({
          pid:e
      });
      this.props.changefirstId(e);
      this.props.emptySecond();
      console.log(this.props.state.getFirstCategoryTable2)
      console.log(this.props.state.getFirstCategoryTable2.secondList)
  }
  changeSecondId(e){
    console.log(e)
    this.props.changesecond(e)
  }
  openKaohe(item){
    this.setState({
      visible:true,
      check_method:item.check_method
    })
  }
  handleOk(){
    console.log(1111)
    this.setState({
      visible:false,
      check_method:''
    })
  }
  handleCancel(){
    this.setState({
      visible:false,
      check_method:''
    })
  }
  render() {
    const {
      changeCatelogYear,
      cataTableSearch,
    } = this.props;
    const { catalogSearchForms, dircateList, tableData ,getFirstCategoryTable,getFirstCategoryTable2,navTable } = this.props.state;
    console.log(tableData);
    console.log(navTable);
    const columns = [
      {
        title: '编号',
        width: 90,
        render:(text,record,index)=>`${(index+1+'').padStart(4,0)}`,
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
        title: '考核方式',
        width: 144,
        render: (text,record) =>(
          // console.log(record)
          <span>
            {/* 'editor iconfont query1' */}
               <a className={`editor iconfont query1 ${record.level==4?"show":'hide'}`} onClick={()=>this.openKaohe(record)} ></a>
          </span>
        )
      },
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
            {/* <Input placeholder="输入关键字查询" value={catalogSearchForm.keywords} onChange={(e)=>handleChangeKeywords(e.target.value)} /> */}
            <Select
                    allowClear
                    placeholder="请选择考核年度"
                    value={catalogSearchForms.dir_year}
                    suffixIcon={<i style={{fontSize:'12px'}} className='iconfont dangjiankaohe_icon_xialakuang'></i>}
                    onChange={(e)=>changeCatelogYear(e)}
                    >
                    {this.state.yearArr.map(item => (
                        <Select.Option key={item} value={item}>
                            {item}
                        </Select.Option>
                    ))}
                </Select>
                {/* initSecond_category({pid:e}) */}
            <Select
              allowClear
              placeholder="请选择一级指标"
              value={catalogSearchForms.first_target_id}
              onChange={(e)=>this.changeFirstId(e)}
              suffixIcon={<i style={{fontSize:'12px'}} className='iconfont dangjiankaohe_icon_xialakuang'></i>}
              >
                {/*  <Select.Option key={index+1} value={item}>
                      {item.dir_name}
                    </Select.Option> */}
                {getFirstCategoryTable.firstList.map((item,index) => (
                      <Select.Option key={index+1} value={item.checkdir_id}>
                       {item.dir_name}
                    </Select.Option>
                ))}
            </Select> 
            <Select 
            allowClear 
            placeholder="请选择二级指标" 
            value={catalogSearchForms.second_target_id} 
            onChange={(e)=>this.changeSecondId(e)}
            // onChange={(e)=>handleChangeSecondId(e)}
            suffixIcon={<i style={{fontSize:'12px'}} className='iconfont dangjiankaohe_icon_xialakuang'></i>}
            >
              {getFirstCategoryTable2.secondList.map(item=> 
                  <Select.Option key={item.checkdir_id} value={item.checkdir_id}>
                     {item.dir_name}
                  </Select.Option>
              )}
            </Select> 
            {/* <Button className='searchBtn' onClick={()=>cataTableSearch(1,catalogSearchForms)}><i className='iconfont dangjiankaohe_icon_sousuo'></i>查询结果</Button> */}
            <Button className='searchBtn' onClick={()=>this.searchFromTable(1,catalogSearchForms)}><i className='iconfont dangjiankaohe_icon_sousuo'></i>查询结果</Button>
          </div>
        </div>
        <div className="tabContent">
              <div  className={`tabContentList ${0 == this.state.index ? 'active' : ''}`}>
                    <Table columnsData={columns} initFuc={(e)=>cataTableSearch(e,catalogSearchForms)}  /> 
                    <Modal
                        title="考核方式"
                        visible={this.state.visible}
                        onOk={()=>this.handleOk()}
                        onCancel={()=>this.handleCancel()}
                      >
                        <p>{this.state.check_method}</p>
                      </Modal>
              </div> 
              <div   className={`tabContentList ${1 == this.state.index ? 'active' : ''}`}>
                    <AddCategory />
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
    this.props.cataTableInt();
    this.props.initFirst_category()
    const tempYear =[];
    for(var i=0;i<10;i++){
        tempYear.push(this.state.currentYear-i)
    }
    this.setState({
        yearArr:tempYear
    })
  }
}
export default QueryCategory;