import { createAction } from 'redux-actions'
import axios from 'axios'

// 企业报告查询表格查询
export const  intSelfCompany   =createAction('INIT_SELE_COMPANY')
export const handleSelectYear  =createAction('CHANGE_YEAR');
export const changeSelfCompany =createAction('CHANGE_ORG_ID');
export const changeSelfPage    =createAction('CHANGE_PAGE');
export const changeCheckYear   =createAction('CHECK_YEAR');
export const getSelfCompany = (params) => async dispatch => {
    console.log(params)
    dispatch(intSelfCompany({
        loading: true
    }))
  let res= await axios.get(`v1/searchpoint/checkReport`,{
      params:{
        limit:10,
          ...params
      }
  })
  console.log(res.data.data)
  dispatch(intSelfCompany({
        list: res.data.data,
        total:res.data.pagination.count,
  }))
}


// 考核目录查询

const initTableData = createAction('INIT_TABLE_DATA')
// 考核目录表格
const cataURL = `v1/checkdir/index`
export const cataTableSearch = (page=1,{keywords='',first_target_id='',second_target_id='',dir_year=""}={}) => async dispatch => {
  dispatch(initTableData({
    loading: true
  }))
  let res = await axios.get(`${cataURL}?page=${page}&limit=10&keywords=${keywords}&first_target_id=${first_target_id}&second_target_id=${second_target_id}&dir_year=${dir_year}`)
  dispatch(initTableData({
    list: res.data.data,
    loading: false,
    pagination: res.data.pagination,
    selectedRows:[]
  }))
};
export const changeCatelogYear =createAction('CHANGE_KEY_YEAR')
export const changefirstId =createAction('CHANGE_FIRST_ID');
export const changesecond =createAction('CHANGE_SECOND_ID');
export const emptySecond =createAction('EMPTY_SECOND');


//考核目录表格加减分搜索
export const handSearchInit = (hand_type,params) => async dispatch => {
    dispatch(initTableData({
      loading: true
    }))
    console.log(params);
    let res = await axios.get(`v1/handscore/index`,{
        params:{
            hand_type,
            ...params
        }
    });
    console.log(res)
    dispatch(initTableData({
      list: res.data.data,
      loading: false,
      pagination: res.data.pagination,
      selectedRows:[]
    }))
  };
  // 考核目录切换时候  清除掉筛选条件的值
  export const upDateCatlog =createAction('UPDATE_CATELOG');


  //考核记录目录查询
export const  catelogRecord =createAction('INIT_CATELOG_RECORD')
export const handleRecordYear =createAction('CHANGE_YEAR');
export const changeRecordCompany =createAction('CHANGE_ORG_ID');
export const changeRecordPage =   createAction('CHANGE_PAGE');
export const getcatelogRecord = (params) => async dispatch => {
    console.log(params)
    dispatch(catelogRecord({
        loading: true
    }))
  let res= await axios.get(`v1/searchpoint/CheckDir`,{
      params:{
        limit:10,
          ...params
      }
  })
  for(var i in res.data.data){
      res.data.data[i].id=i
  }
  console.log(res.data.data)
  dispatch(catelogRecord({
        list: res.data.data,
        pagination:res.data.pagination

  }))
}
//考核记录加减降档项查询
export const initRecordOther =createAction('INIT_RECORD_OTHER')
export const handRecordInit = (hand_type,params) => async dispatch => {
  dispatch(initRecordOther({
    loading: true
  }))
  console.log(params);
  let res = await axios.get(`v1/searchpoint/CheckHand`,{
      params:{
          hand_type,
          ...params
      }
  });
  console.log(res.data.data)
  dispatch(initRecordOther({
    list: res.data.data,
    loading: false,
  }))
};


// 企业自评报告下载
export const downLoadReport =createAction('DOWN_LOAD_REPORT')
export const initDownLoad = (params) => async dispatch => {
    console.log(window.location.host);
    window.open(`${window.location.host}/dv/v1/searchpoint/outPutWord?id=4`)
    console.log(window.location.href)
  // dispatch(downLoadReport({
  //   loading: true
  // }))
  // console.log(params);
  // let res = await axios.get(`v1/searchpoint/outPutWord`,{
  //     params:{
  //         ...params
  //     }
  // });
  // console.log(res)
  // dispatch(downLoadReport({
  //   list: res.data.data,
  //   loading: false,
  //   pagination: res.data.pagination,
  // }))
};
//综合查询菜单

export const InitInterNav =createAction('GET_SEARCH_NAV');
export const getInterNav =(params) =>async dispatch =>{
  let res  =await axios.get(`v1/users/getNav`,{
        params:{
          ...params
        }
    });
    dispatch(InitInterNav({
        nav:res.data.data
    }))
    // window.HISTORY.push(res.data.data[0].path)
    // console.log(this.props)
}