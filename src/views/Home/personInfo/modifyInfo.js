
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
import './modifyInfo.less'
import connect from 'connect'
@connect
class ModifyInfo extends React.Component{
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
            console.log(values);
            axios.post('v1/users/editUser',{
                    ...values,
                }).subscribe((res)=>{
                    if(res.data.code==200){
                        message.success('数据提交成功');
                        this.props.history.go(-1)
                    }else{
                        message.error(res.data.msg);
                    }
                })
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
    //   checkPhone = (rule, value, callback) => {
    //     const { form } = this.props;
    //     console.log(value);
    //     if (value) {
    //       form.validateFields(['phone'], { force: true });
    //     }
    //     callback();
    //   }
    componentDidMount(){
        this.props.getUser();
        // this.getUserInfo()
     }
    //  getUserInfo(){
    //     axios.post('v1/users/selfData').subscribe((res)=>{
    //         this.props.form.setFieldsValue({
    //             org_order:res.data.data.org_order,
    //             id:res.data.data.id,    
    //             name:res.data.data.name,
    //             real_name:res.data.data.real_name,
    //             org_name:res.data.data.org_name,
    //             role_name:res.data.data.role_name,
    //             phone:res.data.data.phone,
    //         });
    //       })
    //  }
     modifyAvater(){
        this.props.history.push(`/modifyAvater`)
     }
    render(){
        const { getFieldDecorator } = this.props.form;
        const {user} =this.props.state;
        console.log(this.props.state)
        return (
            <div className="modifyIndex">
                <div className="modifyPage">
                 <Form > 
                   <div className="modifyAvater" onClick={()=>this.modifyAvater()}>
                        <img src={user&&user.avatar} />
                        <p>修改头像</p>
                    </div> 
                    <Form.Item label="真实姓名" >
                    {
                        getFieldDecorator('real_name',{
                            initialValue: user&&user.real_name,
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
                    <Form.Item label="登录账号" >
                    {
                        getFieldDecorator('name',{
                            initialValue:user&& user.name,
                            rules: [
                                {
                                required: true,
                                message: '请输入登录账号',
                                },
                            ]
                        })  
                        (<Input  disabled />)
                     }
                    </Form.Item>
                    <Form.Item label="所属组织" >
                    {
                        getFieldDecorator('org_name',{
                            initialValue:user&& user.org_name,
                            rules: [
                                {
                                required: true,
                                message: '请输入所属组织',
                                },
                            ]
                        })  
                        (<Input  disabled />)
                     }
                    </Form.Item>
                    <Form.Item label="当前职务" >
                    {
                        getFieldDecorator('role_name',{
                            initialValue:user&& user.role_name,
                            rules: [
                                {
                                required: true,
                                message: '请输入当前职务',
                                },
                            ]
                        })  
                        (<Input  disabled />)
                     }
                    </Form.Item>
                    <Form.Item label="员工性别">
                        {getFieldDecorator('gender',{
                             initialValue: user&&user.gender,
                        })
                            (<Radio.Group name="radiogroup" >
                                <Radio value={1}>男</Radio>
                                <Radio value={0}>女</Radio>
                          </Radio.Group>)}
                        </Form.Item>
                        <Form.Item label="手机号码" >
                            {
                                getFieldDecorator('phone',{
                                    initialValue: user&&user.phone,
                                    rules: [
                                        {
                                            required: false,
                                            message: '请输入正确的手机号码',
                                        },
                                        // {
                                        //     validator: this.checkPhone,
                                        //  },
                                    ]
                                })  
                                (<Input   />)
                            }
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
export default Form.create()(ModifyInfo);