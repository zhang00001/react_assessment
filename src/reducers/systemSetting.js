//添加用户表单
import { handleActions } from 'redux-actions'
export const UserFormSearch = handleActions({
    CHANGE_KEY_WORDS: (state, action) => {
        let newState = JSON.parse(JSON.stringify(state))
        console.log(state)
        newState.keyword = action.payload
        return newState
    },
    CHANGE_ORG_ID:(state, action) => {
        let newState = JSON.parse(JSON.stringify(state))
        newState.organization_id = action.payload
        return newState
    },
    CHANGE_PAGE:(state, action) => {
        let newState = JSON.parse(JSON.stringify(state))
        newState.page = action.payload
        return newState
    },
  },{
    keyword:  undefined,
    organization_id:undefined,
    page:1
  })

  export const tableList = handleActions({
    INIT_TABLE_LIST: (state, action) => {
        return action.payload
    },
    UPDATE_TABLE:(state,action)=>{
      console.log(action)
      return{
        usertable: action.payload
      }
    }
  },{
    usertable:[],
  })

  export const modalStatus =handleActions({
    OPEN_MODAL:(state,action) =>{
      console.log(state)
      console.log(action)
      return{
        visible:action.payload
      }
    },
    CLOSE_MODAL:(state,action) =>{
      return{
        visible:action.payload
      }
    }
  },{
    visible:false
  });
  export const zzlist =handleActions({
    INIT_ORG_LIST:(state,action) =>{
      console.log(action)
      return action.payload
    },
  },{
    org_ist:[]
  });

  // 获取全选列表
  export const roleTable =handleActions({
    INIT_ROLE_LIST:(state,action) =>{
        console.log(action)
        return action.payload
      },
    },{
      roleList:[]
  });
//获取组织信息
export const getOriginInfo =handleActions({
  GET_ORIGIN_INFO:(state,action) =>{
      console.log(action)
      return action.payload
    },
  },{
    singleOrigin:{}
});

//获取组织table列表
export const OriginTable =handleActions({
  INIT_ORIGIN_TABLE:(state,action) =>{
      console.log(action)
      return action.payload
  },
  UPDATE_ORIGIN_TABLE:(state,action)=>{
    console.log(state)
    console.log(action)
    let newState = JSON.parse(JSON.stringify(state))
    newState.originTable = action.payload.originTable
    return newState
  },
 
  },{
    originTable:[],
    total:''
});

export const NewsList =handleActions({
  INIT_NEWS_TABLE:(state,action) =>{
      let newState = JSON.parse(JSON.stringify(state))
      newState.newsTable =action.payload.newsList;
      newState.total =action.payload.total;
      return newState
  },
  UPDATE_NEWS_TABLE:(state,action) =>{
    let newState = JSON.parse(JSON.stringify(state))
    console.log(state)
    console.log(action)
    newState.newsTable =action.payload.newsTable;
    newState.total =action.payload.total;
    return newState
  },
  
},{
   newsTable:[],
   total:''
});
// 消息条件筛选
export const newsCondition =handleActions({
  INIT_CHANGE_UNREAD:(state,action) =>{
    console.log(state)
    console.log(action)
    let newState = JSON.parse(JSON.stringify(state))
    console.log(state)
    newState.read_flag = action.payload
    return newState
},
INIT_CHANGE_DATE:(state,action) =>{
    console.log(state)
    console.log(action)
    let newState = JSON.parse(JSON.stringify(state))
    console.log(state)
    newState.send_time = action.payload
    return newState
},
INIT_CHANGE_NEWS_TYPE:(state,action) =>{
    console.log(action)
    let newState = JSON.parse(JSON.stringify(state))
    newState.message_type = action.payload
    return newState
  }, 
},{
  read_flag:"",
  message_type:'',
  send_time:''
})

//获取消息列表

export const newsCategory =handleActions({
  INIT_NEWS_CATEGORY:(state,action) =>{
    return action.payload
  },
  // INIT_CHANGE_UNREAD:(state,action) =>{
  //   console.log(state)
  //   console.log(action)
  //   let newState = JSON.parse(JSON.stringify(state))
  //   console.log(state)
  //   newState.read_flag = action.payload
  //   return newState
  // },
  // INIT_CHANGE_DATE:(state,action) =>{
  //   console.log(state)
  //   console.log(action)
  //   let newState = JSON.parse(JSON.stringify(state))
  //   console.log(state)
  //   newState.send_time = action.payload
  //   return newState
  // },
  // INIT_CHANGE_NEWS_TYPE:(state,action) =>{
  //   console.log(state)
  //   console.log(action)
  //   let newState = JSON.parse(JSON.stringify(state))
  //   console.log(state)
  //   newState.message_type = action.payload
  //   return newState
  // },
},{
  newscategory:[],
 
});
// export const upDateUser =handleActions({
//   UPDATE_USER:(state,action) =>{
//     let newState = JSON.parse(JSON.stringify(state))
//     console.log(state)
//     console.log(action)
//     newState.user.avatar =action.payload.user.avatar;
//     return newState
//   }
// },{
//   user:{}
// })
// 首页数据
export const IndexData =handleActions({
  INIT_INDEX_DATA:(state,action) =>{
    console.log(action)
    return action.payload
  },
},{
  fast_entry:{},
  message:[],
});


//首页企业图标数据
export const leftEcharts =handleActions({
  INIT_ECHART_LEFT:(state,action) =>{
    return action.payload
  }
},{
  obj:{}
});
export const unreadnews =handleActions({
  INIT_UNREAD :(state,action) =>{
    console.log(action)
    return action.payload
  }
},{
  unreadCount:0
});
// 获取1级指标数据
export const getFirstCategoryTable =handleActions({
  GET_FIRST_CATEGORY:(state,action) =>{
      return action.payload
  },
//   GET_SECOND_CATEGORY:(state,action) =>{
//     return action.payload
// }
},{
  firstList:[],
  // secondList:[]
})
export const getFirstCategoryTable2 =handleActions({
  GET_SECOND_CATEGORY:(state,action) =>{
    console.log(action)
    return action.payload
}
},{
  secondList:[]
})