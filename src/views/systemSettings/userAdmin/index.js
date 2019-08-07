import React from 'react'
import './index.less'
import axios from '../../../utils/axios'
import { Table ,
    Switch,
    Modal,
    Button,
    Input,
    Select,
    Checkbox,
    message,
    TreeSelect,
    } from 'antd';
const { confirm } = Modal;
const { TreeNode } = TreeSelect;
var resultArr = new Array();
var tickMenuIdFilter = (function() {
    var resultArr = new Array();
    var getTickMenuId = function(obj) {
      if (undefined == obj || null == obj || !obj instanceof Object) {
        return;
      }
      resultArr.push({
        title: obj.org_name,
        id: obj.id,
        value:obj.id,
      });
      if (null != obj.children && obj.children instanceof Array) {
        for (let child of obj.children) {
          getTickMenuId(child);
        }
      }
    };
    return {
      filter: function(arr) {
        if (!arr instanceof Array) {
          return false;
        }
        resultArr = new Array();
        for (let rootMenu of arr) {
          getTickMenuId(rootMenu);
        }
        return resultArr;
      }
    };
  })();
import connect from 'connect'
const treeData = [
    {
      title: 'Node1',
      value: '0-0',
      key: '0-0',
      children: [
        {
          title: 'Child Node1',
          value: '0-0-1',
          key: '0-0-1',
          children:[]
        },
        {
          title: 'Child Node2',
          value: '0-0-2',
          key: '0-0-2',
          children:[]
        },
      ],
    },
    {
      title: 'Node2',
      value: '0-1',
      key: '0-1',
      children:[]
    },
  ];
@connect

class UserAdmin extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            userList:this.props.state.tableList.usertable,
            total:10,
            zzList:[],
            keyword:'',
            organization_id:'',
            page:1,
            selectchecked:'',
            errorMessage:'请勾选相关删除选项',
            mulitaionKey:[],
            tempIndex:[]
            
        }
    }
    getTableData(keyword,organization_id,page){
        axios.get('v1/users/index',{
            keyword,
            organization_id,
            page
        }).subscribe((res)=>{
            if(res.data.code==200){
             this.setState({
                 userList:res.data.data,
                 total:res.data.count
            })
            console.log(this.state)
            }
        })
    }
