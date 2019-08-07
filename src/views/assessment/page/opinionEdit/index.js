import React from 'react'
import './index.less'
import { Table, Divider, Tag } from 'antd';
import { Form, Button, Select, Modal, Input, Upload, message, Icon, InputNumber } from 'antd';
import axios from 'utils/axios'
import connect from 'connect'


const formItemLayout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 20 },
};
const { TextArea } = Input;
@connect
class opinionEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            load: false,
            data: {
                org_info: {
                    org_name: ''
                },
                sub: {
                    project_info: []
                },
                add:{
                    project_info: []
                }
            },
            check_info: [],
            complete_time: '',
            upload: {
                defaultFileList: []
            }

        }

    }

    componentDidMount = () => {
        axios.post('v1/appraise/opinionData', { appraise_year: this.props.match.params.year, org_id: this.props.match.params.org_id })
            .subscribe(res => {
                this.setState({
                    load: true,
                    data: res.data.data
                })
            })
    }

    //上传



    //提交
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                axios.post('v1/appraise/submitOpinion', {
                    org_id: this.props.match.params.org_id,
                    check_year: this.props.match.params.year,
                    suggest: values.suggest,

                })
                    .subscribe(res => {
                        message.success(res.data.msg).then(() => {
                            history.go(-1);
                        })
                    })
            }
        });
    };




    render() {
        const { getFieldDecorator } = this.props.form;
        const { data } = this.state
        let add = ''
        let sub=''
        data.add.project_info.forEach(e=>{
            e.condition.forEach(e=>{
                add=add+e
            })
        })

        data.sub.project_info.forEach(e=>{
            e.condition.forEach(e=>{
                sub=sub+e
            })
        })

        console.log(add)

        return (
            <div className="edit_wrapper" >
                <div className="selfEdit">
                    <div class="formContent">
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Item label="初评企业"  {...formItemLayout} >
                                <Input disabled value={data.org_info.org_name} />
                            </Form.Item>

                            <Form.Item label="自评报告"  {...formItemLayout} >
                                <div class="textInput">
                                    <div dangerouslySetInnerHTML={{ __html: data.self_report }} />
                                </div>
                            </Form.Item>

                            <Form.Item label="现场评价分值"  {...formItemLayout} >
                                <div class="layout">
                                    <InputNumber min={1} max={10000} disabled value={data.scene_score} />
                                    <span>分</span>
                                </div>
                            </Form.Item>
                            <Form.Item label="加分项目"  {...formItemLayout} >
                                <TextArea className="text-top" rows={5} disabled value={add} />
                            </Form.Item>
                            <Form.Item label="加分分值"  {...formItemLayout} >
                                <div class="layout">
                                    <InputNumber min={1} max={10000} disabled  value={data.add.add_score}/>
                                    <span>分</span>
                                </div>
                            </Form.Item>

                            <Form.Item label="日常落实分值"  {...formItemLayout} >
                                <div class="layout">
                                    <InputNumber min={1} max={10000} disabled value={data.daily_score}/>
                                    <span>分</span>
                                </div>
                            </Form.Item>

                            <Form.Item label="减分项目"  {...formItemLayout} >
                                <TextArea className="text-top" rows={5} disabled value={sub} />
                            </Form.Item>

                            <Form.Item label="减分材料"  {...formItemLayout} >
                                <TextArea className="text-top" rows={5} disabled value={data.sub.sub_stuff} />
                            </Form.Item>

                            <Form.Item label="减分分值"  {...formItemLayout} >
                                <div class="layout">
                                    <InputNumber min={1} max={10000} disabled  value={data.sub.sub_score}/>
                                    <span>分</span>
                                </div>
                            </Form.Item>

                            <Form.Item label="综合分值"  {...formItemLayout} >
                                <div class="layout">
                                    <InputNumber min={1} max={10000} disabled value={data.multiple_score}/>
                                    <span>分</span>
                                </div>
                            </Form.Item>

                            <Form.Item label="初评意见"  {...formItemLayout} >

                                {getFieldDecorator('suggest', {
                                    rules: [{ required: true, message: '请填写初评意见' }],
                                })(
                                    <TextArea className="text-top" rows={5}  />
                                )}

                            </Form.Item>

                            <Form.Item {...formItemLayout} >
                                <Button type="primary" className="sb" htmlType="submit">
                                    提交
                                </Button>

                                <Button className="save">
                                    保存
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}
const form = Form.create()(opinionEdit);

export default form