import React from 'react'
import './index.less'
import { Table, Divider, Tag } from 'antd';
import { Form, Button, Select, Modal } from 'antd';
import axios from 'utils/axios'
import { DatePicker } from 'antd';





class bonus extends React.Component {
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
                onChange: (current) => this.initData(current),
            }
        }
    }




    componentDidMount = () => {
        axios.get('v1/appraise/addScore', { page: 1 })
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
            title: '加分项分值',
            dataIndex: 'is_check',
            key: 'is_check',
            width: "289px",

        },

        {
            title: '操作',
            dataIndex: 'add_score',
            key: 'add_score',
            width: "339px",
            render: (status, record) => (
                status === 0 ? <div class="self" onClick={()=>this.goEdit(record.id)}>加分</div> : <div class="view" onClick={()=>this.goView(record.id)}>查看</div>
            ),
        },
    ];

    goEdit(id) {
        this.props.history.push({ pathname: `/assessment/bonusEdit/${this.state.year}/${id}` })
    }

    goView(id) {
        this.props.history.push({ pathname: `/assessment/bonusView/${this.state.year}/${id}` })
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



    initData = (page,year) => {
        axios.get('v1/appraise/addScore', { page: page, type: 'self_appraise_plan',year:year })
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

    
    handlePanelChange = (value) => {
       
        let year =new Date(value._d).getFullYear()
        // this.setState=({
        //     year:year
        // })
        this.initData(1,year);
        this.setState({
            time: value,
            year:year,
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
export default bonus