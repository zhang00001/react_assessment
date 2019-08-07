import React from 'react'
import { Redirect } from 'react-router-dom'
import { Form, Icon, Input, Button, Checkbox, message } from 'antd'
import './index.less'
import { Cookie, Local } from 'utils/storage'
import connect from 'connect'
import axios from 'utils/axios'
const FormItem = Form.Item
const shadow_b = require('../../assets/loginbox_shadow.png')
const shadow_r = require('../../assets/loginbox_shadow2.png')
const huabiao = require('../../assets/huabiao.png')
const hongqi1 = require('../../assets/hongqi1.png')
const hongqi2 = require('../../assets/hongqi2.png')


@connect
class Login extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    let { form, loginUser, state: { user } } = this.props
    form.validateFields(async (err, values) => {
      if (err) {
        message.error(err)
        return
      }
      let { userName, password, remember } = values, user

      try {
        loginUser({ userName, password }).then(u => {
          console.log(u)
          localStorage.setItem('token', u.token)
          this.props.history.push(Local.get('currPath') || '/')
        })

      } catch (e) {
        message.error(e)
        return
      }
    
    })
  }
  render() {
    const {
      getFieldDecorator
    } = this.props.form
    if (Cookie.get('Auth_Token')) return <Redirect to='/' />
    return (
      <div className="login_wrapper df-c">
        <div className='boxBlock'>
          <div className="logo_box">
          </div>
          <div className="login_box">
            <h1>党建工作考核系统</h1>
            <Form onSubmit={this.handleSubmit} className="login_form">
              <FormItem className="form_item">
                {getFieldDecorator('userName', {
                  rules: [{ required: true, message: '请输入您的用户名!' }],
                })(
                  <Input prefix={<i style={{color:'#cccccc',fontSize: '20px'}} className='iconfont dangjiankaohe_icon_yonghuming'></i>} placeholder="请输入用户名称" />
                )}
              </FormItem>
              <FormItem className="form_item">
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: '请输入您的密码!' }],
                })(
                  <Input prefix={<i style={{color:'#cccccc',fontSize: '20px'}} className='iconfont dangjiankaohe_icon_mima'></i>} type="password" placeholder="请输入登录密码" />
                )}
              </FormItem>
              {/* <FormItem className="form_item">
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(
                  <Checkbox className="fl">记住我</Checkbox>
                )}
                <a className="fr" href="javascript:;">忘记密码</a>
              </FormItem> */}
              <Button type="primary" htmlType="submit" className="db" className="submit">登录</Button>
            </Form>
          </div>
          <img className='shadow_b' src={shadow_b} />
          <img className='shadow_r' src={shadow_r} />
          <img className='huabiao' src={huabiao} />
          <img className='hongqi1' src={hongqi1} />
          <img className='hongqi2' src={hongqi2} />
        </div>
      </div>
    );
  }
}

export default Form.create()(Login)