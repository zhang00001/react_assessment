import React from 'react'
import './index.less'
import { Table, Divider, Tag, message } from 'antd';
import { Form, Button, Select, Modal } from 'antd';
import axios from 'utils/axios'
import { Radio, Input } from 'antd';

class PublishTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: "",
            user_id: '',
            record: {},
            value: 1,
            data: [],
            loading: true,
            people: [{
                id: 2,
                name: "yet",
                real_name: "叶添1"
            }],
            option1: [],
            option2: [],
            company: [],
            first_target_id: '',
            second_target_id: '',
            paginationProps: {
                showQuickJumper: true,
                showTotal: () => `共10页   /  100条数据`,
                pageSize: 9999,
                current: 1,
                total: 100,
                onChange: (current) => this.initData(current),
            }
        }
    }

    publish() {
        axios.post('v1/appraise/publishAppraiseTask').subscribe(res => {
            message.success(res.data.msg)
        })
    }

    componentDidMount = () => {
        axios.get('v1/appraise/appraiseTaskPlan', { page: 1, type: 'appraise_task_plan' })
            .subscribe(res => {
                this.setState({
                    data: res.data.data,
                    loading: false,
                    paginationProps: {
                        showTotal: () => `共${res.data.pagination.pages}页   /  ${res.data.pagination.total}条数据`,
                        current: res.data.pagination.page,
                        total: 9999 * res.data.pagination.pages
                    }
                })
            })


        //option1
        axios.get('v1/checkdir/getdirtree')
            .subscribe(res => {
                this.setState({
                    option1: res.data.data,
                })
            })

        //company
        axios.get('v1/Organization/getChildOrg')
            .subscribe(res => {
                this.setState({
                    company: res.data.data,
                })
            })

    }

    selectOption = (v) => {
        let option2 = this.state.option1.filter(e => e.checkdir_id == v)
        this.props.form.setFields({ "second_target_id": '' });
        this.setState({
            option2: option2[0].children,
        })
    }


    columns = [
        {
            title: '编号',
            dataIndex: 'checkdir_id',
            key: 'checkdir_id',
            width: "146px"
        },
        {
            title: '一级指标',
            dataIndex: 'dir_name_1',
            key: 'dir_name_1',
            width: "111px"
        },
        {
            title: '二级指标',
            dataIndex: 'dir_name_2',
            key: 'dir_name_2',
            width: "223px"
        },
        {
            title: '重点考核内容',
            key: 'dir_name_3',
            dataIndex: 'dir_name_3',
            width: "360px"
        },
        {
            title: '评分要点',
            dataIndex: 'dir_name_4',
            key: 'dir_name_4',
            width: "473px"
        },

        {
            title: '分值',
            dataIndex: 'standard_score',
            key: 'standard_score',
            width: "112px"
        },

        {
            title: '频次（次/年）',
            dataIndex: 'frequency',
            key: 'frequency',
            width: "140px"
        },

        {
            title: '考核人员',
            dataIndex: 'pid',
            key: 'pid',
            width: "148px",
            render: (text, record) => (
                record.user_info.id
                    ?
                    record.is_pubilsh == 0
                        ?
                        <span className="people" onClick={() => this.showModal(record)}>{record.user_info.real_name}</span>
                        :
                        record.user_info.real_name
                    :
                    <i onClick={() => this.showModal(record)} class="iconfont dangjiankaohe_icon_tianjiarenyuan"></i>

            )
        },
    ];

    fetch() {
        axios.get('v1/appraise/getPeople', { org_id: this.state.org_id }).subscribe(res => {
            this.setState({
                people: res.data.data,
            })
        })
    }

    state = { visible: false };
    showModal = (record, type) => {
        this.fetch()
        this.setState({
            visible: true,
            type: type
        });
        if (record) {
            this.setState({
                record: record
            });
        }
    };

    handleOk = e => {
        this.setState({
            visible: false,
        });
         console.log(this.state.type)
        if (this.state.type != undefined) {
  
            axios.post('v1/appraise/doHand', {
                appraise_user: this.state.user_id,
                type: this.state.type
            }).subscribe(res => {
                message.success(res.data.msg)
            })
            return
        }

        axios.post('v1/appraise/setAppraiseTaskUser', {
            checkdir_id: this.state.record.checkdir_id,
            level: this.state.record.level,
            appraise_user: this.state.user_id,
            type: 'self_appraise_plan'
        }).subscribe(res => {
            message.success(res.data.msg)
            this.initData()
        })
    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            this.setState({
                loading: true,
                first_target_id: values.first_target_id,
                second_target_id: values.second_target_id
            }, () => {
                this.initData(1)
            })
        });
    };

    onChange = e => {
        this.setState({
            user_id: e.target.value,
        });
    };

    initData = (page) => {
        axios.get('v1/appraise/selfAppraisePlan', { page: page, first_target_id: this.state.first_target_id, second_target_id: this.state.second_target_id })
            .subscribe(res => {
                this.setState({
                    data: res.data.data,
                    loading: false,
                    paginationProps: {
                        showTotal: () => `共${res.data.pagination.pages}页   /  ${res.data.pagination.total}条数据`,
                        current: res.data.pagination.page,
                        total: 9999 * res.data.pagination.pages
                    }
                })
            })
    }

    selectCompany = e => {
        this.setState({
            org_id: e
        })

    }


    render() {
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };
        const { getFieldDecorator } = this.props.form;
        return (
            <div class="container" >
                <div class="top">
                    <div>
                        <Select className="company" placeholder="公司" onChange={this.selectCompany}>
                            {this.state.company.map(e =>
                                <Option value={e.id}>{e.org_name}</Option>
                            )}
                        </Select>


                        <Button className="carriedOut" onClick={() => { this.showModal(null, 1) }}><i class="iconfont dangjiankaohe_icon_tianjiarenyuan"></i><span>指定加分项执行人</span></Button>
                        <Button className="carriedOut2" onClick={() => { this.showModal(null, 2) }}><i class="iconfont dangjiankaohe_icon_tianjiarenyuan"></i><span>指定提供减分项目执行人</span></Button>

                        <Button class="send" onClick={() => { this.publish() }}><i class="iconfont dangjiankaohe_icon_fabu"></i><span>发布任务</span></Button>
                    </div>
                    <Form layout='inline' onSubmit={this.handleSubmit} >
                        <Form.Item >
                            {getFieldDecorator('first_target_id')(
                                <Select placeholder="请选择一级指标" onChange={this.selectOption}>
                                    {this.state.option1.map(e =>
                                        <Option value={e.checkdir_id}>{e.dir_name}</Option>
                                    )}
                                    <Option value=''>全部</Option>
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item >
                            {getFieldDecorator('second_target_id')(
                                <Select placeholder="请选择二级指标">
                                    {this.state.option2.map(e =>
                                        <Option value={e.checkdir_id}>{e.dir_name}</Option>
                                    )}
                                    <Option value=''>全部</Option>
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item >
                            <Button className="resBg" htmlType="submit"><i class="iconfont dangjiankaohe_icon_sousuo"></i>查询结果</Button>
                        </Form.Item>
                    </Form>
                </div>
                <Table columns={this.columns} bordered dataSource={this.state.data} pagination={this.state.paginationProps} loading={this.state.loading} />
                <Modal
                    title="企业自评人员"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    centered='true'
                    width="150px;"
                >
                    <div className="content">
                        <Radio.Group onChange={this.onChange} value={this.state.user_id}>
                            {
                                this.state.people.map(e =>
                                    <div class="item" >
                                        <div class="name">
                                            <i class="iconfont dangjiankaohe_icon_renyuan"></i>
                                            <div>
                                                <div>{e.real_name}</div>
                                                <div>{e.name}</div>
                                            </div>
                                        </div>
                                        <Radio style={radioStyle} value={e.id}>
                                        </Radio>
                                    </div>

                                )
                            }

                        </Radio.Group>
                    </div>
                </Modal>
            </div >
        )

    }
}
const searchForm = Form.create({})(PublishTask);
export default searchForm




