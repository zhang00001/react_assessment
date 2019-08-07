import React from 'react'
import './index.less'
import { Table, Divider, Tag } from 'antd';
import { Form, Button, Select, Modal, Input, Upload, message, Icon } from 'antd';
import axios from 'utils/axios'
import { Row, Col, Card } from 'antd'
import Draft from 'components/Draft'
import draftToHtml from 'draftjs-to-html'
import draftToMarkdown from 'draftjs-to-markdown'
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

    callback = data => {
        let { content } = data
        this.setState({
            content: content
        })
    }

    //提交
    handleSubmit = e => {
        e.preventDefault();
        axios.post('v1/appraise/editSelfReport', {
            report_content: draftToHtml(this.state.content),
            report_year: this.props.match.params.id
        }).subscribe(res => {
            if (res.data.code == 200) {
                message.success(res.data.msg)
                history.go(-1)
            }
        })
    };


    render() {


        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        return (
            <div className="edit_wrapper" >
                <div className="selfEdit">

                    <div class="formContent">
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Item label="自评内容"  {...formItemLayout} >

                                {getFieldDecorator('content', {
                                    rules: [{ required: true, message: '请填写自评内容' }],
                                })(
                                    <Card >
                                        <Draft callback={this.callback.bind(this)} />
                                    </Card>
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
const form = Form.create()(selfEvaluationReportView);

export default form