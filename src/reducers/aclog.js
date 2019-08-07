import { handleActions } from 'redux-actions'

// 表格
export const tableData = handleActions({
  INIT_TABLE_DATA: (state, action) => {
    console.log(action.payload)
    return {
      list: action.payload.list||[],
      loading: action.payload.loading||false,
      pagination: action.payload.pagination||{},
      selectedRowKeys: action.payload.selectedRowKeys||[],
    }
  },
  CHECKBOX_CHANGE: (state, action) => {
    let newState = JSON.parse(JSON.stringify(state))
    newState.selectedRowKeys = action.payload
    return newState
  },
  EDIT_STATE_CHANGE: (state, action) => {
    let newState = JSON.parse(JSON.stringify(state))
    newState['list'][action.payload].edit = true
    return newState
  },
  DELETE_STATE_CHANGE: (state, action) => {
    let newState = JSON.parse(JSON.stringify(state))
    newState['list'][action.payload].edit = true
    newState['list'].splice(action.payload,1)
    return newState
  },
  SAVE_STATE_CHANGE: (state, action) => {
    let newState = JSON.parse(JSON.stringify(state))
    newState['list'][action.payload.index].edit = false
    if(newState['list'][action.payload.index].unSave) newState['list'][action.payload.index].unSave = false
    newState['list'][action.payload.index].hand_id = action.payload.id
    return newState
  },
  CANEL_STATE_CHANGE: (state, action) => {
    let newState = JSON.parse(JSON.stringify(state))
    
    newState['list'][action.payload].edit = false
    
    if(newState['list'][action.payload].unSave){
      newState['list'].splice(action.payload,1)
    }
    return newState
  },
  ADD_TABLE_ROW: (state, action) => {
    let newState = JSON.parse(JSON.stringify(state))
    newState['list'].push({})
    newState['list'][newState['list'].length-1].edit = true
    newState['list'][newState['list'].length-1].unSave = true
    return newState
  }
}, {
	list: [],
  loading: false,
  selectedRowKeys: '',
  pagination: {
    count: 0,
    limit: 0,
    page: 0,
    pages: 0,
    total: 0,
  }
})

// 批量上传表单
export const bulkUploadData = handleActions({
  CHANGE_MODAL_VISIBLE: (state, action) => {
    return {
      visible: action.payload.visible
    }
  }
},{
  visible: false
})

// 目录搜索表单
export const catalogSearchForm = handleActions({
  CHANGE_KEY_WORDS: (state, action) => {
    let newState = JSON.parse(JSON.stringify(state))
    newState.keywords = action.payload
    return newState
  },
  CHANGE_FIRST_ID: (state, action) => {
    console.log(action.payload)
    let newState = JSON.parse(JSON.stringify(state))
    newState.first_target_id = action.payload
    return newState
  },
  CHANGE_SECOND_ID: (state, action) => {
    let newState = JSON.parse(JSON.stringify(state))
    newState.second_target_id = action.payload
    return newState
  }
},{
  keywords: '',
  first_target_id: undefined,
  second_target_id: undefined
})

// 指标列表
export const dircateList = handleActions({
  INIT_DIRCATE_LIST: (state, action) => {
    return {
      first_list: action.payload.first_list||state.first_list,
      second_list: action.payload.second_list||state.second_list
    }
  }
},{
  first_list:[],
  second_list:[]
})

// 弹窗
export const alertInfo = handleActions({
  ALERT_OPEN:(state, action) => {
    return {
      title: action.payload.title,
      des: action.payload.des,
      visible: true,
      handleOk: action.payload.handleOk,
      okText: action.payload.okText
    }
  },
  ALERT_CLOSE:(state, action) => {
    let newState = JSON.parse(JSON.stringify(state))
    newState.visible = false
    return newState
  }
},{
  title: '',
  des: '',
  visible: false,
  handleOk: null,
  okText: '确定'
})
