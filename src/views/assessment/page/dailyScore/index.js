import React from 'react'
import './index.less'
import { Table, Divider, Tag } from 'antd';
import { Form, Button, Select, Modal, Input, Upload, message, Icon ,InputNumber} from 'antd';
import axios from 'utils/axios'
import connect from 'connect'


const formItemLayout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 20 },
};
const { TextArea } = Input;
@connect
class dailyScore extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            load: false,
            name: '',
            check_info: [],
            complete_time: '',

        }

    }

    componentDidMount = () => {
        axios.post('v1/appraise/dailySituationData', { appraise_year: this.props.match.params.year, org_id: this.props.match.params.org_id })
            .subscribe(res => {
                this.setState({
                    load: true,
                    name: res.data.data.org_name
                })
            })
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
                axios.post('v1/appraise/dailyScore', {
                    org_id: this.props.match.params.org_id,
                    appraise_year: this.props.match.params.year,
                    daily_score: values.daily_score,
                    situation_content: values.situation_content,
                    appendix_name: JSON.stringify(name),
                    appendix_path: JSON.stringify(path),
                })
                    .subscribe(res => {
                          message.success(res.data.msg).then(()=>{
                              history.go(-1);
                          })
                    })
            }
        });
    };


    render() {
        const { getFieldDecorator } = this.props.form;
        const { name } = this.state
        console.log(name)
        return (
            <div className="edit_wrapper" >
                <div className="selfEdit">
                    <div class="formContent">
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Item label="打分企业"  {...formItemLayout} >
                                <Input disabled value={name} />
                            </Form.Item>
                            <Form.Item label="落实情况"  {...formItemLayout} >
                                {getFieldDecorator('situation_content')(
                                    <TextArea className="text-top" rows={5} />
                                )}
                            </Form.Item>
                            <Form.Item label="日常分值"  {...formItemLayout} >
                                <div class="layout">
                                    {getFieldDecorator('daily_score', {
                                        rules: [{ required: true, message: '请填写日常分值' }],
                                    })(
                                        <InputNumber min={1} max={10000} defaultValue={3} />
                                    )}
                                    <span>分</span>
                                </div>
                            </Form.Item>
                            <Form.Item label="添加附件"  {...formItemLayout} >
                                {getFieldDecorator('file')(
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
const form = Form.create()(dailyScore);

export default form