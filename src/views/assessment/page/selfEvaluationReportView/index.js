import React from 'react'
import './index.less'
import { Table, Divider, Tag } from 'antd';
import { Form, Button, Select, Modal, Input, Upload, message, Icon } from 'antd';
import axios from 'utils/axios'
import { Row, Col, Card } from 'antd'

import connect from 'connect'


const formItemLayout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 20 },
};
const { TextArea } = Input;
@connect
class selfEvaluationReportView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: ''
        }
    }

    componentDidMount = () => {
        axios.post('v1/appraise/selfReportData', { report_year: this.props.match.params.id }).subscribe(res => {
            this.setState({
                content: res.data.data.report_content
            })
        })
    }


    render() {


        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        return (
            <div className="edit_wrapper" >
                <div className="selfEdit">
                    <h1 class="style">自评报告</h1>
                    <div class="solid"></div>
                    <div class="formContent">
                        <div dangerouslySetInnerHTML={{
                            __html: this.state.content
                        }} />
                    </div>
                </div>
            </div>
        )
    }
}
const form = Form.create()(selfEvaluationReportView);

export default form