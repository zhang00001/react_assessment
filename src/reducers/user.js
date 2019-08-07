import { handleActions } from 'redux-actions'
import { constantRouterMap } from '../router/config'

export const user = handleActions({
    SAVE_USER: (state, action) => {
        console.log(action)
    	return action.payload
    },
    CLEAR_USER: state => null,
    UPDATE_USER:(state,action) =>{
        let newState = JSON.parse(JSON.stringify(state))
        console.log(state)
        console.log(action)
        newState.avatar =action.payload.user.avatar;
        return newState
      }
}, null) 


/*routes*/
export const routes = handleActions({
    SET_ROUTES: (state, action) => [...constantRouterMap,...action.payload]
}, constantRouterMap)