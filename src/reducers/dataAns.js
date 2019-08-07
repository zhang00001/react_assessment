import { handleActions } from 'redux-actions'

export const rankYear = handleActions({
  CHANGE_RANK_YEAR:(state, action) => {
    console.log(action.payload)
    return action.payload
  }
},'')

export const PartyBuildTableData = handleActions({
  INIT_PBTABLE_DATA: (state, action) => {
    return action.payload
  }
},{
  loading: false,
  list: []
})

export const PartyBuildChart = handleActions({
  INIT_PB_CHART: (state, action) => {
    return action.payload
  }
},[])

export const SenceTableData = handleActions({
  INIT_SENTABLE_DATA: (state, action) => {
    return action.payload
  }
},{
  loading: false,
  list: []
})

export const DailyTableData = handleActions({
  INIT_DAITABLE_DATA: (state, action) => {
    return action.payload
  }
},{
  loading: false,
  list: []
})

export const InitialTableData = handleActions({
  INIT_INITABLE_DATA: (state, action) => {
    return action.payload
  }
},{
  loading: false,
  list: []
})

export const AddTableData = handleActions({
  INIT_ADDTABLE_DATA: (state, action) => {
    return action.payload
  }
},{
  loading: false,
  list: []
})

export const SubTableData = handleActions({
  INIT_SUBTABLE_DATA: (state, action) => {
    return action.payload
  }
},{
  loading: false,
  list: []
})

export const DownTableData = handleActions({
  INIT_DOWNTABLE_DATA: (state, action) => {
    return action.payload
  }
},{
  loading: false,
  list: [],
  chartData:[]
})

export const LastTableData = handleActions({
  INIT_LASTABLE_DATA: (state, action) => {
    return action.payload
  }
},{
  loading: false,
  list: [],
  chartData:[]
})

export const BestTableData = handleActions({
  INIT_BESTABLE_DATA: (state, action) => {
    return action.payload
  }
},{
  loading: false,
  list: [],
  chartData:[]
})

export const PersonalTableData = handleActions({
  INIT_PERTABLE_DATA: (state, action) => {
    return action.payload
  },
  INIT_PERCHART_DATA: (state, action) => {
    return action.payload
  },
},{
  loading: false,
  list: [],
  chartData:[]
})

export const OrganizationTableData = handleActions({
  INIT_ORGTABLE_DATA: (state, action) => {
    return action.payload
  }
},{
  loading: false,
  list: [],
  chartData:[]
})

export const OrganizationList = handleActions({
  INIT_ORGANIZATION_LIST: (state, action) => {
    console.log(action.payload,9999)
    return action.payload
  }
},[
  {
    title: 'Node1',
    value: '0-0',
    key: '0-0',
    children: [
      {
        title: 'Child Node1',
        value: '0-0-1',
        key: '0-0-1',
      },
      {
        title: 'Child Node2',
        value: '0-0-2',
        key: '0-0-2',
      },
    ],
  },
  {
    title: 'Node2',
    value: '0-1',
    key: '0-1',
  } ])