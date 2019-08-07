
import React from 'react'
import './index.less'
import axios from '../../../utils/axios'
import { Table ,
    message,
    } from 'antd';
import connect from 'connect';
message.config({
        top: 300,
        duration: 2,
        maxCount: 3,
})
var tempData_0={},tempData_1={},tempData_2={},tempData_3={};
var temp1,temp2,temp3,temp0={};
var originData=[]
@connect

class LevelPage extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            edit:false,
            loading:true,
            usertable:[
            ]
        }
    }
     componentDidMount(){
         axios.get('v1/level/index').subscribe((res)=>{
             if(res.data.code==200){
                  this.setState({
                    usertable:res.data.data,
                    loading:false
                  })  
             }
             console.log(res.data.data)
         })
     }
     changeEditState(){
         this.setState({
             edit:!this.state.edit
         })
     }
     changeValue(e,record,index,text){
         //找到对应的key 
         e.preventDefault();
        originData =this.state.usertable;
       let  temps  =this.state.usertable[index];
         for(var i in temps){
             if(text==temps[i]){
                //  console.log((Object.entries(temps))[0]);
                //  console.log((Object.entries(temps))[1])
                 if(index==0){
                    tempData_0[i]=e.target.value;
                    temp0 = Object.assign({},originData[index],tempData_0) ||originData[index];
                 }else if(index==1){
                    tempData_1[i]=e.target.value;
                    temp1 =Object.assign({},originData[index],tempData_1) ||originData[index];
                 }else if(index==2){
                    tempData_2[i]=e.target.value;   
                    temp2 =Object.assign({},originData[index],tempData_2) ||originData[index];
                 }else if(index==3){
                    tempData_3[i]=e.target.value;
                    temp3 =Object.assign({},originData[index],tempData_3) ||originData[index];
                 }
             }
         }
     }
     saveData(){
         console.log(this.state.usertable[0]);
         console.log(temp0);
         console.log(Object.keys(temp0).length)
         if(!temp0||Object.keys(temp0).length==0){
            temp0 =this.state.usertable[0]
         }
         if(!temp1||Object.keys(temp1).length==0){
            temp1 =this.state.usertable[1]
         }
         if(!temp2||Object.keys(temp2).length==0){
            temp2 =this.state.usertable[2]
         }
         if(!temp3||Object.keys(temp3).length==0){
            temp3 =this.state.usertable[3]
         }
        axios.post('v1/level/edit',{
            update:JSON.stringify([
                temp0,
                temp1,
                temp2,
                temp3])
        }).subscribe((res)=>{
            if(res.data.code==200){
                this.setState({
                    edit:!this.state.edit,
                    usertable:[temp0,temp1,temp2,temp3]
                });
                message.success('修改成功')
                // message.config({
                //     top: 300,
                //     duration: 2,
                //     maxCount: 3,
                // }).success('修改成功')
            }else{
                message.error('提交失败请稍后再试');
            }
        })
     }
    render(){
        const columns = [
            {
                title: '等级',
                dataIndex: 'level',
                // className={`${el.iconfont} iconfont`}
                render: (text,record,index) =><div><span className={`${!this.state.edit?"show":'hide'}`} >{text}</span><input defaultValue={text} onInput={(e)=>this.changeValue(e,record,index,text)} className={`${this.state.edit?"show":'hide'}`} /></div>,
            },
            {
                title: '比例',
                className: 'column-money',
                dataIndex: 'percent',
                render: (text,record,index) =><div><span className={`${!this.state.edit?"show":'hide'}`} >{text}</span><input defaultValue={text} onInput={(e)=>this.changeValue(e,record,index,text)} className={`${this.state.edit?"show":'hide'}`} /></div>,
            },
        ];
        return(
            <div className="levelTable">
                <div className="userTitle">
                    <p className="operBtn">
                        {/* onClick={()=>this.addUser()} */}
                        <span className="editBtn" onClick={()=>{this.changeEditState()}} >
                            编辑
                        </span>
                        <span  className={`saveBtn ${this.state.edit?"show":'hide'}`} onClick={()=>this.saveData()}>
                            保存
                        </span>
                     </p> 
                     </div>
                    <Table
                            rowKey="id"
                            columns={columns}
                            dataSource={this.state.usertable}
                            bordered
                            loading={this.state.loading}
                            pagination={false}
                        />
            </div>
        )
    }
}
export default LevelPage