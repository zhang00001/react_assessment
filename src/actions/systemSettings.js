import { createAction } from 'redux-actions'
import axios from 'axios'
//用户表单搜索
export const changeKeyword = createAction('CHANGE_KEY_WORDS')
export const changeOrgid = createAction('CHANGE_ORG_ID')
export const initOrgList = createAction('INIT_ORG_LIST')
export const initUserTable =createAction('INIT_TABLE_LIST')
export const changePage =createAction('CHANGE_PAGE')


const dircateURL = `v1/users/index`
export const getUserTableList = (params) => async dispatch => {
    console.log(params)
    dispatch(initUserTable({
        loading: true
    }))
  let res1 = await axios.post(`${dircateURL}`,{
      ...params,
      limit:10
  })
  dispatch(initUserTable({
        usertable: res1.data.data,
  }))
}
export const updateTable =createAction('UPDATE_TABLE')
export const openModal = createAction('OPEN_MODAL')
export const closeModal =createAction('CLOSE_MODAL')
export const getOriginInfo =createAction('GET_ORIGIN_INFO')


export const getZzlist = (params) => async dispatch => {
    console.log(params)
  let res= await axios.get(`v1/Organization/getOrgTree`)
  dispatch(initOrgList({
    org_ist: res.data.data,
  }))
}

export const getRoleList = (params) => async dispatch => {
  console.log(params)
  let res= await axios.get(`v1/role/roleList`)
  dispatch(initRoleList({
        roleList: res.data.data,
    }))
}
export const initRoleList =createAction('INIT_ROLE_LIST')
//获取组织列表table
export const getOrigintable = (params) => async dispatch => {
    dispatch(initOriginTable({
      loading:true
  }))
  let res =await axios.get(`v1/Organization/index`)
      dispatch(initOriginTable({
          originTable: res.data.data,
          total:res.data.count
      }))
}
export const initOriginTable =createAction('INIT_ORIGIN_TABLE');

//更新组织列表table
export const updateOriginTable =createAction('UPDATE_ORIGIN_TABLE');

export const getNews  =(params) => async dispatch => {
  let res =await axios.post(`v1/message/index`,{
    ...params
  })
  dispatch(getNewsTable({
      newsList:res.data.data,
      total:res.data.count
  }))
}
export const getNewsTable =createAction('INIT_NEWS_TABLE')
export const updateNews =createAction('UPDATE_NEWS_TABLE')

//消息
// 获取消息类型
export const getNewsCategory =createAction('INIT_NEWS_CATEGORY');
export const getNewsCate  =(params) => async dispatch => {
  console.log(params);
  let res =await axios.get(`v1/message/getMsgType`,{
    params:{
      ...params
    }
  })
  dispatch(getNewsCategory({
    newscategory:res.data.data,
  }))
}
export const changeNewsType=createAction('INIT_CHANGE_NEWS_TYPE');
export const changeNewsDate=createAction('INIT_CHANGE_DATE');
export const changeNewsUnread=createAction('INIT_CHANGE_UNREAD');


export const changeUser =createAction('UPDATE_USER')

// 获取首页数据
export const getIndexData =createAction('INIT_INDEX_DATA');
export const indexDatInit =(params) =>async dispatch => {
    let res  = await axios.get('v1/users/indexData')
    console.log(res.data.data)
    dispatch(getIndexData({
        fast_entry:res.data.data.fast_entry,
        message:res.data.data.message
    }))
}
//获取首页企业自评进度数据
export const getIndexChart =createAction('INIT_ECHART_LEFT')
export const echartInit = (params) =>async dispatch =>{
  let res  = await axios.get('v1/users/selfOrgData')
    console.log(res.data.data)
    dispatch(getIndexChart({
        obj:res.data.data
    }))
}
export const getUnreadNews =createAction('INIT_UNREAD')
export const initUnread= (params) =>async dispatch =>{
  let res  = await axios.get('v1/message/unread')
    console.log(res.data.data)
    dispatch(getUnreadNews({
        obj:res.data.data.count
    }))
}

export const initChildOrg =createAction('INIT_CHILD_ORG')
export const getChildOrig =(params) =>async dispatch =>{
    dispatch(initOriginTable({
      loading:true
  }))
  let res =await axios.get('v1/Organization/index',{
    params:{
      ...params
    }
  })
  dispatch(initOriginTable({
    originTable: res.data.data,
    total:res.data.count
}))
  console.log(res.data.data)
}

// 获取一级指标
export const getFirst_category=createAction('GET_FIRST_CATEGORY');
export const getSecond_category =createAction('GET_SECOND_CATEGORY');
export const initFirst_category =(params) =>async dispatch =>{
  console.log(params)
  await axios.get('v1/checkdir/getdirtree').then((res)=>{
        console.log(res.data.data)
        dispatch(getFirst_category({
          firstList:res.data.data
      }));
      // axios.get('v1/checkdir/getSubCate',{
      //     params:{
      //       ...params||{
      //         pid:res.data.data[0].checkdir_id
      //       }
      //     }
      //   }).then((res2)=>{
      //     console.log(res2)
      //       dispatch(getSecond_category({
      //         secondList:res2.data.data
      //       }))
      //   })
  })
}
export const initSecond_category =(params) =>async dispatch =>{
  console.log(params)
  let res =await axios.get('v1/checkdir/getSubCate',{
    params:{
      ...params
    }
  })
  console.log(res.data.data)
  dispatch(getSecond_category({
    secondList:res.data.data
  }))
}