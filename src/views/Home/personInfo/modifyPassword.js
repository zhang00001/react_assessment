import React from 'react'
import {
    Form,
    Input,
    Icon,
    Button,
    message 
  } from 'antd';
  import axios from '../../../utils/axios.js' 
import './modifyPassword.less'
import connect from 'connect'
@connect
class ModifyPassword extends React.Component{
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values)
            axios.post('v1/users/editPwd',{
                ...values
            }).subscribe((res)=>{
                if(res.data.code==200){
                    message.success('数据提交成功');
                    this.props.history.go(-1);
                }else{
                    message.error(res.data.msg);
                }
            })
            
        })
      }
      resetForms(){
        this.props.form.resetFields();
    }
    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        console.log(form.getFieldValue('password'))
        if (value && value !== form.getFieldValue('password')) {
          callback('两次输入的密码不一致');
        } else {
          callback();
        }
      };
    
      validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        console.log(value);
        if (value) {
          form.validateFields(['re_password'], { force: true });
        }
        callback();
      };
    render (){
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="modifyPasswordIndex">
                <div className="modifyPage">
                    <Form > 
                        <Form.Item label="原密码">
                            { getFieldDecorator('old_password',{
                                rules: [
                                    {
                                    required: true,
                                    message: '输入原密码',
                                    },
                                ]
                            })(<Input  type="password" placeholder='请输入密码' />)}
                            </Form.Item>
                            <Form.Item label="新登录密码">
                                {getFieldDecorator('password',{
                                    rules: [
                                        {
                                        required: true,
                                        message: '请输入新密码',
                                        },
                                        {
                                            validator: this.validateToNextPassword,
                                        },
                                    ]
                                })
                                (<Input type="password" placeholder='请输入原密码' />)}
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
                                (<Input  type="password" placeholder='请确认新密码' />)}
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
export default Form.create()(ModifyPassword);