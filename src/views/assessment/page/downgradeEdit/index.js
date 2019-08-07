import React from 'react'
import './index.less'
import { Radio } from 'antd';
import { Form, Button, Select, Modal, Input, Upload, message, Icon, InputNumber, Checkbox, Row, Col } from 'antd';
import axios from 'utils/axios'
import connect from 'connect'
import { json } from 'graphlib';


const formItemLayout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 20 },
};
const { TextArea } = Input;
@connect
class bonusEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: "",
            value: 1,
            visible: false,
            value2: 1,
            visible2: false,
            value3: 1,
            visible3: false,
            load: false,
            name: '',
            check_info: [],
            complete_time: '',
            option1: [],
            option2: [],
            option3: [],
            add_item: [],
            add_project: [],
            hand_id: "",
            project: [],
            project_item: [],
            project_item2: [],
            project_item3: []
        }

    }

    componentDidMount = () => {
        axios.post('v1/appraise/kickDownData', { check_year: this.props.match.params.year, org_id: this.props.match.params.id })
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
                let add_project = this.state.add_project
                // add_project.forEach((e,index) => {
                //     add_projectp[index] = e.join(':')
                // })
                let add_project2 = []
                for (let item of add_project) {
                    add_project2.push(item.join(':'))
                }

                add_project2 = JSON.stringify(add_project2)

                axios.post('v1/appraise/submitKickDown', {
                    org_id: this.props.match.params.id,
                    check_year: this.props.match.params.year,
                    condition_project: add_project2,
                    down_result: values.down_result,
                    appraise_content: values.add_detail,
                    appendix_name: name.join(','),
                    appendix_path: path.join(','),
                })
                    .subscribe(res => {
                        message.success(res.data.msg)
                        if (res.data.code == 200) {
                            history.go(-1)
                        }
                    })
            }
        });
    };
    //  第一步
    showModal = () => {
        axios.post('v1/appraise/chooseProject', {
            step: '1',
            type: '3',
            pid: '0'
        }).subscribe(res => {
            this.setState({
                option1: res.data.data
            })
        })
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        axios.post('v1/appraise/chooseProject', {
            step: '2',
            type: '3',
            pid: this.state.value
        }).subscribe(res => {
            this.setState({
                option2: res.data.data
            })
        })
        this.setState({
            visible: false,
            visible2: true
        });
    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };


    onChange = e => {
        let item = this.state.option1.filter(item => item.id == e.target.value)[0].zhibiao_name
        let project = []
        project.push(item)
        this.setState({
            value: e.target.value,
            project_item: project
        }, () => {
            console.log(this.state.project_item)
        });



    };

    // 第二部


    handleOk2 = e => {
        axios.post('v1/appraise/chooseProject', {
            step: '3',
            type: '3',
            pid: this.state.value2
        }).subscribe(res => {
            this.setState({
                option3: res.data.data.condition,
                hand_id: res.data.data.hand_id
            })
        })

        this.setState({
            visible2: false,
            visible3: true,
        });
    };

    handleCancel2 = e => {
        this.setState({
            visible2: false,
        });
    };


    onChange2 = e => {
        let item = []
        item.push(
            this.state.option2.filter(item => item.id == e.target.value)[0].zhibiao_name
        )
        this.setState({
            value2: e.target.value,
            project_item2: item
        }, () => {
            console.log(this.state.project_item2)
        });


    };

    // 第三步
    //去重
    unique(arr) {
        return [...new Set(arr)];
    }


    handleOk3 = e => {

        let project = this.state.project
        let project_item = []

        project_item.push(...this.state.project_item)
        project_item.push(...this.state.project_item2)



        if (this.state.index == '') {
            project.remove(this.state.index)
        }

        this.state.project_item3.forEach((e) => {
            let project_item2 = []
            project_item2.push(project_item.concat(e))
            project.push(project_item2)
        })


        let add_project = this.state.add_project



        let push = true
        add_project.forEach((e, index) => {
            if (e[0] == this.state.add_item[0]) {
                e.push(...this.state.add_item)
                add_project[index] = this.unique(e)
                console.log(add_project[index])
                push = false
            }
        })

        if (push) {
            add_project.push(this.state.add_item)
        }

        this.setState({
            visible3: false,
            add_project: add_project,
            value: 1,
            value2: 1,
            value3: 1,
            project: project
        });
        console.log(this.state.project)

        console.log(this.state.add_project)
    };

    //编辑
    edit = index => {
        this.setState({
            index: index
        })

        this.showModal()
    }

    handleCancel3 = e => {

        this.setState({
            visible3: false,
        });
    };


    onChange3 = v => {
        let project_item = [];
        for (let i = 0; i < v.length; i++) {
            project_item.push(this.state.option3[v[i]])
        }
        let project = []
        project.push(item)
        v.unshift(this.state.hand_id)
        let item = v
        this.setState({
            add_item: item,
            project_item3: project_item
        }, () => {
            console.log(this.state.project_item3)
        })


    }




    render() {
        const { getFieldDecorator } = this.props.form;
        const { name } = this.state
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };
        return (
            <div className="edit_wrapper" >
                <div className="selfEdit">
                    <div class="formContent">
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Item label="降档企业"  {...formItemLayout} >
                                <Input disabled value={this.state.name} />
                            </Form.Item>
                            <Form.Item label="满足条件"  {...formItemLayout} >

                                {
                                    this.state.project.map((e, index) =>
                                        <div class="item">
                                            <div class="text">{e.join('>')}</div>
                                            <div class="edit" onClick={() => this.edit(index)}><i class="iconfont dangjiankaohe_icon_xianchangpinjia"></i></div>
                                        </div>
                                    )
                                }
                                {getFieldDecorator('add_project', {
                                    rules: [{ required: true, message: '请填加分项目' }],
                                    initialValue: "1",
                                })(
                                    <Button type="primary" className="add" onClick={() => this.showModal()}>+</Button>
                                )}
                            </Form.Item>
                            <Form.Item label="党委评估"  {...formItemLayout} >
                                {getFieldDecorator('add_detail')(
                                    <TextArea className="text-top" rows={5} />
                                )}
                            </Form.Item>
                            <Form.Item label="降档结果"  {...formItemLayout} >

                                {getFieldDecorator('down_result ', {
                                    rules: [{ required: true, message: '请填写降档结果' }],
                                })(
                                    // <InputNumber min={1} max={10000} defaultValue={3} />
                                    <Select defaultValue="lucy" style={{ width: 560 }}>
                                        <Option value="0">不降档</Option>
                                        <Option value="1">良好</Option>
                                        <Option value="2">一般</Option>
                                        <Option value="3">较差</Option>
                                    </Select>
                                )}


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
                        {/* 第一步 */}
                        <Modal
                            title="添加加分项目"
                            visible={this.state.visible}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                            centered={true}
                            footer={[
                                <Button key="back" onClick={this.handleCancel}>
                                    取消
                                </Button>,
                                <Button key="submit" type="primary" onClick={this.handleOk}>
                                    下一步
                                </Button>,
                            ]}
                        >
                            <h4> 一级指标</h4>
                            <Radio.Group onChange={this.onChange} value={this.state.value}>
                                {
                                    this.state.option1.map(e =>
                                        <Radio style={radioStyle} value={e.id}>
                                            {e.zhibiao_name}
                                        </Radio>
                                    )
                                }
                            </Radio.Group>
                        </Modal>
                        {/* 第二步 */}
                        <Modal
                            title="添加加分项目"
                            visible={this.state.visible2}
                            onOk={this.handleOk2}
                            onCancel={this.handleCancel2}
                            centered={true}
                            footer={[
                                <Button key="back" onClick={this.handleCancel2}>
                                    取消
                                </Button>,
                                <Button key="submit" type="primary" onClick={this.handleOk2}>
                                    下一步
                                </Button>,
                            ]}
                        >
                            <h4> 二级指标</h4>
                            <Radio.Group onChange={this.onChange2} value={this.state.value2}>
                                {
                                    this.state.option2.map(e =>
                                        <Radio style={radioStyle} value={e.id}>
                                            {e.zhibiao_name}
                                        </Radio>
                                    )
                                }
                            </Radio.Group>
                        </Modal>
                        {/* 第三步 */}
                        <Modal
                            title="添加加分项目"
                            visible={this.state.visible3}
                            onOk={this.handleOk3}
                            onCancel={this.handleCancel3}
                            centered={true}
                            footer={[
                                <Button key="back" onClick={this.handleCancel3}>
                                    取消
                                </Button>,
                                <Button key="submit" type="primary" onClick={this.handleOk3}>
                                    完成
                                </Button>,
                            ]}
                        >
                            <h4> 三级指标</h4>
                            <Checkbox.Group style={{ width: '100%' }} onChange={this.onChange3}>
                                <Row>
                                    {
                                        this.state.option3.map((e, index) =>
                                            <Col span={24}>
                                                <Checkbox value={index}>{e}</Checkbox>
                                            </Col>
                                        )
                                    }

                                </Row>
                            </Checkbox.Group>
                        </Modal>
                    </div>
                </div>
            </div>
        )
    }
}
const form = Form.create()(bonusEdit);

export default form