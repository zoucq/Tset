import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
		{
		  	path: '/',
		  	name: 'FromVux',
		  	component: function (resolve) {
                require(['@/components/HelloFromVux'], resolve)
            }
		},
		{
		  	path: '/app/home',
		  	name: 'Home',
		  	component: function (resolve) {
                require(['@/components/Home'], resolve)
            }
		},
		{
		  	path: '/app/cdj',
		  	name: 'Cdj',
		  	component: function (resolve) {
                require(['@/components/HelloWorld'], resolve)
            }
		},
		{
		  	path: '/app/my',
		  	name: 'My',
		  	component: function (resolve) {
                require(['@/components/My'], resolve)
            }
		},
		{
		  	path: '/app/login',
		  	name: 'Login',
		  	component: function (resolve) {
                require(['@/components/Login'], resolve)
            }
		}
	]
});
