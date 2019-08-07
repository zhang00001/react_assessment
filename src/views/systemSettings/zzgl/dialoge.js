import React from 'react'
import { Table ,
    Pagination,
    Switch,
    Modal,
    Button,
    Form,
    Input,
    TextArea,
    AutoComplete,
    Radio,
    Select,
    TreeSelect,
    message}
     from 'antd';
const { TreeNode } = TreeSelect;
import axios from '../../../utils/axios';
import connect from 'connect'

@connect
class AddDialoge extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            data:[],
            visible:false,
            total:'',
            title:'添加',
            value:0,
            treeValue:undefined,
            zzList:[],
            formData:{
            }
        }
    }
    componentDidMount(){
        console.log(this.props.userInfo)
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        const {closeModal,updateOriginTable} =this.props;
        const {modalStatus,zzlist,getOriginInfo,OriginTable} = this.props.state;
        console.log(OriginTable)
        return(
            <div className="formDialoge">
               <Modal
                        title={this.state.title}
                        visible={modalStatus.visible}
                        onOk={(e)=>this.handleOk(e)}
                        onCancel={()=>this.handelCancel()}
                        >
                            <Form >
                                <div className="inputItem">
                                    <Form.Item label="单位名称：" className="roleName">
                                        {getFieldDecorator('org_name', {
                                            rules: [{ required: true, message: '请填写组织名称' }],
                                            initialValue:getOriginInfo&&getOriginInfo.org_name||''
                                        })(<Input />)}
                                    </Form.Item>
                                    <Form.Item label="单位编号" className="roleName">
                                         {getFieldDecorator('org_order', {
                                            rules: [{ required: true, message: '请填写单位编号' }],
                                            initialValue:getOriginInfo&&getOriginInfo.org_order||''
                                        })(<Input />)}
                                    </Form.Item>
                                    <Form.Item label="上级企业:" className="roleName">
                                            {
                                                getFieldDecorator('org_pid',{
                                                    rules: [
                                                                {
                                                                    required: true,
                                                                    message: '请选择所属组织',
                                                                },
                                                            ],
                                                    initialValue:getOriginInfo&&getOriginInfo.id||''
                                                })(<TreeSelect
                                                    treeData={zzlist.org_ist}
                                                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                                    placeholder="选择组织查询"
                                                    allowClear
                                                    treeDefaultExpandAll
                                                        >
                                                    </TreeSelect>) 
                                            }
                                        <p className="formItemTips">[不选择分类则默认为顶级分类]</p>
                                    </Form.Item>
                                    <Form.Item label="账号状态:" className="roleName accountStatus">
                                        {getFieldDecorator('account_status', {
                                                rules: [
                                                    { required: true,
                                                      message: '请填写组织名称' 
                                                    }],
                                                    initialValue:getOriginInfo&&getOriginInfo.account_status||1
                                            }
                                            )(<Radio.Group>
                                            <Radio value={1}>启用</Radio>
                                            <Radio value={0}>停用</Radio>
                                        </Radio.Group>)}
                                    </Form.Item>
                                </div>
                             </Form>
                     </Modal>     
            </div>
        )   
    }
    handelCancel(){
        this.props.form.resetFields();
        this.props.closeModal();
    }
    handleOk =(e)=>{
        console.log(e);
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
          if(this.props.state.getOriginInfo
            &&Object.keys(this.props.state.getOriginInfo).length>0){
            axios.post('v1/Organization/edit',{
                ...values,
                id:this.props.state.getOriginInfo.id,
                }).subscribe((res)=>{
                    if(res.data.code==200){
                        message.success('数据提交成功');
                        this.props.form.resetFields();
                        this.props.closeModal();
                        console.log(this.props.state.OriginTable)
                        this.props.state.OriginTable.originTable.map((el,index)=>{
                            if(el.id==res.data.data.id){
                                this.props.state.OriginTable.originTable[index]=res.data.data
                            };
                            console.log(this.props.state.OriginTable)
                            this.props.updateOriginTable(this.props.state.OriginTable)
                        })
                    }
                })
          }else{
            axios.post('v1/Organization/create',{
                ...values
                }).subscribe((res)=>{
                    if(res.data.code==200){
                        this.props.state.OriginTable.originTable.push(res.data.data);
                        this.props.state.OriginTable.total=this.props.state.OriginTable.total+1;
                        message.success('数据提交成功');
                        this.props.form.resetFields();
                        this.props.closeModal();
                        this.props.updateOriginTable(this.props.state.OriginTable);
                        console.log(this.props.state.OriginTable)
                    }
                })
            }
        });
      };

}
export default Form.create()(AddDialoge);