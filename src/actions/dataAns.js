import { createAction } from 'redux-actions'
import axios from 'axios'
import { message } from 'antd'
import DataSet from "@antv/data-set";

export const handleChangeRankYear = createAction('CHANGE_RANK_YEAR')

const initPartyBuildTableData = createAction('INIT_PBTABLE_DATA')
export const partyBuildTableDataHttp = (params) => async dispatch => {
  dispatch(initPartyBuildTableData({
    loading: true
  }))
  params.limit = 9999
  const url = `v1/DataAnalysis/djkh_ranking_list`
  let res = await axios.get(url,{params:params})
  dispatch(initPartyBuildTableData({
    loading: false,
  }))
  if(res.data.code===0){
    dispatch(initPartyBuildTableData({
      list: res.data.data
    }))
  }else{
    message.error(res.data.msg)
  }
}
const initPartyBuildChart = createAction('INIT_PB_CHART')
export const partyBuildChartHttp = (params) => async dispatch => {
  const url = `v1/DataAnalysis/pie_chart_ranking_list`
  let res = await axios.get(url,{params:params})
  if(res.data.code===0){
    dispatch(initPartyBuildChart(res.data.data))
  }else{
    message.error(res.data.msg)
  }
}

const initSenceTableData = createAction('INIT_SENTABLE_DATA')
export const senceTableDataHttp = (params) => async dispatch => {
  dispatch(initSenceTableData({
    loading: true
  }))
  const url = `v1/DataAnalysis/xckh_ranking_list`
  let res = await axios.get(url,{params:params})
  dispatch(initSenceTableData({
    loading: false,
  }))
  if(res.data.code===0){
    dispatch(initSenceTableData({
      list: res.data.data
    }))
  }else{
    message.error(res.data.msg)
  }
}

const initDailyTableData = createAction('INIT_DAITABLE_DATA')
export const dailyTableDataHttp = (params) => async dispatch => {
  dispatch(initDailyTableData({
    loading: true
  }))
  const url = `v1/DataAnalysis/rcls_ranking_list`
  let res = await axios.get(url,{params:params})
  dispatch(initDailyTableData({
    loading: false,
  }))
  if(res.data.code===0){
    dispatch(initDailyTableData({
      list: res.data.data
    }))
  }else{
    message.error(res.data.msg)
  }
}

const initInitialTableData = createAction('INIT_INITABLE_DATA')
export const initialTableDataHttp = (params) => async dispatch => {
  dispatch(initInitialTableData({
    loading: true
  }))
  const url = `v1/DataAnalysis/cpfz_ranking_list`
  let res = await axios.get(url,{params:params})
  dispatch(initInitialTableData({
    loading: false,
  }))
  if(res.data.code===0){
    res.data.data.forEach(element => {
      element.multiple_score = Number(element.multiple_score)
    });
    dispatch(initInitialTableData({
      list: res.data.data
    }))
  }else{
    message.error(res.data.msg)
  }
}

const initAddTableData = createAction('INIT_ADDTABLE_DATA')
export const addTableDataHttp = (params) => async dispatch => {
  dispatch(initAddTableData({
    loading: true
  }))
  params.limit = 9999
  const url = `v1/DataAnalysis/jiafen_ranking_list`
  let res = await axios.get(url,{params:params})
  dispatch(initAddTableData({
    loading: false,
  }))
  if(res.data.code===0){
    res.data.data.forEach(element => {
      element.add_score = Number(element.add_score)
    });
    dispatch(initAddTableData({
      list: res.data.data
    }))
  }else{
    message.error(res.data.msg)
  }
}

const initSubTableData = createAction('INIT_SUBTABLE_DATA')
export const subTableDataHttp = (params) => async dispatch => {
  dispatch(initSubTableData({
    loading: true
  }))
  params.limit = 9999
  const url = `v1/DataAnalysis/jianfen_ranking_list`
  let res = await axios.get(url,{params:params})
  dispatch(initSubTableData({
    loading: false,
  }))
  if(res.data.code===0){
    res.data.data.forEach(element => {
      element.sub_score = Number(element.sub_score)
    });
    dispatch(initSubTableData({
      list: res.data.data
    }))
  }else{
    message.error(res.data.msg)
  }
}

const initDownTableData = createAction('INIT_DOWNTABLE_DATA')
export const downTableDataHttp = (params) => async dispatch => {
  dispatch(initDownTableData({
    loading: true
  }))
  params.limit = 9999
  const url = `v1/DataAnalysis/jiangdang_ranking_list`
  let res = await axios.get(url,{params:params})
  dispatch(initDownTableData({
    loading: false,
  }))
  if(res.data.code===0){
    let chuping_result = {
      name: '初评'
    };
    let down_result = {
      name: '降档'
    };
    var fields = [];
    let forData = (value)=>{
      if(value=='较差'){
        return 1
      }
      if(value=='一般'){
        return 2
      }
      if(value=='良好'){
        return 3
      }
      if(value=='优秀'){
        return 4
      }
    }
    (res.data.data).forEach(element => {
      fields.push(element.org_name)
      chuping_result[element.org_name] = forData(element.chuping_result)
      down_result[element.org_name] = forData(element.down_result)
    });
    const data = [chuping_result,down_result]
    const ds = new DataSet();
    const dv = ds.createView().source(data)
    .transform({
      type: 'fold',
      fields: fields, // 展开字段集
      key: '支部',                   // key字段
      value: '结果',               // value字段
    })
    dispatch(initDownTableData({
      list: res.data.data,
      chartData: dv
    }))
  }else{
    message.error(res.data.msg)
  }
}

