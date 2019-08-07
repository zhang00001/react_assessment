import React from 'react'
import {
    Form,
    Input,
    Checkbox,
    Button,
    message,
    Select
  } from 'antd';
  import  './modifyAuth.less'
  import connect from 'connect'
  import axios from '../../../utils/axios'
  console.log(axios)
  var temp =[];
  var tempStr=[];
  @connect
class AddRole extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            indeterminate: true,
            checkAll: false,
            selectAuth:[],
            checked: true,
            temp:[],
            data:[]
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
            axios.post('v1/role/editUserRole',{
              ...values,
              user_role:[...new Set(temp)].join(','),
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
          }
        });
      }
    
    render(){
        const {getRoleList} =this.props;
        const { getFieldDecorator } = this.props.form;
        const {roleTable} =this.props.state;
        console.log(this.props.state)
        const CheckboxGroup = Checkbox.Group;
        return (
           <div className="addRolePage">
             <div className="addRole">
                <Form  >
                  <div className="inputItem">
                        <Form.Item label="用户名" className="roleName">
                              {getFieldDecorator('name', {
                                  rules: [{ required: true, message: '请填写用户名' }],
                              })(<Input disabled/>)}
                         </Form.Item>
                        <Form.Item label="真实姓名" className="roleName">
                                {getFieldDecorator('real_name', {
                                    rules: [{ required: false, message: '请填写真实姓名' }],
                                })(<Input disabled />)}
                         </Form.Item>
                         <Form.Item label="角色选择" className="roleName">
                            {
                                getFieldDecorator('role_id',{
                                    rules: [
                                        {
                                        required: true,
                                        message: '用户角色',
                                        },
                                    ],
                                    
                                })(<Select
                                    placeholder="请选择角色"
                                    disabled
                                    // onChange={(e)=>this.handleSelectChange(e)}
                                >
                                    {
                                            this.state.data.map((el,index)=>{
                                                return (
                                                    <Select.Option value={el.id} key={el.id}>{el.role_name}</Select.Option> 
                                                )
                                            })
                                    }
                                </Select>)  
                            }
                    </Form.Item>
                  </div>
                      <div className="roleCheckBoxWrap">
                        {
                          roleTable.roleList.map((el,index)=>{
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
        this.props.getRoleList();
        this.getRoleList();
        if(this.getQuerystring('id')){
            this.getOriginRoleList(this.getQuerystring('id'))
        }
    }
    getOriginRoleList(id){
        axios.post('v1/users/listToDetail',{
          id,
          type:1
        }).subscribe((res)=>{
          temp = res.data.data.user_role.split(',');
          this.setState({
            selectAuth:res.data.data.user_role.split(','),
            temp:res.data.data.user_role.split(',')
          })
          this.props.form.setFieldsValue({
            name:res.data.data.name,
            real_name:res.data.data.real_name,
            role_id:res.data.data.role_id,
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
    getRoleList(){
        axios.get('v1/role/index').subscribe((res)=>{
            if(res.data.code==200){
                this.setState({
                    data:res.data.data
                })
            }
            console.log(res.data.data)
        }) 
      }
}
export default  Form.create()(AddRole)