//    findPathByLeafId(leafId, nodes, path) {
//         if(path === undefined) {
//           path = [];
//         }
//         for(var i = 0; i < nodes.length; i++) {
//             var tmpPath = path.concat();
//             tmpPath.push({
//                 title:nodes.org_name,
//                 value:nodes.id,
//                 key:nodes.id
//             });
//             if(leafId == nodes[i].id) {
//                return tmpPath;
//             }
//             if(nodes[i].children) {
//               var findResult = this.findPathByLeafId(leafId, nodes[i].children, tmpPath);
//               if(findResult) {
//                 return findResult;
//               }
//             }
//         }
//       }
       toTreeData(tree){
        if (!tree) return null
        tree.forEach(item => {
            resultArr.push({
                title: item.org_name,
                value: item.id,
                key:item.id,
                // children:item&&this.toTreeData(item.children)
            })
        })
        return resultArr
    }
    getZzglList(){
        var temp =[];
        axios.get('v1/Organization/getOrgTree').subscribe((res)=>{
            if(res.data.code==200){
                this.setState({
                    zzList:((res.data.data))
                })
            }
            console.log(res.data.data)
        }) 
      }
    ChangeAccountStatus(e,record){
        //修改用户状态
        var account_status =0;
        console.log(e,record);
        if(e){
            //停用
            account_status=1
        }else{
            account_status=0
            //启用
        }
        axios.post('v1/users/switchUser',{
            id:record.id,
            account_status
        }).subscribe((res)=>{
            if(res.data.code==200){
                console.log(res.data)
                message.success(res.data.msg)
            }else{
                message.error('操作失败，请稍后再试');  
            }
        })
    }
    onChangeBox(checked){
        console.log(checked)
        if(checked){
            var tableDate =this.props.state.tableList.usertable;
            var tempData=[];
            tableDate.forEach((el,index)=>{
                tempData.push(el.id)
                // this.setState({
                //     mulitaionKey:el.id
                // })
            })
            console.log(this.state.mulitaionKey);
            this.setState({
                mulitaionKey:tempData
                // rowSelection:{
                //     selectedRowKeys:tempData
                // }
            })
            // this.state.rowSelection.selectedRowKeys=tempData;
            console.log(this.state.rowSelection)  
        }else{
            // this.setState({
            //     rowSelection:{
            //         selectedRowKeys:[]
            //     }
            // })
            this.setState({
                mulitaionKey:[]
            })
        }
        // rowSelection.selectedRowKeys()
    }
    // 获取删除对应的索引
    getIndex(){
        var tempIndex=[];
        console.log(this.state.userList);
        console.log(this.props.state.tableList.usertable);
        console.log( this.state.selectchecked);
        this.props.state.tableList.usertable.map((el,index)=>{
            console.log(el)
            this.state.selectchecked.map((el2,index2)=>{
                console.log(el2)
                if(el.id==el2){
                    tempIndex.push(index)
                }
            })
        })
        return tempIndex
    }

    deleteTable(){
        //批量删除
        let that =this;
        if(!this.state.selectchecked.length){
            confirm({
                title: '提示',
                content: '请选择需要删除的选项',
                okText: '确定',
                okType: 'danger',
                cancelText: '取消',
                width:'300px',
                onOk() {
                  console.log('OK');
                },
                onCancel() {
                  console.log('Cancel');
                },
              });
              return  false
        }
        var deleteStr =this.state.selectchecked.join(',');
        // for(var i in this.state.userList){
        //     for()
        // }
        confirm({
            title: '提示',
            content: '确定删除？',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            width:300,
            onOk() {
              console.log('OK');
              console.log(that.props)
              console.log(that.props.state.tableList.usertable);
            
              axios.post('v1/users/delete',{
                id:deleteStr,
            }).subscribe((res)=>{
                if(res.data.code==200){
                    console.log(res.data);
                    message.success(res.data.msg);
                    that.props.state.tableList.usertable.map((el,index)=>{
                        that.state.selectchecked.map((el2,index2)=>{
                            if(el.id==el2){
                                that.props.state.tableList.usertable.splice(index,1);
                                that.props.updateTable(that.props.state.tableList.usertable);
                                console.log(that.props.state.tableList.usertable)
                            }
                        })
                    })
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
    handleOk(){
        this.setState({
            visible:false
        });
        // this.deleteTable
    }
    addUser(){
        this.props.history.push('/systemSettings/addUser')
    }
    navToEditor(record){
        console.log(`/addUser?id=${record.id}`)
        this.props.history.push(`/systemSettings/addUser?id=${record.id}`)
    }
    navToAuth(record){
        this.props.history.push(`/systemSettings/modifyAuth?id=${record.id}`)
    }
    deleteUser(record){
        //删除用户
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
              axios.post('v1/users/delete',{
                id:record.id,
            }).subscribe((res)=>{
                if(res.data.code==200){
                    console.log(res.data);
                    message.success(res.data.msg);
                    that.props.state.tableList.usertable.map((el,index)=>{
                            if(el.id==record.id){
                                that.props.state.tableList.usertable.splice(index,1);
                                that.props.updateTable(that.props.state.tableList.usertable);
                                console.log(that.props.state.tableList.usertable)
                            }
                    })
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
     componentDidMount(){
         this.props.getUserTableList(1);
        // this.getTableData();
        this.getZzglList();
     }
    render(){
        const rowSelection={
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({
                    selectchecked:selectedRowKeys
                })
              console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
        }
        const {changeKeyword,changeOrgid,getUserTableList } =this.props;
        const { UserFormSearch,tableList} = this.props.state;
        console.log(tableList);
        const columns = [
            {
                title: '组织编号',
                dataIndex: 'org_order',
                render: text => <span>{text}</span>,
            },
            {
                title: '用户名',
                className: 'column-money',
                dataIndex: 'name',
                render:text => <span>{text}</span>
            },
            {
                title: '真实姓名',
                dataIndex: 'real_name',
                render:text => <span>{text}</span>
            },
            {
                title: '所属组织',
                dataIndex: 'org_name',
                render:text => <span>{text}</span>
            },
            {
                title: '角色',
                dataIndex: 'role_name',
                render:text => <span>{text}</span>
            },
            {
                title: '手机号',
                dataIndex: 'phone',
                render:text => <span>{text}</span>
            },
            {
                title: '账号状态',
                className: 'column-money',
                dataIndex: 'account_status',
                render:(e,record) => <Switch  defaultChecked={record.account_status==1} onChange={(e)=>{this.ChangeAccountStatus(e,record)}}/>
            },
            {
                title: '操作',
                dataIndex: 'operation',
                render: (text,record) =>(
                       <span>
                            <a className='editor iconfont dangjiankaohe_icon_quanxian' onClick={()=>this.navToAuth(record)}></a>
                            <a className='editor iconfont dangjiankaohe_icon_xianchangpinjia' onClick={()=>this.navToEditor(record)}></a>
                            <a className='delete iconfont dangjiankaohe_icon_shanchu' onClick={()=>this.deleteUser(record)}></a>
                       </span>
                )
            },
        ];
        const pagination={
            defaultPageSize:10,
            hideOnSinglePage:false,
            pageSize:10,
            total:this.state.count,
            onChange:(page, pageSize)=>{
                // console.log(page,pageSize)
            },
            showTotal:(total,range)=>{
                return `共 ${Math.ceil(this.state.total/pagination.pageSize)}页/${total}条数据`
            }
        }
        return(
            <div className="userTable">
                <div className="userTitle clearfix">
                    <p className="left clickBtn">
                        {/* onClick={()=>this.addUser()} */}
                        <span className="dangjiankaohe_icon_tianjia iconfont" onClick={()=>this.addUser()}>
                            添加用户
                            {/* <Link to="/addUser">添加用户</Link> */}
                        </span>
                     </p> 
                    <div className="right">
                        <Input
                         placeholder="输入关键字查询"
                          className="keyWordSearch" 
                          value={UserFormSearch.keyword}
                          onChange={(e)=>changeKeyword(e.target.value)}
                          />
                          {/*  onChange={(e)=>changeKeyword(e.target.value)} */}
                        {/* <Select  
                            placeholder="选择组织查询"
                            onChange={(e)=>changeOrgid(e)}
                            value={UserFormSearch.organization_id}
                            suffixIcon={<i style={{fontSize:'12px'}} className='iconfont dangjiankaohe_icon_xialakuang '></i>}>
                                 {
                                    this.state.zzList.map((el,index)=>{
                                        return (
                                            <Select.Option value={el.id} key={el.id}>{el.org_name}</Select.Option> 
                                        )
                                    })
                                }
                         </Select> */}
                         {/* this.state.zzList.map((el,index)=>{ */}
                              <TreeSelect
                                style={{ width: 300 }}
                                value={UserFormSearch.organization_id}
                                treeData={this.state.zzList}
                                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                placeholder="选择组织查询"
                                allowClear
                                treeDefaultExpandAll
                                onChange={(e)=>changeOrgid(e)}
                          >

                              
                          </TreeSelect>
                         {/* }) */}
                        <p className="searchBtn clickBtn" onClick={()=>getUserTableList(UserFormSearch)}>
                            <span className="dangjiankaohe_icon_sousuo iconfont" ></span>查询结果
                         </p>
                    </div>  
                </div>
                {/*    pagination={pagination} */}
                <Table
                        rowSelection={rowSelection}
                        rowKey="id"
                        columns={columns}
                        pagination={pagination}
                        loading={tableList.loading}
                        dataSource={tableList.usertable}
                        footer={() =>(<div><Checkbox onChange={(e)=>this.onChangeBox(e.target.checked)}>全选</Checkbox><Button className='deleteBtn' onClick={()=>this.deleteTable()}>删除</Button></div>)}
                        bordered
                    />
            </div>
        )
    }
}
export default UserAdmin
//  dataSource={this.props.state.tableList.usertable}