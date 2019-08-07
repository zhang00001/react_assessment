import React from 'react'
import './index.less'
import { Table, Divider, Tag } from 'antd';
import { Form, Button, Select, Modal, Input, Upload, message, Icon } from 'antd';
import axios from 'utils/axios'
import connect from 'connect'



const formItemLayout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 20 },
};
const { TextArea } = Input;
@connect
class selfEvaluationEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            load: false,
            data: {},
            check_info: [
                {
                    complete_time: '',
                }
            ],
            complete_time: '',

        }

    }

    componentDidMount = () => {
        axios.post('v1/appraise/selfAppraiseData', { checkdir_id: this.props.match.params.checkdir_id, level: this.props.match.params.level })
            .subscribe(res => {
                console.log(res)
                this.setState({
                    load: true,
                    data: res.data.data.form_info,
                    check_info: res.data.data.check_info,
                    complete_time:res.data.data.check_info.length==0?'':res.data.data.check_info.pop().complete_time
                })
            })
          
    }

    refresh = () => {
        axios.post('v1/appraise/selfAppraiseData', { checkdir_id: this.props.match.params.checkdir_id, level: this.props.match.params.level })
            .subscribe(res => {
                this.setState({
                    load: true,
                    data: res.data.data.form_info,
                    check_info: res.data.data.check_info,
                    complete_time: res.data.data.check_info.pop().complete_time
                }, () => {
                    message.success(res.data.msg).then(() => {
                        history.go(0)
                    })

                })
            })
    }

    //频次样式
    style(i) {
        // console.log(this.state.check_info.length+'长度')
        return this.state.check_info.length > i ? 'item' : this.state.check_info.length == i ? 'ing' : this.state.check_info.length < i ? 'wait' : '';
    }

    //上传
    upload = {
        name: 'up_file',
        action: '/dv/v1/users/uploadFile',
        data: { dir: 'useravater' },
        headers: {
            rand: localStorage.getItem('token')
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`上传成功`);


            } else if (info.file.status === 'error') {
                message.error(`上传失败`);
            }
        },

    };


    //提交
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let name = []
                let path = []
                values.file.fileList.forEach(e => {
                    path.push(e.response.data.file_name)
                    name.push(e.response.data.upload_name)
                });

                axios.post('v1/appraise/selfAppraise', {
                    check_form_id: this.props.match.params.checkdir_id,
                    content: values.content,
                    appendix_name: JSON.stringify(name),
                    appendix_path: JSON.stringify(path),
                })
                    .subscribe(res => {
                        this.refresh()
                    })
            }
        });
    };


    render() {
        let { data } = this.state
        let frequency = []
        console.log(data.frequency,8888888888)
        for (let i = 0; i < data.frequency; i++) {
          console.log('*')
            frequency.push(i)
        }

        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        return (
            <div className="edit_wrapper" >
                <div className="selfEdit">
                    <div class="formContainer">
                        <Form >
                            <Form.Item label="评分要点"  {...formItemLayout} >
                                <Input disabled value={data.dir_name} />
                            </Form.Item>
                            <Form.Item label="考核方式"  {...formItemLayout}>
                                <TextArea rows={6} disabled value={data.check_method} />
                            </Form.Item>
                            <Form.Item label="频次"   {...formItemLayout}>
                                <Input disabled value={data.frequency} />
                            </Form.Item>
                            <Form.Item label="标准分值"  {...formItemLayout}>
                                <Input disabled value={data.standard_score} />
                            </Form.Item>
                            <Form.Item label="自评分值"  {...formItemLayout}>
                                <Input disabled value={data.self_score} />
                            </Form.Item>
                        </Form>
                    </div>
                    <div class="solid"></div>
                    <div class="formContent">
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Item label="自评内容"  {...formItemLayout} >
                                <div class="num">
                                    {frequency.map(e =>
                                        <div className={this.style(e)}>{e + 1}</div>
                                    )}
                                </div>

                                {getFieldDecorator('content', {
                                    rules: [{ required: true, message: '请填写自评内容' }],
                                })(
                                    <TextArea className="text-top" rows={5} />
                                )}
                            </Form.Item>
                            <Form.Item label=" "  {...formItemLayout} >

                                {getFieldDecorator('file', {
                                    rules: [{ required: true, message: '请上传文件' }],
                                })(
                                    <Upload {...this.upload} >
                                        <div class="uploadLayout">
                                            <div>
                                                <Button className="upload">
                                                    <Icon type="upload" /> 选择上传文件
                                            </Button>
                                                <div className="standBy">[ 支持doc / pdf / jpg等多种格式文件 ]</div>
                                            </div>
                                            {this.state.check_info.length != 0 ?
                                                <div class="time"><span>上次编辑时间:</span><span>{this.state.complete_time.dateFormatter('yyyy-MM-dd')}</span></div>
                                                : ''
                                            }
                                        </div>
                                    </Upload>
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
const form = Form.create()(selfEvaluationEdit);

export default form