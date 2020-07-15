// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import Home from './components/HelloFromVux'
import store from './store/index'
import router from './router'

import './apis/rem.js'
import './apis/reset.css'

import $api from './apis/index.js'

Vue.prototype.$http = $api;
Vue.prototype.$store = store;


import { WechatPlugin, ConfirmPlugin, AlertPlugin, LoadingPlugin, ToastPlugin, DatetimePlugin  } from 'vux'
Vue.use(WechatPlugin)
Vue.use(VueRouter)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)
Vue.use(DatetimePlugin )
Vue.use(ToastPlugin, {position:'middle'})


import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
Vue.prototype.$axios=axios


// 拦截request,设置全局请求为ajax请求
axios.interceptors.request.use(
    config => {
      store.dispatch('updateLoadingStatus',{isLoading:true});
      config.headers['X-Requested-With'] = 'XMLHttpRequest'
      return config
    },
    err => {
      return Promise.reject(err)
    }
)


// 拦截响应response，并做一些错误处理
axios.interceptors.response.use(
    response => {
  	   store.dispatch('updateLoadingStatus',{isLoading:false});
    	 const data = response.data
    	 return response
    },
    err => {
      return Promise.reject(err.response)
    }
)

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app-box')
