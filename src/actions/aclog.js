import { createAction } from 'redux-actions'
import axios from 'axios'
import { message } from 'antd'



/**
 * 表格数据
 */
const initTableData = createAction('INIT_TABLE_DATA')
// 考核目录表格
const cataURL = `v1/checkdir/index`
export const cataTableInt = (page=1,{keywords='',first_target_id='',second_target_id=''}={}) => async dispatch => {
  dispatch(initTableData({
    loading: true
  }))
  let res = await axios.get(`${cataURL}?page=${page}&limit=10&keywords=${keywords}&first_target_id=${first_target_id}&second_target_id=${second_target_id}`)
  dispatch(initTableData({
    list: res.data.data,
    loading: false,
    pagination: res.data.pagination,
    selectedRows:[]
  }))
}

export const checkboxChange = createAction('CHECKBOX_CHANGE')

// 加减降档项列表
const handscoreURL = `v1/handscore/index`
export const handscoreInit = (hand_type,page=1) => async dispatch => {
  dispatch(initTableData({
    loading: true
  }))
  let res = await axios.get(`${handscoreURL}?page=${page}&limit=10&hand_type=${hand_type}`)
  dispatch(initTableData({
    list: res.data.data,
    loading: false,
    pagination: res.data.pagination,
    selectedRows:[]
  }))
}

// 表格修改按钮
export const handleEditBtnClick = createAction('EDIT_STATE_CHANGE')
// 表格删除按钮
const saveDelete = createAction('DELETE_STATE_CHANGE')
export const handleDeleteBtnClick = (data) => async dispatch => {
  let res = await axios.delete(`v1/handscore/${data.id}`)
  if(res.data.code===0) message.success(res.data.msg)
  else message.error(res.data.msg)
  dispatch(saveDelete(data.index))
  dispatch(handscoreInit(data.type))
  dispatch(alertClose())
}
export const handleDeleteBatch = (list, selectedRowKeys, type) => async dispatch => {
  console.log(selectedRowKeys,444444444)
  let ids = ''
  selectedRowKeys.forEach(index => {
    ids += list[index].hand_id + ','
  });
  let res = await axios.delete(`v1/handscore/${ids}`)
  if(res.data.code===0) message.success(res.data.msg)
  else message.error(res.data.msg)
  dispatch(handscoreInit(type))
  dispatch(alertClose())
}
// 表格保存 取消
const saveEdit = createAction('SAVE_STATE_CHANGE')

// 新增修改加减降档项
const scoreSaveURL = `v1/handscore/save`
const scoreEditURL = `v1/handscore`
export const handleSaveEditBtnClick = (type, data) => async dispatch => {
  if(!data.record.first_target){
    message.warning('一级指标不能为空!');
    return
  }
  if(!data.record.second_target){
    message.warning('二级指标不能为空!');
    return
  }
  if(!data.record.condition){
    message.warning('应满足条件不能为空!');
    return
  }
  if(type!=3&&!data.record.score){
    message.warning('分值不能为空!');
    return
  }
  data.record.hand_type = type
  let res = null
  if(data.record.hand_id){
    res = await axios.put(`${scoreEditURL}/${data.record.hand_id}`,data.record)
    if(res.data.code===0) message.success(res.data.msg)
    else message.error(res.data.msg)
  }else{
    res = await axios.post(scoreSaveURL,data.record)
    if(res.data.code===0) message.success(res.data.msg)
    else message.error(res.data.msg)
  }
  dispatch(saveEdit({index:data.index,id:res.data.data.new_id}))
}
export const handleCanelEditBtnClick = createAction('CANEL_STATE_CHANGE')


// 批量上传Modal 显示控制
export const handleChangeBulkUploadVisible = createAction('CHANGE_MODAL_VISIBLE')


// 考核目录搜索条件
export const handleChangeKeywords = createAction('CHANGE_KEY_WORDS')
export const handleChangeFirstId = createAction('CHANGE_FIRST_ID')
export const handleChangeSecondId = createAction('CHANGE_SECOND_ID')

// 获取指标list
const initDircateList = createAction('INIT_DIRCATE_LIST')
const dircateURL = `v1/checkdir/getdircate`
export const getDircateList = () => async dispatch => {
  let res = await axios.get(`${dircateURL}?level=1`)
  dispatch(initDircateList({
    first_list: res.data.data,
    second_list: []
  }))
}
export const getDircateSecondList = (id) => async dispatch => {
  let res = await axios.get(`v1/checkdir/getSubCate?pid=${id}`)
  dispatch(initDircateList({
    second_list: res.data.data
  }))
}


// 弹出alert
export const alertOpen = createAction('ALERT_OPEN')
// 关闭alert
export const alertClose = createAction('ALERT_CLOSE')

// 删除目录
const deleteCataURL = `v1/checkdir/delete`
export const deleteCataItem = (data,page) => async dispatch => {
  let res = await axios.post(deleteCataURL, data)
  if(res.data.code===0) message.success(res.data.msg)
  else message.error(res.data.msg)
  dispatch(alertClose())
  dispatch(cataTableInt(page))
}

export const addTableRow = createAction('ADD_TABLE_ROW')