import React, { Component, Fragment } from 'react';
import connect from 'connect'
import { Button, Input,Form,Empty} from 'antd';
import './index.less'
@connect
class AddCategory extends React.Component{
  componentDidMount(){

  }
   render(){
     const  {RecordTableOther} =this.props.state;
      console.log(this.props.state)
      console.log( RecordTableOther.list.project_reason)
      return (
        <div className="addForm"> 
        <div className="addFormPage">
            <div className={`noFormData ${Object.keys(RecordTableOther.list).length==0?"show":'hide'}`}><Empty  /></div>
            <div className={`addFormPage ${Object.keys(RecordTableOther.list).length>0?"show":'hide'}`} >
              <div className="addList">
                    <div className="addListTitle">
                        减分项目：
                    </div>
                    <div className="addListDetail">
                      {
                       RecordTableOther.list.project_reason&&RecordTableOther.list.project_reason.map((el,index)=>{
                         console.log(el)
                         return(<p key={index+1}>{index+1}:{el}</p>) 
                        })
                      }
                    </div>
              </div>
              <div className="addList">
                    <div className="addListTitle">
                    减分详情：
                    </div>
                    <div className="addListDetail">
                        <p>{RecordTableOther.list.detail}</p>
                    </div>
              </div>
              <div className="addList">
                    <div className="addListTitle addScore">
                    减分分值：
                    </div>
                    <div className=" addListInput">
                        <p>{RecordTableOther.list.score}</p>分
                    </div>
              </div>
              <div className=" appendEnclouse">
                    <div className="addListTitle">
                       添加附件：
                    </div>
                    <ul className="enclouseDetail">
                        <li>
                            <a className="iconfont dangjiankaohe_icon_fujian" href={RecordTableOther.list.appendix_path} download={RecordTableOther.list.appendix_path}>{RecordTableOther.list.appendix_name}</a>
                        </li>
                    </ul>
              </div>
              </div>          
              
        </div>
        </div>
      )
   }
}
export default AddCategory