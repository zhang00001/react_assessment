import { createAction } from 'redux-actions'
import { message } from 'antd'
import { Cookie } from 'utils/storage'
import axios from 'utils/axios'
import { RSA_X931_PADDING } from 'constants';

// 登录

const createSaveUser = createAction('SAVE_USER')
export const loginUser = (loginInfo) => async dispatch => {
    let { userName, password } = loginInfo
    return new Promise((resolve, reject) => {
        // 发起异步请求  获取信息
        axios.post('/v1/login/index', { name: userName, password }).subscribe(e => {
            if (e.data.code !== 200) {
                message.error(e.data.msg)
                return
            }
            let user = e.data.data
            Cookie.set('Auth_Token', JSON.stringify(user.token))
            resolve(user)
        })
    })
}


// 获取用户信息
// const createGetUser = createAction('GET_USER')
export const getUser = (token) => async dispatch => {
    return new Promise((resolve, reject) => {
        axios.get('v1/users/selfData').subscribe(e => {
            let user = e.data.data
            user.roles = ['admin']
            // console.log(user)
            dispatch(createSaveUser(user))
            resolve(user)
        })
     
    })
}

//清除用户信息
export const clearUser = createAction('CLEAR_USER')


// routes
export const setRoutes = createAction('SET_ROUTES')