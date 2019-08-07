import React from 'react'
import './index.less'
import { Table, Divider, Tag } from 'antd';
import { Form, Button, Select, Modal, Input, Upload, message, Icon, Radio, InputNumber } from 'antd';
import axios from 'utils/axios'
import connect from 'connect'


const formItemLayout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 20 },
};
const { TextArea } = Input;
@connect
class siteEvaluationView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            load: false,
            data: {},
            scene_appraise:{},
            check_info: [
                {
                    appendix_name: [{ name: 1 }],
                    appendix_path: [{}],
                    content: '',
                    complete_time: '',
                }
            ],
            url: '',
            complete_time: '',
            fileList: [],
            radio: 0,


        }

    }

    componentDidMount = () => {
        axios.post('v1/appraise/sceneData', { id: this.props.match.params.checkdir_id, level: this.props.match.params.level, org_id: this.props.match.params.org_id })
            .subscribe(res => {
                this.setState({
                    radio:res.data.data.scene_appraise.review_result,
                    url: res.data.data.domain,
                    load: true,
                    data: res.data.data.form_info,
                    scene_appraise:res.data.data.scene_appraise,
                    check_info: res.data.data.check_info,
                    complete_time: res.data.data.check_info.length == 0 ? '' : res.data.data.check_info[res.data.data.check_info.length - 1].complete_time
                }, () => {
                    let fileList = []
                    if (this.state.check_info.length != 0) {
                        let data = this.state.check_info[this.state.check_info.length - 1]
                        for (let i = 0; i < data.appendix_name.length; i++) {
                            fileList.push({ name: data.appendix_name[i], url: this.state.url + data.appendix_path[i], status: 'done', uid: `${i + 1}`, })
                        }
                        this.setState({
                            fileList: fileList
                        })
                    }
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
        return this.state.check_info.length > i ? 'item' : this.state.check_info.length == i ? 'item' : this.state.check_info.length < i ? 'wait' : '';
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




    render() {
        let { data, check_info } = this.state
        let frequency = []
        for (let i = 0; i < data.frequency; i++) {
            frequency.push(i)
        }
        let content = this.state.check_info[this.state.check_info.length - 1] || { content: '' }

        let scene_appraise = ''


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


                                <TextArea className="text-top" rows={5} disabled value={content.content} />

                            </Form.Item>
                            <Form.Item label=" "  {...formItemLayout} >
                                <Upload {...this.upload} fileList={this.state.fileList} disabled>
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

                            </Form.Item>


                        </Form>

                        <Form >
                            <Form.Item {...formItemLayout} label="审核结论">
                                <Radio.Group onChange={this.onChangeRadio} value={this.state.radio} disabled>
                                    <Radio value={1}>审核通过</Radio>
                                    <Radio value={2}>审核不通过</Radio>
                                </Radio.Group>
                            </Form.Item>

                            <Form.Item label="考核分值"  {...formItemLayout} >
                                <div class="layout">
                                    <InputNumber min={1} max={10000} value={this.state.scene_appraise.review_score} disabled />
                                    <span>分</span>
                                </div>
                            </Form.Item>

                            <Form.Item label="审核意见"  {...formItemLayout} >
                                <TextArea rows={4} disabled value={this.state.scene_appraise.review_suggest} />
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div >
        )
    }
}
const form = Form.create()(siteEvaluationView);

export default form