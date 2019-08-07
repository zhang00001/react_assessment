import { handleActions } from 'redux-actions'
//综合查询 企业自评报告
export const initSelfSearch = handleActions({
    CHANGE_YEAR: (state, action) => {
        let newState = JSON.parse(JSON.stringify(state))
        console.log(state)
        newState.report_year = action.payload
        return newState
    },
    CHECK_YEAR: (state, action) => {
      let newState = JSON.parse(JSON.stringify(state))
      console.log(state)
      newState.check_year = action.payload
      return newState
  },
    CHANGE_ORG_ID:(state, action) => {
        let newState = JSON.parse(JSON.stringify(state))
        newState.org_id = action.payload
        return newState
    },
    CHANGE_PAGE:(state, action) => {
        let newState = JSON.parse(JSON.stringify(state))
        newState.page = action.payload
        return newState
    },
  },{
    report_year: undefined,
    org_id:undefined,
    page:1
  })
  export const selfCompanyTable =handleActions({
    INIT_SELE_COMPANY:(state,action)=>{
        console.log(state)
        console.log(action.payload)
        return {
            list: action.payload.list||[],
            loading: action.payload.loading||false,
            total: action.payload.total||{},
          }
    }
  },{
    list: [],
    loading: false,
    
  });
  // 目录搜索表单
export const catalogSearchForms = handleActions({
  CHANGE_KEY_WORDS: (state, action) => {
    let newState = JSON.parse(JSON.stringify(state))
    newState.keywords = action.payload
    return newState
  },
  CHANGE_KEY_YEAR: (state, action) => {
    let newState = JSON.parse(JSON.stringify(state));
    console.log(action)
    newState.dir_year = action.payload;
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
    newState.second_target_id = action.payload;
    console.log(action)
    return newState
  },
  UPDATE_CATELOG:(state,action) =>{
    let newState = JSON.parse(JSON.stringify(state));
    newState.second_target_id = undefined;
    newState.first_target_id = undefined;
    newState.dir_year = undefined;
    return newState
  },
  EMPTY_SECOND:(state,action) =>{
    let newState = JSON.parse(JSON.stringify(state));
    newState.second_target_id = undefined;
    return newState
  }
},{
  keywords: '',
  first_target_id: undefined,
  second_target_id: undefined,
  dir_year:undefined
})
//考核记录查询  
export const RecordTable = handleActions({
  INIT_CATELOG_RECORD:(state,action) =>{
      console.log(action.payload)
      return {
        list: action.payload.list||[],
        loading: action.payload.loading||false,
        // total: action.payload.total||{},
        pagination: action.payload.pagination||{}
      }
  }
},{
  list: [],
  loading: false,
  pagination:{}
});

export const RecordTableOther =handleActions({
  INIT_RECORD_OTHER:(state,action) =>{
    console.log(action)
    
    return {
        list: action.payload.list||{},
        loading: action.payload.loading||false,
    }
  }
},{
  list: {},
  loading: false,
});
// 下载自评报告数据
export const downloadData =handleActions({
  DOWN_LOAD_REPORT:(state,action) =>{
    return {
      detailData:action.payload
    }
  }
},{
  detailData:{}
})
export const navTable =handleActions({
  GET_SEARCH_NAV:(state,action) =>{
    return action.payload
  }
},{
      nav:[]
})