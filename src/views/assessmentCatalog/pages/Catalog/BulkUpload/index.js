import React, { Component, Fragment } from 'react';
import connect from 'connect'
import { Modal, Button, Alert, Icon, Upload } from 'antd';
import './index.less'

@connect
class BulkUpload extends Component {
  render() {
    const { bulkUploadData } = this.props.state
    const { width, handleChangeBulkUploadVisible } = this.props
    const uploadProps = {
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      onChange({ file, fileList }) {
        if (file.status !== 'uploading') {
          console.log(file, fileList);
        }
      },
      defaultFileList: [
        // {
        //   uid: '1',
        //   name: 'xxx.png',
        //   status: 'done',
        //   response: 'Server Error 500', // custom error message to show
        //   url: 'http://www.baidu.com/xxx.png',
        // },
        // {
        //   uid: '2',
        //   name: 'yyy.png',
        //   status: 'done',
        //   url: 'http://www.baidu.com/yyy.png',
        // },
        // {
        //   uid: '3',
        //   name: 'zzz.png',
        //   status: 'error',
        //   response: 'Server Error 500', // custom error message to show
        //   url: 'http://www.baidu.com/zzz.png',
        // },
      ],
    };
    return (
      <Fragment>
        <Modal
          centered
          wrapClassName='ModalBulkUpload'
          title="批量上传"
          width={width}
          visible={bulkUploadData.visible}
          onOk={()=>{handleChangeBulkUploadVisible({visible:false})}}
          onCancel={()=>{handleChangeBulkUploadVisible({visible:false})}}
          okText="下一步"
          cancelText="取消"
        >
          <div className='borderBox'>
            <p className='title'>填写导入数据信息</p>
            <p className='des'>请按照数据模版的格式准备导入数据，模版中的表头名称不可更改，表头行不能删除</p>
            <Button type="primary"><i className='iconfont dangjiankaohe_icon_xiazai'></i>下载模版</Button>
          </div>
          <div className='borderBox'>
            <p className='title'>上传填好的信息表</p>
            <p className='des'>文件后缀名必须为.xls或.xlsx（即Excel格式），文件大小须小于10M，最多支持导入3000条数据</p>
            <Upload {...uploadProps}><Button type="primary"><i className='iconfont dangjiankaohe_icon_shangchuan'></i>上传文件</Button></Upload>
          </div>
          <Alert
            message={<span className='message'><Icon type="info-circle" theme="filled" /><span>特别提示</span></span>}
            description="导入过程中如发现同名数据，则更新这条客户数据"
            type="info"
          />
        </Modal>
      </Fragment>
    );
  }

}
export default BulkUpload;