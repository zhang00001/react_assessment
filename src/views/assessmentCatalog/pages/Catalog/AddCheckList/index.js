import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox, Radio, message } from 'antd';
const { TextArea } = Input;
import ParentDir from '../ParentDir/index'
import './index.less'
import axios from 'axios'
import connect from 'connect'
const formItemLayout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 10 },
};
const formTailLayout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 10, offset: 2 },
};
@connect
class DynamicRule extends Component {
  state = { 
    is_point:1,
    parentDirId: null
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className='AddCheckList'>
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
          {getFieldDecorator('pid',{initialValue:this.state.parentDirId})(<ParentDir
           onRef={this.onRef}
           GetParentDirValue={this.handleParentDirChange} placeholder="请选择上级目录" />)}
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
            </Form.Item>
          </span> ):null
            
        }
        <Form.Item {...formTailLayout}>
          <Button type="primary" onClick={this.check}>提交</Button>
          <Button onClick={this.clear}>重置</Button>
        </Form.Item>
      </div>
    );
  }
  componentDidMount(){
    this.props.getDircateList()
  }
  onRef = (ref) => {
      this.ParentDir = ref
  }
   check = () => {
    this.props.form.validateFields(async(err,data) => {
      if (!err) {
        const URL = `v1/checkdir/save`
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
    this.setState({
      parentDirId: id,
    });
  }
}
 
const AddCheckList = Form.create({ name: 'horizontal_login' })(DynamicRule);
export default AddCheckList;