import React from 'react'
import { Table ,Pagination,Select,Button,TreeSelect} from 'antd';
import './index.less';
import connect from 'connect'
import{
    message
} from 'antd'


@connect
class QueryCompany extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            currentYear:new Date().getFullYear(),
            yearArr:[]
        }
       
    }
    navToassessment(record){
        // this.props.history.push(`/assessment/selfEvaluationEdit/:checkdir_id/:level`)
        this.props.history.push({ pathname: `/assessment/selfEvaluationReportView/${record.report_year}`})
    }
    todownload(record){
        console.log(record)
        this.props.initDownLoad({id:record.id})
    }
    componentDidMount(){
       this.props.getSelfCompany();
       this.props.getZzlist();
       const tempYear =[];
       for(var i=0;i<10;i++){
           tempYear.push(this.state.currentYear-i)
       }
       this.setState({
           yearArr:tempYear
       })
    }
    changeYear(e){
        console.log(e)
    }
    render(){
        const {selfCompanyTable,user ,initSelfSearch,zzlist} =this.props.state;
        const {handleSelectYear,changeSelfCompany,getSelfCompany ,changeSelfPage } =this.props;
        const pagination={
            defaultPageSize:10,
            hideOnSinglePage:false,
            total:selfCompanyTable.total,
            onChange:(page, pageSize)=>{
                changeSelfPage(page);
                getSelfCompany(initSelfSearch);
                console.log(page,pageSize)
            },
            showTotal:(total,range)=>{
                console.log(total);
                console.log(range);
                return `共 ${Math.ceil(pagination.total/pagination.defaultPageSize)}页/${total}条数据`
            }
        }
        const columns = [
            {
                title: '编号',
                dataIndex: 'report_order',
                render: text => <span>{text}</span>,
            },
            {
                title: '评价年份',
                className: 'column-money',
                dataIndex: 'report_year',
                render:text => <span>{text}</span>
            },
            {
                title: '自评报告',
                dataIndex: 'operation',
                render: (text,record) =>(
                       <span>
                            <a className='editor iconfont dangjiankaohe_icon_sousuo' onClick={()=>this.navToassessment(record)} ></a>
                            <a className='delete iconfont dangjiankaohe_icon_xiazai' download="111.doc" href={`/api/v1/searchpoint/outPutWord?id=${record.id}`}></a>
                       </span>
                )
            },
        ];
        return (
            <div className='queryCompanyAdmin'>
                <div className="queryCompanyPage">
                <div className='searchs right'>
                <Select
                    allowClear
                    placeholder="请选择考核年度"
                    value={initSelfSearch.report_year}
                    suffixIcon={<i style={{fontSize:'12px'}} className='iconfont dangjiankaohe_icon_xialakuang'></i>}
                    onChange={(e)=>handleSelectYear(e)}
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
            <Button className='searchBtn' onClick={()=>getSelfCompany(initSelfSearch)}><i className='iconfont dangjiankaohe_icon_sousuo'></i>查询结果</Button>
          </div>
            <Table
                rowKey="id"
                columns={columns}
                pagination={pagination}
                dataSource={selfCompanyTable.list}
                bordered
                loading={selfCompanyTable.loading}
            />
                </div>
            </div>
        )
    }
}

export default QueryCompany