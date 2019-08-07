import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox, Radio, message, Spin } from 'antd';
const { TextArea } = Input;
import ParentDir from '../ParentDir/index'
import './index.less'
import axios from 'axios'

const formItemLayout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 10 },
};
const formTailLayout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 10, offset: 2 },
};
class DynamicRule extends Component {
  state = { 
    is_point:1,
    parentDirId: null,
    loading:false
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className='AddCheckList'>
        <Spin spinning={this.state.loading}>
          <Form.Item {...formItemLayout} label="目录名称：">
            {getFieldDecorator('dir_name', {
              rules: [
                {
                  required: true,
                  message: '请输入目录名称',
                },
              ],
            })(<Input placeholder="请输入目录名称" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="评分要点：">
            {getFieldDecorator('is_point', {
              initialValue:this.state.is_point,
              rules: [
                {
                  required: true,
                  message: '请选择评分要点',
                },
              ],
            })(<Radio.Group onChange={this.onChange} value={this.state.is_point}>
                <Radio value={1}>是</Radio>
                <Radio value={0}>否</Radio>
              </Radio.Group>)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="上级目录：" extra="[ 不选择分类则默认为顶级分类 ]">
            {getFieldDecorator('pid',{initialValue:this.state.parentDirId})(
            <ParentDir 
            onRef={this.onRef}
            onlyCurrent={true}
            GetParentDirValue={this.handleParentDirChange} 
            placeholder="请选择上级目录" />
            )}
          </Form.Item>
          {
            this.state.is_point?(
            <span>
              <Form.Item {...formItemLayout} label="标准分值：" extra="[ 如无硬性要求，可填“0” ]">
                {getFieldDecorator('standard_score', {
                  rules: [
                    {
                      required: true,
                      message: '请输入标准分值',
                    },
                  ],
                })(<Input placeholder="请输入标准分值" />)}
              </Form.Item>
              <Form.Item {...formItemLayout} label="频次：">
                {getFieldDecorator('frequency', {
                  rules: [
                    {
                      required: true,
                      message: '请输入频次',
                    },
                  ],
                })(<Input placeholder="请输入频次" />)}
              </Form.Item>
              <Form.Item {...formItemLayout} label="考核方式：">
                {getFieldDecorator('check_method', {
                  rules: [
                    {
                      required: true,
                      message: '请输入考核方式',
                    },
                  ],
                })(<TextArea rows={4} placeholder="请输入考核方式" />)}
              </Form.Item>)
            </span> ):null
              
          }
          <Form.Item {...formTailLayout}>
            <Button type="primary" onClick={this.check}>提交</Button>
            <Button onClick={this.clear}>重置</Button>
          </Form.Item>
        </Spin>
      </div>
    );
  }
  componentWillMount(){
    const checkdir_id = this.getQuerystring('checkdir_id')
    const level = this.getQuerystring('level')
    if(checkdir_id&&level){
      this.setState({
        loading: true
      })
      const URL = `v1/checkdir/read?checkdir_id=${checkdir_id}&level=${level}`
      axios.get(URL).then(res=>{
        this.setState({
          loading: false
        })
        if(res.data.code === 0){
          this.props.form.setFieldsValue(res.data.data)
          this.setState({
            is_point: res.data.data.is_point,
            parentDirId: res.data.data.pid
          })
          this.ParentDir.setDefault(res.data.data.pid,level,res.data.data)
        }else{
          message.error(res.data.msg)
        }
      })
    }
  }
  onRef = (ref) => {
      this.ParentDir = ref
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
  check = () => {
    this.props.form.validateFields(async(err,data) => {
      if (!err) {
        data.checkdir_id = Number(this.getQuerystring('checkdir_id'))
        data.level = Number(this.getQuerystring('level'))
        data.pid = this.state.parentDirId
        const URL = `v1/checkdir/update`
        let res = await axios.post(URL,data)
        if(res.data.code === 0){
          message.success(res.data.msg)
          this.props.history.push({pathname:"/assessmentCatalog/Catalog"})
        }else{
          message.error(res.data.msg)
        }
      }
    });
  }
  clear = ()=>{
    this.props.form.resetFields();
    this.ParentDir.clear()
    this.setState({
      is_point:1,
      parentDirId: null
    })
  }
  onChange = (e) => {
    this.setState({
      is_point: e.target.value,
    });
  }
  handleParentDirChange = (id='') => {
    console.log('===========================')
    console.log(id)
    console.log('===========================')
    this.setState({
      parentDirId: id,
    });
  }
}
 
const AddCheckList = Form.create({ name: 'horizontal_login' })(DynamicRule);
export default AddCheckList;