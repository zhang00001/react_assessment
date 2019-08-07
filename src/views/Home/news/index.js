import React from 'react'
import './index.less'
import moment from 'moment';
import axios from '../../../utils/axios'
import { Table ,
    Modal,
    Button,
    Select,
    Checkbox,
    message,
    DatePicker 
    } from 'antd';
const { confirm } = Modal;
import connect from 'connect'
const {  RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';
@connect

class newsPage extends React.Component{
    constructor(props){
        super(props)
        this.state ={
           
        }
    }
    onChangeBox(checked){
        console.log(checked)
        if(checked){
            var tableDate =this.props.state.tableList.usertable;
            var tempData=[];
            tableDate.forEach((el,index)=>{
                tempData.push(el.id)
            })
            console.log(this.state.mulitaionKey);
            this.setState({
                mulitaionKey:tempData
            
            })
            console.log(this.state.rowSelection)  
        }else{
         
            this.setState({
                mulitaionKey:[]
            })
        }
    }
    // 获取删除对应的索引
    getIndex(){
        var tempIndex=[];
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
        console.log(deleteStr);
        confirm({
            title: '提示',
            content: '确定删除？',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            width:300,
            onOk() {
              console.log('OK');
              console.log(that.props.state.NewsList.newsTable)
            //   that.props.state.NewsList.newsTable.map((el,index)=>{
            //       console.log(el)
            //     that.state.selectchecked.map((el2,index2)=>{
            //         if(el.id==el2){
            //             that.props.state.NewsList.newsTable.splice(index,1);
            //             that.props.state.NewsList.total--;
            //             that.props.updateNews(that.props.state.NewsList);
            //             console.log(that.props.state.NewsList)
            //         }
            //     })
            // })
              axios.post('v1/message/delete',{
                id:deleteStr,
            }).subscribe((res)=>{
                if(res.data.code==200){
                    console.log(res.data);
                    message.success(res.data.msg);
                    that.props.state.NewsList.newsTable.map((el,index)=>{
                        console.log(el)
                      that.state.selectchecked.map((el2,index2)=>{
                          if(el.id==el2){
                              that.props.state.NewsList.newsTable.splice(index,1);
                              that.props.state.NewsList.total--;
                              that.props.updateNews(that.props.state.NewsList);
                              console.log(that.props.state.NewsList)
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
              
              axios.post('v1/message/delete',{
                id:record.id,
            }).subscribe((res)=>{
                if(res.data.code==200){
                    console.log(res.data);
                    message.success(res.data.msg);
                    that.props.state.NewsList.newsTable.map((el,index)=>{
                        if(el.id==record.id){
                            that.props.state.NewsList.newsTable.splice(index,1);
                            that.props.updateNews(that.props.state.NewsList);
                            console.log(that.props.state.NewsList)
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

    // onChangeDate(date,totalDate) {
    //     const connectStr =totalDate[0]+'/'+totalDate[1];
    //     console.log(connectStr.toString())
    //     this.props.getNews(connectStr.toString())
    //   }
     componentDidMount(){
         this.props.getNews();
         this.props.getNewsCate();
     }
     onOk(value) {
        console.log('onOk: ', value);
      }
    render(){
        const {NewsList,newsCategory,newsCondition }  =this.props.state;
        console.log(newsCategory.newscategory);
        const {changeNewsType,changeNewsDate,changeNewsUnread,getNews} =this.props;
        const rowSelection={
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({
                    selectchecked:selectedRowKeys
                })
              console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
        }
        const columns = [
            {
                title: '消息标题',
                className: 'column-money',
                dataIndex: 'content',
                render:text => <span>{text}</span>
            },
            {
                title: '接收时间',
                dataIndex: 'send_time',
                render:text => <span>{text}</span>
            },
            {
                title: '接收者',
                dataIndex: 'sender_name',
                render:text => <span>{text}</span>
            },
            {
                title: '状态',
                dataIndex: 'read_flag',
                render:(text,record,index) => <div className="newsStatus"><i className={`iconfont dangjiankaohe_icon_weidu ${record.read_flag?"active":'disactive'}`}><span className={`${record.read_flag==1?"show":"hide"}`}>已读</span><span className={`${record.read_flag==1?"hide":"show"}`}>未读</span></i></div>
            },
            {
                title: '操作',
                dataIndex: 'operation',
                render: (text,record) =>(
                       <span>
                            <a className='delete iconfont dangjiankaohe_icon_shanchu' onClick={()=>this.deleteUser(record)}></a>
                       </span>
                )
            },
        ];
        const pagination={
            defaultPageSize:10,
            hideOnSinglePage:false,
            pageSize:10,
            total:this.props.state.NewsList.total,
            onChange:(page, pageSize)=>{
            },
            showTotal:(total,range)=>{
                return `共 ${Math.ceil(this.props.state.NewsList.total/pagination.pageSize)}页/${total}条数据`
            }
        }
        return(
            <div className="newsPage">
                <div className="newsTable">
                                <div className="userTitle clearfix">
                                    <div className="left clickBtn">
                                        {/* <span className="dangjiankaohe_icon_tianjia iconfont" >
                                            未读消息
                                        </span> */}
                                         <Select  
                                            placeholder="未读消息"
                                            onChange={(e)=>changeNewsUnread(e)}
                                            suffixIcon={<i style={{fontSize:'12px'}} className='iconfont dangjiankaohe_icon_xialakuang '></i>}>
                                                 <Select.Option value={1}>已读</Select.Option>
                                                 <Select.Option value={0}>未读</Select.Option>
                                        </Select>
                                    </div> 
                                    <div className="right">
                                        <RangePicker allowClear={false} format={dateFormat}  onChange={(date,totalDate)=>changeNewsDate(totalDate&&(totalDate[0]+'/'+totalDate[1])||'')} style={{height:'36px'}}/>
                                        {/* <RangePicker  
                                        format={dateFormat}
                                        onChange={(date,totalDate)=>this.onChangeDate(date,totalDate)} style={{height:'36px'}}/> */}
                                        <Select  
                                            style={{height:'36px'}}
                                            placeholder="业务类型"
                                            onChange={(e)=>changeNewsType(e)}
                                            
                                            suffixIcon={<i style={{fontSize:'12px'}} className='iconfont dangjiankaohe_icon_xialakuang '></i>}>
                                                {
                                                    newsCategory.newscategory.map((el,index)=>{
                                                        return (
                                                            <Select.Option value={el.id} key={index}>{el.type}</Select.Option>
                                                        )
                                                    })
                                                }    
                                        </Select>
                                        <p className="searchBtn clickBtn" onClick={()=>getNews(newsCondition)}>
                                            <span className="dangjiankaohe_icon_sousuo iconfont" ></span>查询结果
                                        </p>
                                    </div>  
                                </div>
                                <Table
                                        rowSelection={rowSelection}
                                        rowKey="id"
                                        columns={columns}
                                        pagination={pagination}
                                        dataSource={NewsList.newsTable}
                                        footer={() =>(<div><Checkbox onChange={(e)=>this.onChangeBox(e.target.checked)}>全选</Checkbox><Button className='deleteBtn' onClick={()=>this.deleteTable()}>删除</Button></div>)}
                                        bordered
                                    />
                            </div>
            </div>            
            
        )
    }
}
export default newsPage