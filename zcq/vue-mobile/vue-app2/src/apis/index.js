import axios from 'axios'
import Route from '@/router'
import store from './../store/index.js'
import Vue from 'vue'


const url='/v2'

const api = {
	'hot':'/api/j/search_subjects',
	'search':'/api/j/subject_suggest?q=123',
	'broadcast':url+'/status/anonymous_timeline?max_id=&ck=&for_mobile=1',
	'home':url+'/recommend_feed',
	'movieJson1':url+'/subject_collection/movie_showing/items',
	'movieJson2':url+'/subject_collection/movie_free_stream/items',
	'movieJson3':url+'/subject_collection/movie_latest/items'
}


function $request(url,method,data,success,fail){
	axios({
		url: url,
		method: method || 'get', 
		headers: {'X-Requested-With': 'XMLHttpRequest'},
		// `params` 是即将与请求一起发送的 URL 参数
		params: {},
		paramsSerializer: function(params) {
		    return Qs.stringify(params, {arrayFormat: 'brackets'})
		},
		// 'PUT', 'POST', 和 'PATCH'
		data: (method=='PUT' || method=='POST' || method=='PATCH' ) ? data : {},
		// `withCredentials` 表示跨域请求时是否需要使用凭证
  		withCredentials: false, // 默认的
  		responseType: 'json'
	})
	.then(function (res) {
		console.log(res);
		if(res.data){
			(typeof succss =='function') && success(res.data);
		}else{
			Vue.$vux.toast.text(res.data.msg, 'middle')
		}
	})
	.catch(function (error) {
		console.log(error);
		(typeof succss =='function') && fail(error);
	});
}


function post(url,data,success,fail){
	return $request(url,'post',data,success,fail)
}

function get(url,data,success,fail){
	return $request(url,'get',data,success,fail)
}

const addr = url + '/api/v1/app'

export default{
	url:addr,
	post:post,
	get:get
}




