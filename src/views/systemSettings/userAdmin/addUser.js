
import React from 'react'
import {
    Form,
    Input,
    Tooltip,
    Icon,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete,
    Radio,
    message 
  } from 'antd';
  import axios from '../../../utils/axios.js' 
import './addUser.less'
import connect from 'connect'
@connect
class AddUser extends React.Component{
    constructor(props){
        super(props)
        this.state={
            data:[],
            zzList:[]
        }
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if(this.getQuerystring('id')){
                axios.post('v1/users/edit',{
                    ...values,
                    id:this.getQuerystring('id')
                }).subscribe((res)=>{
                    if(res.data.code==200){
                        message.success('数据修改成功');
                        this.props.history.go(-1)
                    }else{
                        message.error(res.data.msg);
                    }
                })
            }else{
                axios.post('v1/users/create',{
                    ...values
                }).subscribe((res)=>{
                    if(res.data.code==200){
                        message.success('数据提交成功');
                        this.props.history.go(-1)
                    }else{
                        message.error(res.data.msg);
                    }
                })
            }
            
        })
      }
      handleSelectChange(value) {
        console.log(value);
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
      getZzglList(){
        axios.get('v1/Organization/index').subscribe((res)=>{
            if(res.data.code==200){
                this.setState({
                    zzList:res.data.data
                })
            }
            console.log(res.data.data)
        }) 
      }
    resetForms(){
        this.props.form.resetFields();
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

    componentDidMount(){
        this.getRoleList();
        this.getZzglList();
        console.log(this.getQuerystring('id'));
        if(this.getQuerystring('id')){
            this.getUserInfo(this.getQuerystring('id'))    
        }
     }
     getUserInfo(id){
        axios.post('v1/users/listToDetail',{
            id,
            type:1
          }).subscribe((res)=>{
            this.props.form.setFieldsValue({
                name:res.data.data.name,
                real_name:res.data.data.real_name,
                role_id:res.data.data.role_id,
                organization_id:res.data.data.organization_id,
                password:res.data.data.password,
                re_password:res.data.data.re_password    
            });
          })
        // axios.get('')
     }
     compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        console.log(form.getFieldValue('password'))
        console.log('value'+value)
        if(value){
            if (value !== form.getFieldValue('password')&&value!=undefined) {
                callback('两次输入的密码不一致');
              } else {
                callback();
              } 
        }else{

        }
        // if (value && value !== form.getFieldValue('password')&&value!=undefined) {
        //   callback('两次输入的密码不一致');
        // } else {
        //   callback();
        // }
      };
    
      validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        console.log(value);
        if (value) {
          form.validateFields(['re_password'], { force: true });
        }
        callback();
      };
    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="addUserIndex">
                <div className="addUserPage">
                 <Form > 
                    <Form.Item label="用户名" >
                    {
                        getFieldDecorator('name',{
                            rules: [
                                {
                                  required: true,
                                  message: '请输入用户名',
                                },
                              ]
                        })
                        (<Input disabled={this.getQuerystring('id')? true:false} />)}
                    </Form.Item>
                    <Form.Item label="真实姓名" >
                    {
                        getFieldDecorator('real_name',{
                            rules: [
                            
                                {
                                required: true,
                                message: '请输入真实姓名',
                                },
                            ]
                        })  
                        (<Input />)
                     }
                    </Form.Item>
                    <Form.Item label="角色选择" >
                        {
                            getFieldDecorator('role_id',{
                                rules: [
                                    {
                                    required: true,
                                    message: '请选择角色',
                                    },
                                ],
                                
                            })(<Select
                                placeholder="请选择角色"
                                onChange={(e)=>this.handleSelectChange(e)}
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
                    <Form.Item label="所属组织" >
                        {
                          getFieldDecorator('organization_id',{
                            rules: [
                                        {
                                            required: true,
                                            message: '请选择所属组织',
                                        },
                                     ],
                        })(<Select placeholder="请选择组织" >
                                {
                                    this.state.zzList.map((el,index)=>{
                                        return (
                                            <Select.Option value={el.id} key={el.id}>{el.org_name}</Select.Option> 
                                        )
                                    })
                                }
                          </Select>)  
                        }
                    </Form.Item>
                        <Form.Item label="新密码">
                        { getFieldDecorator('password',{
                            rules: [
                                {
                                required: true,
                                message: '请输入6位以上密码',
                                },
                                {
                                    validator: this.validateToNextPassword,
                                 },
                               
                            ]
                        })(<Input  type="password" placeholder='请输入新密码' />)}
                        </Form.Item>
                        <Form.Item label="确认密码">
                            {getFieldDecorator('re_password',{
                                rules: [
                                    {
                                    required: true,
                                    message: '两次输入密码不一致',
                                    },
                                    {
                                        validator: this.compareToFirstPassword,
                                     },
                                ]
                            })
                            (<Input   type="password" placeholder='请确认新密码' />)}
                        </Form.Item>
                        <Form.Item label="用户状态">
                        {getFieldDecorator('account_status',{
                                rules: [
                                            {
                                            required: true,
                                            message: '请选择用户状态',
                                            },
                                        ],
                                initialValue:1
                            })
                            (<Radio.Group name="radiogroup" >
                                <Radio value={1}>在用</Radio>
                                <Radio value={0}>停用</Radio>
                          </Radio.Group>)}
                        </Form.Item>
                        <Form.Item label="" className="addUserBtn">
                            <Button type="primary" onClick={(e)=>this.handleSubmit(e)}>提交</Button>
                            <Button type="reset" onClick={()=>this.resetForms()}>重置</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}
export default Form.create()(AddUser);