import React from 'react'
import AddDialoge from './dialoge'
import { Table ,
    Pagination,
    Switch,
    Modal,
    message,
    TreeSelect} from 'antd';
const { TreeNode } = TreeSelect;
const { confirm } = Modal;
let userInfo={}
import './index.less';
import axios from '../../../utils/axios';
import connect from 'connect'
@connect
class ZzglAdmin extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            data:[],
            visible:false,
            total:'',
            title:'添加',
            value:0,
            zzList:[],
            formData:{},
            userInfo:'',
            clickId:-1

        }
    }

    deleteRow(record){
        let that  =this;
        confirm({
            title: '提示',
            content: '确定删除？',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            width:300,
            onOk() {
              console.log('OK');
              axios.post('v1/Organization/delete',{
                ids:record.id,
             }).subscribe((res)=>{
                if(res.data.code==200){
                    console.log(res.data);
                    console.log(that.props.state.OriginTable)
                    message.success(res.data.msg);
                    that.props.state.OriginTable.originTable.map((el,index)=>{
                            if(el.id==record.id){
                                that.props.state.OriginTable.originTable.splice(index,1);
                                that.props.state.OriginTable.total=that.props.state.OriginTable.total-1;
                                that.props.updateOriginTable(that.props.state.OriginTable);
                            }
                        })
                    // that.state.data.map((el,index)=>{
                    //     if(el.id==record.id){
                    //         that.state.data.splice(index,1);
                    //         that.setState({
                    //             data:that.state.data,
                    //         })
                    //     }
                    // })
                }else{
                    message.error('操作失败，请稍后再试');  
                }
            })  
            },
            onCancel() {
              console.log('Cancel');
            },
          });
    }
    getTableData(){
        axios.get('v1/Organization/index').subscribe((res)=>{
            if(res.data.code==200){
                this.setState({
                    data:res.data.data,
                    total:res.data.count
                })
            }
        }) 
    }
    ChangeAccountStatus(checked,record) {
        console.log(checked);
        console.log(record);
        axios.post('v1/Organization/switchOrg',{
            id:record.id,
            account_status:checked==true?1:0
        }).subscribe((res)=>{
            if(res.data.code==200){
                message.success('修改成功')
            }else{
                message.error(res.data,msg)
            }
        })
   }
   onChangeTree (e){
    console.log(e);
    this.setState({ treeValue: e});
  }
  onChangeSwitch(e){
      console.log(e.target.value)
      this.setState({
            value:e.target.value    
      })
  }
  handleOk =e=>{
    console.log(e);
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  
  };
   modifyModal(el){
       console.log(el);
       this.props.openModal(true);
       this.props.getOriginInfo(el)
   }
   getChildOrig(params){
       console.log(params)
       this.setState({
            clickId:params.org_pid
       })
        this.props.getChildOrig(params)
   }
   goBackTop(){
        this.setState({
            clickId:-1
    })
    this.props.getOrigintable();
   }
    componentDidMount(){
       this.props.getOrigintable();
       this.props.getZzlist();
    }
    render(){
        const {openModal,getChildOrig} =this.props;
        const {OriginTable} =this.props.state;
        console.log(OriginTable);
        const pagination={
            defaultPageSize:10,
            hideOnSinglePage:false,
            pageSize:10,
            total:OriginTable.total,
            onChange:(page, pageSize)=>{
            },
            showTotal:(total,range)=>{
                console.log(total);
                console.log(range);
                return `共 ${Math.ceil(OriginTable.total/pagination.pageSize)}页/${total}条数据`
            }
        }
        const columns = [
            {
                title: '组织编号',
                dataIndex: 'org_order',
                render: text => <span>{text}</span>,
            },
            {
                title: '组织名称',
                className: 'org_name',
                dataIndex: 'org_name',
                render:(text,record) => <span>{text}<a onClick={()=>this.getChildOrig({org_pid:`${record.id}`})}>(查看下级组织)</a></span>
            },
            {
                title: '联系人',
                dataIndex: 'real_name',
                render:text => <span>{text}</span>
            },
            {
                title: '联系电话',
                dataIndex: 'phone',
                render:text => <span>{text}</span>
            },
            {
                title: '账号状态',
                className: 'account_status',
                dataIndex: 'account_status',
                render:(e,record) => <Switch  defaultChecked={record.account_status==1} onChange={(e)=>{this.ChangeAccountStatus(e,record)}}/>
            },
            {
                title: '操作',
                dataIndex: 'operation',
                render: (text,record) =>(
                       <span>
                            <a className='editor iconfont dangjiankaohe_icon_xianchangpinjia' onClick={()=>this.modifyModal(record)}></a>
                            <a className='delete iconfont dangjiankaohe_icon_shanchu' onClick={()=>this.deleteRow(record)}></a>
                       </span>
                )
            },
        ];
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
              console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: record => ({
              disabled: record.name === 'Disabled User', // Column configuration not to be checked
              name: record.name,
            }),
          };
        return (
            <div className="zzglAdmin">
                <div className="zzglPage">
                    <p className='topTitle'>
                        <span className="dangjiankaohe_icon_tianjia iconfont" onClick={()=>this.modifyModal({})}>添加组织</span>
                        <span className={`${this.state.clickId>=0?"show":'hide'}`} onClick={()=>this.goBackTop()}>返回上级组织</span>
                    </p>

                    <AddDialoge   />
                    <Table
                        loading={OriginTable.loading}
                        rowSelection={rowSelection}
                        rowKey="id"
                        columns={columns}
                        pagination={pagination}
                        dataSource={OriginTable.originTable}
                        bordered
                    />
                </div>
            </div>
        )
    }
}

export default ZzglAdmin