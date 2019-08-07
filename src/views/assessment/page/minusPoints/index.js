import React from 'react'
import './index.less'
import { Table, Divider, Tag } from 'antd';
import { Form, Button, Select, Modal, Input } from 'antd';
import axios from 'utils/axios'
import { DatePicker } from 'antd';


class minusPoints extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            page: 1,
            year: new Date().getFullYear(),
            loading: true,
            paginationProps: {
                showQuickJumper: true,
                showTotal: () => `共10页   /  100条数据`,
                pageSize: 10,
                current: 1,
                total: 100,
                onChange: (current) => this.initData(current, null),
            }
        }
    }




    componentDidMount = () => {
        axios.get('v1/appraise/subScore', { page: 1, limit: '10' })
            .subscribe(res => {
                this.setState({
                    isopen: false,
                    time: null,
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
            dataIndex: 'org_order',
            key: 'org_order',
            width: "299px"
        },
        {
            title: '组织名称',
            dataIndex: 'org_name',
            key: 'org_name',
            width: "790px"
        },
        {
            title: '日常落实分值',
            dataIndex: 'sub_score',
            key: 'sub_score',
            width: "289px",
            render: (sub_score, record) => (
                sub_score == '' ? '——' : sub_score
            ),
        },

        {
            title: '状态',
            dataIndex: 'sub_score',
            key: 'sub_score',
            width: "289px",
            render: (sub_score, record) => (
                record.is_add_sub == 0 ? '待提供减分材料' : record.sub_score == '' ? '待打分' : record.is_add_sub == 0 ? '无减分项' : '已打分'
            ),
        },

        {
            title: '减分材料',
            dataIndex: 'appendix_path',
            key: 'appendix_path',
            width: "339px",
            render: (appendix_path, record) => (
                appendix_path == '' ? <div class="self">提交材料</div> : <div class="view">查看材料</div>
            )
        },

        {
            title: '减分',
            dataIndex: 'is_add_sub',
            key: 'is_add_sub',
            width: "339px",
            render: (is_add_sub, record) => (
                is_add_sub == 0 ? <div class="gray" onClick={() => this.goEdit(record.id)}>减分</div>
                    : record.sub_score >= 0 ? <div class="view" onClick={() => this.goView(record.id)}>查看</div> : <div class="view" onClick={() => this.goEdit(record.id)}>减分</div>
            ),
        },
    ];

    goEdit(id) {
        this.props.history.push({ pathname: `/assessment/minusPointsEdit/${this.state.year}/${id}` })

    }

    goView(id) {
        this.props.history.push({ pathname: `/assessment/minusPointsView/${this.state.year}/${id}` })

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



    initData = (page, year) => {
        axios.get('v1/appraise/dailySituation', { page: page, limit: 10, year: year })
            .subscribe(res => {
                this.setState({
                    data: res.data.data,
                    loading: false,
                    paginationProps: {
                        showTotal: () => `共${Math.ceil(res.data.count / 10)}页   /  ${res.data.count}条数据`,
                        current: page,
                        total: res.data.count
                    }
                })
            })
    }

    handlePanelChange = (value) => {

        let year = new Date(value._d).getFullYear()
        // this.setState=({
        //     year:year
        // })
        this.initData(1, year);
        this.setState({
            time: value,
            year: year,
            isopen: false
        })
    }

    handleOpenChange = (status) => {
        // console.log(status)    
        if (status) {
            this.setState({ isopen: true })
        } else {
            this.setState({ isopen: false })
        }
    }

    clearValue = () => {
        this.setState({
            time: null
        })
    }

    render() {
        return (
            <div class="container" >
                <DatePicker
                    value={this.state.time}
                    open={this.state.isopen}
                    mode="year"
                    placeholder='请选择年份'
                    format="YYYY"
                    onOpenChange={this.handleOpenChange}
                    onPanelChange={this.handlePanelChange}
                    onChange={this.clearValue}
                />
                <Table columns={this.columns} bordered dataSource={this.state.data} pagination={this.state.paginationProps} loading={this.state.loading} />
            </div >
        )

    }
}

export default minusPoints