const initLastTableData = createAction('INIT_LASTABLE_DATA')
export const lastTableDataHttp = (params) => async dispatch => {
  dispatch(initLastTableData({
    loading: true
  }))
  const url = `v1/DataAnalysis/top10_worst_ranking_list`
  let res = await axios.get(url,{params:params})
  dispatch(initLastTableData({
    loading: false,
  }))
  if(res.data.code===0){
    let standard_score = {
      name: '标准分值'
    };
    let pingjunkaohefenzhi = {
      name: '考核分值'
    };
    var fields = [];
    (res.data.data).forEach(element => {
      fields.push(`考核点${element.sort_order}`)
      standard_score[`考核点${element.sort_order}`] = Number(element.standard_score)
      pingjunkaohefenzhi[`考核点${element.sort_order}`] = element.pingjunkaohefenzhi
    });
    const data = [standard_score,pingjunkaohefenzhi]
    const ds = new DataSet();
    const dv = ds.createView().source(data)
    .transform({
      type: 'fold',
      fields: fields, // 展开字段集
      key: '考核点',                   // key字段
      value: '分数',               // value字段
    })
    dispatch(initLastTableData({
      list: res.data.data,
      chartData: dv
    }))
  }else{
    message.error(res.data.msg)
  }
}

const initBestTableData = createAction('INIT_BESTABLE_DATA')
export const bestTableDataHttp = (params) => async dispatch => {
  dispatch(initBestTableData({
    loading: true
  }))
  const url = `v1/DataAnalysis/top10_optimal_ranking_list`
  let res = await axios.get(url,{params:params})
  dispatch(initBestTableData({
    loading: false,
  }))
  if(res.data.code===0){
    let standard_score = {
      name: '标准分值'
    };
    let pingjunkaohefenzhi = {
      name: '考核分值'
    };
    var fields = [];
    (res.data.data).forEach(element => {
      fields.push(`考核点${element.sort_order}`)
      standard_score[`考核点${element.sort_order}`] = Number(element.standard_score)
      pingjunkaohefenzhi[`考核点${element.sort_order}`] = element.pingjunkaohefenzhi
    });
    const data = [standard_score,pingjunkaohefenzhi]
    const ds = new DataSet();
    const dv = ds.createView().source(data)
    .transform({
      type: 'fold',
      fields: fields, // 展开字段集
      key: '考核点',                   // key字段
      value: '分数',               // value字段
    })
    dispatch(initBestTableData({
      list: res.data.data,
      chartData: dv
    }))
  }else{
    message.error(res.data.msg)
  }
}
const initPersonalTableData = createAction('INIT_PERTABLE_DATA')
const initPersonalChartData = createAction('INIT_PERCHART_DATA')
export const personalTableDataHttp = (params) => async dispatch => {
  dispatch(initPersonalTableData({
    loading: true
  }))
  params.limit = 9999
  const url = `v1/DataAnalysis/personal_ranking_list`
  let res = await axios.get(url,{params:params})
  dispatch(initPersonalTableData({
    loading: false,
  }))
  if(res.data.code===0){
    res.data.data.forEach(element => {
      element.complete_num = Number(element.complete_num)
    });
    let total = {
      name: '考核点'
    };
    let complete = {
      name: '已完成'
    };
    var fields = [];
    (res.data.data).forEach(element => {
      fields.push(`${element.name}(${element.org_name})`)
      total[`${element.name}(${element.org_name})`] = element.total
      complete[`${element.name}(${element.org_name})`] = element.complete_num
    });
    const data = [total,complete]
    const ds = new DataSet();
    const dv = ds.createView().source(data)
    .transform({
      type: 'fold',
      fields: fields, // 展开字段集
      key: '支部',                   // key字段
      value: '结果',               // value字段
    })
    dispatch(initPersonalTableData({
      list: res.data.data,
      chartData: dv
    }))
  }else{
    message.error(res.data.msg)
  }
}

const iniOrganizationTableData = createAction('INIT_ORGTABLE_DATA')
export const organizationTableDataHttp = (params) => async dispatch => {
  dispatch(iniOrganizationTableData({
    loading: true
  }))
  params.limit = 9999
  const url = `v1/DataAnalysis/organization_ranking_list`
  let res = await axios.get(url,{params:params})
  dispatch(iniOrganizationTableData({
    loading: false,
  }))
  if(res.data.code===0){
    res.data.data.forEach(element => {
      element.complete_num = Number(element.complete_num)
    });
    let total = {
      name: '考核点'
    };
    let complete = {
      name: '已完成'
    };
    var fields = [];
    (res.data.data).forEach(element => {
      fields.push(element.org_name)
      total[element.org_name] = element.total
      complete[element.org_name] = element.complete_num
    });
    const data = [total,complete]
    const ds = new DataSet();
    const dv = ds.createView().source(data)
    .transform({
      type: 'fold',
      fields: fields, // 展开字段集
      key: '支部',                   // key字段
      value: '结果',               // value字段
    })
    dispatch(iniOrganizationTableData({
      list: res.data.data,
      chartData: dv
    }))
  }else{
    message.error(res.data.msg)
  }
}

const initOrganizationList = createAction('INIT_ORGANIZATION_LIST')
export const organizationListHttp = () => async dispatch => {
  const url = `v1/Organization/getOrgTree`
  let res = await axios.get(url)
  if(res.data.code===200){
    dispatch(initOrganizationList(res.data.data))
  }else{
    message.error(res.data.msg)
  }
}
