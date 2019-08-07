import React from 'react'
import {
    Form,
    Input,
    Checkbox,
    Button,
    message
  } from 'antd';
  import  './addRole.less'
  import connect from 'connect'
  import axios from '../../../utils/axios'
  console.log(axios)
  const plainOptions = ['定义考核目录', '定义加分项', '定义减分项','定义降档项'];
  const defaultCheckedList = ['Apple', 'Orange'];
  var temp =[];
  var tempStr=[];
  var clickIndex='';
  @connect
class AddRole extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            checkedList: defaultCheckedList,
            indeterminate: true,
            checkAll: false,
            selectAuth:[],
            checked: true,
            temp:[]
        }
    }
      onCheckAllChange(e,el) {
          if(e.target.checked){
            el.child_item.map((element,index)=>{
              temp.push(element.id.toString());
            })
            this.setState({
              temp:[...new Set(temp)]
            })
          }else{
            el.child_item.map((element,index)=>{
              temp.map((element2,index2)=>{
                if(element2==element.id){
                    temp.splice(index2,1)
                }
              })
            })
            this.setState({
                temp:[...new Set(temp)]
              })
          }
      };
      selectCheckbox(e,el){
        console.log(e);
        console.log(el);

        el.child_item.map((element1,index1)=>{
          temp.map((element2,index2)=>{
            if(element1.id==element2){
              temp.splice(index2,1)
            }
          })
        })
        temp.push(...e);
        console.log([...new Set(temp)])
        this.setState({
          temp:[...new Set(temp)]
        })
      }
      confirmSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
          if(this.getQuerystring('id')){
            axios.post('v1/role/edit',{
              ...values,
              role_auth:[...new Set(temp)].join(','),
              id:this.getQuerystring('id')
              }).subscribe((res)=>{
                  if(res.data.code==200){
                      message.success('数据提交成功');
                      this.props.history.go(-1);
                      // this.props
                  }else{
                    message.error('数据提交失败，请稍后再试');
                  }
              })
          }else{
            axios.post('v1/role/create',{
              ...values,
              role_auth:[...new Set(temp)].join(',')
              }).subscribe((res)=>{
                  if(res.data.code==200){
                      message.success('数据提交成功');
                      this.props.history.go(-1);
                      // this.props
                  }else{
                    message.error('数据提交失败，请稍后再试');
                  }
              })
          }
          
        });
      }
    
    render(){
        console.log('render')
        const {getRoleList} =this.props;
        const { getFieldDecorator } = this.props.form;
        const {roleTable} =this.props.state;
        const CheckboxGroup = Checkbox.Group;
        // if(this.getQuerystring('id')){
        //    this.getOriginRoleList(this.getQuerystring('id'))
        // }
        return (
           <div className="addRolePage">
             <div className="addRole">
                <Form  >
                  <div className="inputItem">
                        <Form.Item label="角色名称" className="roleName">
                              {getFieldDecorator('role_name', {
                                  rules: [{ required: true, message: '请填写角色名称' }],
                              })(<Input />)}
                         </Form.Item>
                        <Form.Item label="角色描述" className="roleName">
                                {getFieldDecorator('role_description', {
                                    rules: [{ required: false, message: '请填写角色描述' }],
                                })(<Input />)}
                         </Form.Item>
                  </div>
                      <div className="roleCheckBoxWrap">
                        {
                          roleTable.roleList.map((el,index)=>{
                            console.log(temp)
                            return(
                              <div className="roleCheckbox" key={index}>
                                <div className="roleCheckboxList">
                                    <Checkbox
                                        onChange={(e)=>{this.onCheckAllChange(e,el)}}
                                    >
                                     {el.menu}
                                    </Checkbox>
                                </div>
                                <Checkbox.Group
                                      className="roleCheckBox"
                                      value={this.state.temp}
                                      onChange={(e)=>{this.selectCheckbox(e,el)}}
                                  >
                                  {
                                    el.child_item.map((el2,index2)=>{
                                        return (
                                          <Checkbox 
                                            className={`${el.child_item.length>4?'FourMore':""}`}
                                            value={Number(el2.id).toString()}
                                            key={index2}
                                            >
                                             {el2.item}
                                          </Checkbox>
                                          
                                        )
                                    })
                                  }
                              </Checkbox.Group>
                            </div>
                            )
                          })
                        }
                      
                        </div>
                        <div className="roleBtnWrap">
                            <Button type="primary" onClick={(e)=>{this.confirmSubmit(e)}}>确定</Button>
                            <Button>取消</Button>
                        </div>
                  </Form>
             </div>
           </div>
        )
    }
    componentDidMount(){
        console.log('mount')
        this.props.getRoleList();
        if(this.getQuerystring('id')){
            this.getOriginRoleList(this.getQuerystring('id'))
        }
    }
    getOriginRoleList(id){
        axios.post('v1/users/listToDetail',{
          id,
          type:3
        }).subscribe((res)=>{
          temp = res.data.data.role_auth.split(',');
          this.setState({
            selectAuth:res.data.data.role_auth.split(','),
            temp:res.data.data.role_auth.split(',')
          })
          this.props.form.setFieldsValue({
            role_name:res.data.data.role_name,
            role_description:res.data.data.role_description,
          });
        })
    }
    getQuerystring = (name) => {
      let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
      let arg = this.props.location.search.substr(1).match(reg);
      if(arg!=null){
          return  unescape(arg[2]);
      }else{
          return null;
      }
    }
}
export default  Form.create()(AddRole)