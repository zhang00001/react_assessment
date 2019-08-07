import React from 'react'
import './index.less'
import { Table, Divider, Tag, message } from 'antd';
import { Form, Button, Select, Modal } from 'antd';
import axios from 'utils/axios'
import connect from 'connect'
import { Level } from 'chalk';




@connect
class selfEvaluation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: true,
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




    componentDidMount = () => {
        axios.get('v1/appraise/selfList', { page: 1, type: 'self_appraise_plan' })
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
            title: '状态',
            dataIndex: 'kh_status',
            key: 'kh_status',
            width: "148px",
            render: (kh_status, record) => (
                <span>{kh_status === 0 ? '待自评' : kh_status == 1 ? '待考核' : kh_status == 2 ? '考核通过' : kh_status == 3 ? '考核不通过' : ''}</span>
            ),
        },

        {
            title: '自评',
            dataIndex: 'kh_status',
            key: 'kh_status',
            width: "148px",
            render: (text, record, index) => (
                text === 0 ? <div class="self" onClick={() => this.goEdit(record)}>自评</div> : <div class="view" onClick={() => this.goView(record)}>查看</div>
            ),
        },
    ];

    goEdit(record) {
        if(record.disabled==0){
             message.error('您没有权限操作')
             return
        }
        this.props.history.push({ pathname: `/assessment/selfEvaluationEdit/${record.checkdir_id}/${record.level}` })

    }

    goView(record) {
        if(record.disabled==0){
            message.error('您没有权限操作')
            return
       }
        this.props.history.push({ pathname: `/assessment/selfEvaluationView/${record.checkdir_id}/${record.level}` })
    }

    state = { visible: false };
    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        this.setState({
            visible: false,
        });
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

    initData = (page) => {
        axios.get('v1/appraise/selfList', { page: page, type: 'self_appraise_plan' })
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

    render() {

        return (
            <div class="container" >
                <Table columns={this.columns} bordered dataSource={this.state.data} pagination={this.state.paginationProps} loading={this.state.loading} />
                <Modal
                    title="企业自评人员"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    centered='true'
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
            </div >
        )

    }
}

export default selfEvaluation



