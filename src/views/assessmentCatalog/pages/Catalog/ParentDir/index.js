import React, { Component, Fragment } from 'react';
import connect from 'connect'
import { Modal, Radio, Button, Icon, Tooltip, message, Empty, Spin } from 'antd'
import axios from 'axios'
import './index.less'

@connect
class ParentDir extends Component {
  state = {
    step: 1,
    itemStepOne:{},
    itemStepTwo:{},
    itemStepThree:{},
    stepTwoList:[],
    stepThreeList:[],
    visibleStep:false,
    title: '一级目录',
    loadingStep3: false,
    loadingStep2: false,
    footer:(
      <span>
        <Button hidden={this.props.onlyCurrent} onClick={()=>{this.setStep(2)}}>下一步</Button>
        <Button type='primary' onClick={()=>{this.handleCancelStep(1)}}>完成</Button></span>
    )
  }
  handleCancelStep = this.handleCancelStep.bind(this)
  handleInputClick = this.handleInputClick.bind(this)
  onChangeStepOne = this.onChangeStepOne.bind(this)
  onChangeStepTwo = this.onChangeStepTwo.bind(this)
  onChangeStepThree = this.onChangeStepThree.bind(this)
  render() { 
    const { placeholder } = this.props
    const { dircateList } = this.props.state
    return (
      <Fragment>
        <div className='ParentDir ant-input' onClick={this.handleInputClick}>
          {
            !this.state.itemStepOne.dir_name?(
              <span className='placeholder'>{placeholder}</span>
            ):(
              <ul>
                {
                 this.state.itemStepOne.dir_name&&(
                  <Tooltip title={this.state.itemStepOne.dir_name}>
                    <li onClick={()=>{this.handleItemClick(1)}}>
                      <span>{this.state.itemStepOne.dir_name}</span>
                      <Icon type="close" onClick={()=>{this.setState({itemStepOne:{},itemStepTwo:{},itemStepThree:{}}),this.props.GetParentDirValue()}} />
                    </li>
                  </Tooltip>)
                }
                {
                 this.state.itemStepTwo.dir_name&&(
                  <Tooltip title={this.state.itemStepTwo.dir_name}>
                    <li onClick={()=>{this.handleItemClick(2)}}>
                      <span>{this.state.itemStepTwo.dir_name}</span>
                      <Icon type="close" onClick={()=>{this.setState({itemStepTwo:{},itemStepThree:{}}),this.props.GetParentDirValue(this.state.itemStepOne.checkdir_id)}}/>
                    </li>
                  </Tooltip>)
                }
                {
                 this.state.itemStepThree.dir_name&&(
                  <Tooltip title={this.state.itemStepThree.dir_name}>
                    <li onClick={()=>{this.handleItemClick(3)}}>
                      <span>{this.state.itemStepThree.dir_name}</span>
                      <Icon type="close" onClick={()=>{this.setState({itemStepThree:{}}),this.props.GetParentDirValue(this.state.itemStepTwo.checkdir_id)}}/>
                    </li>
                  </Tooltip>)
                }
              </ul>
            )
          }
        </div>

        
        <Modal
          centered
          title='选择上级目录'
          wrapClassName='ParentDirModal'
          visible={this.state.visibleStep}
          footer={this.state.footer}
          onCancel={this.handleCancelStep}
        >
          {this.state.step===1&&(
          <div className='ModalContent'>
            <h3>{this.state.title}</h3>
            <Radio.Group onChange={this.onChangeStepOne} value={this.state.itemStepOne}>
              {
                (dircateList.first_list).map(item=>(
                  <Radio value={item}>{item.dir_name}</Radio>
                ))
              }
            </Radio.Group>
          </div>
          )}
          {this.state.step===2&&(
          <div className='ModalContent'>
            <div className='tip'>
              一级目录：<span>{this.state.itemStepOne.dir_name}</span>
            </div>
            <h3>{this.state.title}</h3>
            <Spin spinning={this.state.loadingStep2}>
            {
                this.state.stepTwoList.length==0?(<Empty />):(
                  <Radio.Group onChange={this.onChangeStepTwo} value={this.state.itemStepTwo}>
                    {
                      this.state.stepTwoList.map(item=>(
                        <Radio value={item}>{item.dir_name}</Radio>
                      ))
                    }
                  </Radio.Group>
                )
              }
            </Spin>
          </div>
          )}
          {this.state.step===3&&(
          <div className='ModalContent'>
            <div className='tip'>
              二级目录：<span>{this.state.itemStepTwo.dir_name}</span>
            </div>
            <h3>{this.state.title}</h3>
            <Spin spinning={this.state.loadingStep3}>
              {
                this.state.stepThreeList.length==0?(<Empty />):(
                  <Radio.Group onChange={this.onChangeStepThree} value={this.state.itemStepThree}>
                    {
                      this.state.stepThreeList.map(item=>(
                        <Radio value={item}>{item.dir_name}</Radio>
                      ))
                    }
                    </Radio.Group>
                )
              }
            </Spin>
          </div>
          )}
        </Modal>

      </Fragment>
    );
  }
  componentDidMount(){
    // this.props.getDircateList()
    if(this.props.onRef)this.props.onRef(this)
  }
  clear(){
    this.setState(
      {
        step: 1,
        itemStepOne:{},
        itemStepTwo:{},
        itemStepThree:{},
        stepTwoList:[],
        stepThreeList:[],
        visibleStep:false,
        title: '一级目录',
        loadingStep3: false,
        loadingStep2: false,
        footer:(
          <span>
            <Button hidden={this.props.onlyCurrent} onClick={()=>{this.setStep(2)}}>下一步</Button>
            <Button type='primary' onClick={()=>{this.handleCancelStep(1)}}>完成</Button></span>
        )
      }
    )
  }
  async setDefault(pid,level,data){
    if(level==1){
      this.setState({
        step:0,
      });
      return 
    }
    let subCateRes = await axios.get(`v1/checkdir/getdircate?level=${data.parent_info[0].level}`)
    if(level==2){
      this.setState({
        step:1,
        itemStepOne: data.parent_info[0],
        stepOneList: subCateRes.data.data,
      });
    }
    if(level==3){
      this.setState({
        step:2,
        itemStepOne: data.parent_info[1],
        itemStepTwo: data.parent_info[0],
        stepTwoList: subCateRes.data.data,
      });
    }
    if(level==4){
      this.setState({
        step:3,
        itemStepOne: data.parent_info[2],
        itemStepTwo: data.parent_info[1],
        itemStepThree: data.parent_info[0],
        stepThreeList: subCateRes.data.data,
      });
    }
  }
  async onChangeStepOne(e){
    this.setState({
      itemStepOne: e.target.value,
      itemStepTwo: {},
      itemStepThree: {},
      loadingStep2:true
    });
    this.props.GetParentDirValue(e.target.value.checkdir_id)
    const URL = `v1/checkdir/getSubCate?pid=${e.target.value.checkdir_id}`
    let res = await axios.get(URL)
    this.setState({
      stepTwoList: res.data.data,
      loadingStep2:false
    });
  }
  async onChangeStepTwo(e){
    this.setState({
      itemStepTwo: e.target.value,
      itemStepThree: {},
      loadingStep3:true
    });
    this.props.GetParentDirValue(e.target.value.checkdir_id)
    const URL = `v1/checkdir/getSubCate?pid=${e.target.value.checkdir_id}`
    let res = await axios.get(URL)
    this.setState({
      stepThreeList: res.data.data,
      loadingStep3:false
    });
  }
  onChangeStepThree(e){
    this.setState({
      itemStepThree: e.target.value,
    });
    this.props.GetParentDirValue(e.target.value.checkdir_id)
  }
  handleItemClick(step){
    if(this.props.onlyCurrent&&(this.state.step!=step)){
      return
    }
    this.setStep(step)
    this.setState({
      visibleStep: true,
    });
  }
  setStep(step){
    if(step === 1){
      this.setState({
        step: 1,
        title: '一级目录',
        footer:(
          <span>
            <Button hidden={this.props.onlyCurrent} onClick={()=>{this.setStep(2)}}>下一步</Button>
            <Button type='primary' onClick={()=>{this.handleCancelStep(1)}}>完成</Button></span>
        )
      });
    }
    if(step === 2){
      if(Object.keys(this.state.itemStepOne).length===0){
        return message.warning('请先选择一级目录!')
      }
      this.setState({
        step: 2,
        title: '二级目录',
        footer:(
          <span>
            <Button hidden={this.props.onlyCurrent} onClick={()=>{this.setStep(1)}}>上一步</Button>
            <Button hidden={this.props.onlyCurrent} onClick={()=>{this.setStep(3)}}>下一步</Button>
            <Button type='primary' onClick={()=>{this.handleCancelStep(2)}}>完成</Button></span>
        )
      });
    }
    if(step === 3){
      if(Object.keys(this.state.itemStepTwo).length===0){
        return message.warning('请先选择二级目录!')
      }
      this.setState({
        step: 3,
        title: '三级目录',
        footer:(
          <span>
            <Button onClick={()=>{this.setStep(2)}}>上一步</Button>
            <Button type='primary' onClick={this.handleCancelStep}>完成</Button></span>
        )
      });
    }
  }
  handleCancelStep(step){
    if(step===1){
      this.setState({
        itemStepTwo: {},
        itemStepThree: {},
      });
      this.props.GetParentDirValue(this.state.itemStepOne.checkdir_id)
    }
    if(step===2){
      this.setState({
        itemStepThree: {},
      });
      this.props.GetParentDirValue(this.state.itemStepTwo.checkdir_id||this.state.itemStepOne.checkdir_id)
    }
    this.setState({
      visibleStep: false,
    });
  }
  handleInputClick(){
    if(this.state.step===0)return
    this.setState({
      visibleStep: true,
    });
  }
}
 
export default ParentDir;