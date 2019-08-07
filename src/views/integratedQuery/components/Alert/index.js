import React, { Component, Fragment } from 'react'
import connect from 'connect'
import './index.less'
import { Modal, Button } from 'antd';

@connect
class Nav extends Component {
  render() {
    const { alertClose } = this.props
    const { alertInfo } = this.props.state
    return (
      <Fragment>
        <Modal
          centered
          wrapClassName='ModalAlert'
          title={alertInfo.title}
          visible={alertInfo.visible}
          onOk={alertInfo.handleOk}
          onCancel={alertClose}
          okText={alertInfo.okText}
        >
          <p>{alertInfo.des}</p>
        </Modal>
      </Fragment>
    )
  }
}

export default Nav