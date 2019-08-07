import React, { Component, Fragment } from 'react'
import connect from 'connect'
import './index.less'
import { Table, Divider, Button, LocaleProvider, Input, Form } from 'antd';
const { TextArea } = Input;
import zhCN from 'antd/lib/locale-provider/zh_CN';

const EditableContext = React.createContext();
const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);
const EditableFormRow = Form.create()(EditableRow);
class EditableCell extends React.Component {
  state = {
    editing: false,
  }
  renderCell = form => {
    this.form = form
    const { children, dataIndex, record, title } = this.props
    const { editing } = this.state
    return record.edit ? (
      <Form.Item style={{ margin: 0 }}>
        {form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true,
              message: `${title}不能为空`,
            },
          ],
          initialValue: record[dataIndex],
        })(<TextArea autosize ref={node => (this.input = node)} onChange={(e)=>this.handleTableInputChange(e,record,dataIndex)} />)}
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
      >
        {children}
      </div>
    )
  }
  handleTableInputChange(e,record,dataIndex){
    record[dataIndex] = e.target.value
  }
  render() {
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
        ) : (
          children
        )}
      </td>
    );
  }
  save = e => {
    const { record } = this.props;
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      console.log(values,record)
    });
  };
}

@connect
class TableUI extends Component {

  render() {
    const { columnsData, initFuc, checkboxChange, handleDeleteBatch, batchDeleteFuc } = this.props
    const { tableData } = this.props.state
    // checkbox
    const rowSelection = {
      selectedRowKeys: tableData.selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        checkboxChange(selectedRowKeys)
      }
    }
    const itemRender = (current, type, originalElement) => {
      if (type === 'prev') {
        return (
          <div className='prevBtn'>
            <i className='iconfont dangjiankaohe_icon_fenye_l'></i>
          </div>
        )
      }
      if (type === 'next') {
        return (
          <div className='nextBtn'>
            <i className='iconfont dangjiankaohe_icon_fenye_r'></i>
          </div>
        )
      }
      return originalElement;
    }
    // 分页
    const pagination = {
      showQuickJumper:  true,
      showTotal: total => `共 ${total/999<1?1:total/999} 页`,
      defaultCurrent: 1,
      current: tableData.pagination.page,
      defaultPageSize: 999,
      total: tableData.pagination.pages*999,
      onChange: (e) => { initFuc(e) },
      itemRender:itemRender
    }
    // 表格修改
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    }
    const columns = columnsData.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    })
    return (
      <div className='TableUI'>
        <LocaleProvider locale={zhCN}>
          <Table 
          loading = {tableData.loading}
          components={components}
          rowClassName={() => 'editable-row'} 
          pagination={pagination} 
          rowSelection={rowSelection} 
          footer={() => (<Button className='deleteBtn' onClick={()=>{batchDeleteFuc()}}>删除</Button>)} 
          columns={columns} 
          dataSource={tableData.list} />
        </LocaleProvider>
      </div>
    )
  }
  componentDidMount(){
    console.log(this,8888)
    // this.props.onRef(this)
  }
  test = (e)=>{
    console.log(EditableCell,8888)
  }
}

export default TableUI