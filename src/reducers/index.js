import { combineReducers } from 'redux'
import * as app from './app'
import * as common from './common'
import * as user from './user'
import * as aclog from './aclog'
import * as dataAns from './dataAns'
import * as systemSetting from './systemSetting'
import * as integrated from './integrated'

export default combineReducers({
    ...app,
    ...common,
    ...user,
    ...aclog,
    ...dataAns,
    ...aclog,
    ...systemSetting,
    ...integrated
})
