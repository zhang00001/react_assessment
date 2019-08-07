import React from 'react'
import './index.less'
import { Table, Divider, Tag } from 'antd';
import { Form, Button, Select, Modal } from 'antd';
import axios from 'utils/axios'






class selfEvaluationReport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            page: 1,
            loading: true,
            paginationProps: {
                showQuickJumper: true,
                showTotal: () => `共10页   /  100条数据`,
                pageSize: 10,
                current: 1,
                total: 100,
                onChange: (current) => this.initData(current),
            }
        }
    }

    componentDidMount = () => {
        axios.get('v1/appraise/selfReportList', { page: 1 })
            .subscribe(res => {
                this.setState({
                    data: res.data.data,
                    loading: false,
                    paginationProps: {
                        showTotal: () => `共${Math.ceil(res.data.count / 10)}页   /  ${res.data.count}条数据`,
                        current: 1,
                        total: res.data.count
                    }
                })
            })
    }



    columns = [
        {
            title: '编号',
            dataIndex: 'report_order',
            key: 'report_order',
            width: "299px"
        },
        {
            title: '评价年份',
            dataIndex: 'report_year',
            key: 'report_year',
            width: "790px"
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            width: "289px",
            render: (status, record) => (
                <span>{status === 0 ? '为编辑' : status == 1 ? '已编辑' : ''}</span>
            ),
        },
        {
            title: '自评',
            dataIndex: 'status',
            key: 'status',
            width: "339px",
            render: (status, record) => (
                status === 0 ?
                    <div class="self" onClick={() => this.goEdit(record)}>自评</div>
                    : <div class="view" onClick={() => this.goView(record)}>查看</div>
            ),
        },
    ];

    goEdit(record) {
        if(record.disabled==0){
            message.error('您没有权限操作')
            return
       }
        this.props.history.push({ pathname: `/assessment/selfEvaluationReportEdit/${record.report_year}` })
    }

    goView(record) {
        this.props.history.push({ pathname: `/assessment/selfEvaluationReportView/${record.report_year}` })
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



    initData = (page) => {
        axios.get('v1/appraise/selfList', { page: page, type: 'self_appraise_plan' })
            .subscribe(res => {
                this.setState({
                    data: res.data.data,
                    loading: false,
                    paginationProps: {
                        showTotal: () => `共${res.data.count}页   /  ${res.data.count}条数据`,
                        current: page,
                        total: res.data.count
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

export default selfEvaluationReport