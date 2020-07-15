<template>
	  	<div id="app">

	  		<!-- <vheader></vheader> -->

	  		<vloading v-show="isLoading"></vloading>

	    	<router-view></router-view>

	    	<vnav></vnav>

	  	</div>
</template>

<script>
	import vheader from './components/Header.vue'
	import vnav from './components/Nav.vue'
	import vloading from './components/Loading.vue'
	import $api from './apis/index.js'
	import {
        Badge,
        Drawer,
        ViewBox,
        XHeader,
        Tabbar,
        TabbarItem,
        TransferDom
    }
    from 'vux'
	import { mapState } from 'vuex';
	export default {
		name: 'app',
		data(){
			return {

			}
		},
		computed:{
			...mapState({
			    isLoading:state=>state.a.isLoading
			})
		},
		mounted(){
			
		},
		components:{
			vheader,
			vnav,
			vloading
		}
	}
</script>

<style lang="less">
	@import '~vux/src/styles/reset.less';

	body {
	  	background-color: #fbf9fe;
	  	font-size:16px;
	}
</style>
