import React from 'react'
import { Table ,Pagination} from 'antd';
import './index.less';
import {withRouter} from 'react-router-dom';
import axios from '../../../utils/axios.js'
import{
    message
} from 'antd'
@withRouter

class RoleAdmin extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            data:[],
            loading:true
        }
    }
    navToEditor(record){
        this.props.history.push('/systemSettings/addRole?id='+record.id)
    }
    deleteRow(record){
        console.log(record)
        console.log(this.state.data);
        var tempData=[];
        axios.post('v1/role/delete',{
            id:record.id
        }).subscribe((res)=>{
            if(res.data.code==200){
                this.state.data.map((el,index)=>{
                    if(el.id==record.id){
                        tempData = this.state.data.splice(index,1);
                        message.success('操作成功')
                        this.setState({
                            data:this.state.data
                        })
                    }
                })
            }else{
                message.error('删除失败，请稍后再试')
            }
            console.log(res)
        })
       
    }
    getTableData(){
        axios.get('v1/role/index').subscribe((res)=>{
            if(res.data.code==200){
                this.setState({
                    data:res.data.data,
                    loading:false
                })
            }
        }) 
    }
    addRole(){
        this.props.history.push(`/systemSettings/addRole`)
    }
    componentDidMount(){
       this.getTableData();
    }
    render(){
        console.log(this.state.data.length)
        const pagination={
            defaultPageSize:10,
            hideOnSinglePage:false,
            total:this.state.data.length,
            onChange:(page, pageSize)=>{
                console.log(page,pageSize)
            }
        }
        const columns = [
            {
                title: '组织编号',
                dataIndex: 'role_name',
                render: text => <span>{text}</span>,
            },
            {
                title: '角色描述',
                className: 'column-money',
                dataIndex: 'role_description',
                render:text => <span>{text}</span>
            },
            {
                title: '操作',
                dataIndex: 'operation',
                render: (text,record) =>(
                       <span>
                            <a className='editor iconfont dangjiankaohe_icon_xianchangpinjia' onClick={this.navToEditor.bind(this,record)}></a>
                            <a className='delete iconfont dangjiankaohe_icon_shanchu' onClick={()=>this.deleteRow(record)}></a>
                       </span>
                )
            },
        ];
        return (
            <div className='roleAdmin'>
                <div className="rolePage">
                    <p className='topTitle'>
                        <span className="dangjiankaohe_icon_tianjia iconfont" onClick={()=>{this.addRole()}}>添加角色</span>
                    </p>
                    <Table
                        rowKey="id"
                        columns={columns}
                        pagination={pagination}
                        dataSource={this.state.data}
                        loading={this.state.loading}
                        bordered
                    />
                </div>
            </div>
        )
    }
}

export default RoleAdmin