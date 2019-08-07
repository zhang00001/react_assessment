import React from 'react'
import 'babel-polyfill'
import {
    render
} from 'react-dom'
import { createStore, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import Router from './router'
import configureStore from './store'
import DevTools from './devTools'
import 'src/actions'
import 'utils/iconfont'
// import 'antd/dist/antd.less'
import './styles/index.css'
import './styles/index.less'
import 'components/Markdown/markdown.css'

import { LocaleProvider, message } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

message.config({
  top: 300,
  duration: 2,
  maxCount: 3,
})

const store = configureStore()
//{process.env.NODE_ENV === 'production'?'':<DevTools/>}
render(
    <LocaleProvider locale={zh_CN}>
        <Provider store={store}>
            <div>
                <Router />
            </div>
        </Provider>
    </LocaleProvider>
    , document.getElementById('app'))
