<template>
  	<div class="container">

	    <div class="user">
	        <div class="user_detail">
	            <img class="avtor" src="/images/xiangju/app/avtor.png" alt="">
	            <span>18720757402</span>
	        </div>
	        <div class="about">
	            <span>关于我们</span>
	            <img src="/images/xiangju/app/more2.png" alt="">
	        </div>
	    </div>

	    <div class="main">
	        <div class="title">浏览记录</div>
	        <ul class="house_list">
	            <li class="item">
	                <div class="item_top">
	                    <img src="/images/xiangju/app/test.png" />
	                </div>
	                <div class="item_bottom">
	                    <div class="name">
	                        <div class="name_left">
	                            华夏四季
	                        </div>
	                    </div>
	                    <div class="price">
	                        均价：15000元/㎡
	                    </div>
	                    <div class="bq">
	                        <span>住宅</span>
	                        <span class="color2">别墅</span>
	                        <span class="color3">酒店式公寓</span>
	                    </div>
	                    <div class="addr">
	                        西湖区文一西路115号
	                    </div>
	                </div>
	            </li>
	            <li class="item">
	                <div class="item_top">
	                    <img src="/images/xiangju/app/test.png" />
	                </div>
	                <div class="item_bottom">
	                    <div class="name">
	                        <div class="name_left">
	                            华夏四季
	                        </div>
	                    </div>
	                    <div class="price">
	                        均价：15000元/㎡
	                    </div>
	                    <div class="bq">
	                        <span>住宅</span>
	                        <span class="color2">别墅</span>
	                        <span class="color3">酒店式公寓</span>
	                    </div>
	                    <div class="addr">
	                        西湖区文一西路115号
	                    </div>
	                </div>
	            </li>
	            <li class="item">
	                <div class="item_top">
	                    <img src="/images/xiangju/app/test.png" />
	                </div>
	                <div class="item_bottom">
	                    <div class="name">
	                        <div class="name_left">
	                            华夏四季
	                        </div>
	                    </div>
	                    <div class="price">
	                        均价：15000元/㎡
	                    </div>
	                    <div class="bq">
	                        <span>住宅</span>
	                        <span class="color2">别墅</span>
	                        <span class="color3">酒店式公寓</span>
	                    </div>
	                    <div class="addr">
	                        西湖区文一西路115号
	                    </div>
	                </div>
	            </li>
	        </ul>
	    </div>

</div>
</template>

<script>

export default {
    name: 'heads',
    data () {
        return {

        }
    },
    mounted(){

    },
    methods:{
        
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >
 	.container{
        display: block;
        width: 100%;
        background:rgba(240,240,240,1);
        padding-bottom: 0.98rem;
    }
    .container .user{
        height: 3.08rem;
        line-height: 3.08rem;
        padding: 0 0.4rem;

        /* padding: 0.74rem 0.4rem 0.94rem; */
        background:rgba(250,250,250,1) url(/images/xiangju/app/user_bg.png) no-repeat left top;
        background-size: 100% 100%;
        /* background: #5A5A5A; */

        color:rgba(255,255,255,1);
        overflow: hidden;
        clear: both;
    }
    .container .user .user_detail{
        display: inline-block;
        float: left;
        color:rgba(250,250,250,1);
    }
    .container .user .about{
        float: right;
        display: inline-block;
        vertical-align: middle;
        height: 100%;
        color: #E1cdb3;
    }
    .container .user .about > img{
        display: inline-block;
        width:0.12rem;
        height:0.24rem;
        vertical-align: middle;
    }
    .container .user .about > span{
        display: inline-block;
        height:0.4rem;
        font-size:0.28rem;
        color:rgba(250,250,250,1);
        line-height:0.4rem;
        background: url('/images/xiangju/app/more.png') no-repeat right 0.07rem;
        background-size: 0.16rem 0.24rem;
        padding-right:0.32rem;
    }
    .container .user .user_detail .avtor{
        display: inline-block;
        width:1.32rem;
        height:1.32rem;
        border-radius: 50%;
        /*background:rgba(250,250,250,1);*/
        vertical-align: middle;
    }
    .container .user .user_detail span{
        display: inline-block;
        font-size:0.36rem;
        margin-left: 0.16rem;
        vertical-align: middle;
    }


    .main{
        display: block;
        width: 100%;
    }
    .main .title{
        padding: 0.48rem 0.28rem 0;
        background: rgba(250,250,250,1);
        font-size:0.32rem;
        color:rgba(2,2,2,1);
        text-align: center;
    }
    .main .house_list{
        display: block;
        width: 100%;
        padding: 0.28rem 0.2rem 0;
        box-sizing: border-box;
        background: rgba(250,250,250,1);
        overflow: hidden;
        display: flex;
        flex-flow: wrap;
        justify-content: space-between;
        margin-bottom: 0.6rem;
    }
    .main .house_list .item{
        display: inline-block;
         width: 48.6%;
        /*width: 3.45rem;*/
        position: relative;
        background: rgba(250,250,250,1);
        margin-bottom: 0.32rem;
        float: left;
    }
    /*.main .house_list .item:last-child{*/
        /*margin-bottom:0;*/
    /*}*/
    .main .house_list .item:nth-child(even){
        float: right;
    }
    .main .house_list .item .item_top{
        display: block;
        width: 100%;
        position: relative;
    }
    .main .house_list .item .item_top img{
        width: 100%;
        height: 2.8rem;
        display: block;
        border-radius: 0.06rem;
    }
    .main .house_list .item .item_top .desc{
        display: block;
        padding: 0.14rem 0.2rem;
        background:rgba(241,236,226,1);
        text-align: left;
        font-size:0.26rem;
        color:rgba(159,137,96,1);
    }

    .main .house_list .item .item_bottom{
        display: block;
        background: rgba(250,250,250,1);
        padding: 0.24rem 0 0;
        width: 100%;
        box-sizing: border-box;
    }
    .main .house_list .item .item_bottom .name{
        background: rgba(250,250,250,1);
        margin-bottom: 0.06rem;
        overflow: hidden;
        clear: both;
    }
    .main .house_list .item .item_bottom .name_left{
        display: inline-block;
        font-size:0.28rem;
        color:rgba(2,2,2,1);
        float: left;
        width:100%;
        height:0.44rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        display: flex;
    }
    /*.main .house_list .item .item_bottom .house_status{*/
        /*width:0.68rem;*/
        /*height:0.30rem;*/
        /*text-align: center;*/
        /*line-height: 0.30rem;*/
        /*background:rgba(217,25,25,0.03);*/
        /*border-radius:0.16rem;*/
        /*border:0.02rem solid rgba(217,25,25,0.5);*/
        /*font-size:0.24rem;*/
        /*color:rgba(217,25,25,1);*/
        /*vertical-align: middle;*/
        /*float: left;*/
        /*margin-right: 0.08rem;*/
        /*margin-top:0.02rem;*/
    /*}*/
    .main .house_list .item .item_bottom .house_status{
        width:0.60rem;
        height:0.28rem;
        text-align: center;
        line-height: 0.28rem;
        vertical-align: middle;

        /*line-height:1;*/
        /*padding:0.02rem 0;*/
        /*text-align: center;*/
        /*font-size:12px;*/

        /*font-size:0.24rem;*/
        /*color:rgba(217,25,25,1);*/
        /*background:rgba(217,25,25,0.03);*/
        /*border-radius:0.16rem;*/
        /*border:1px solid rgba(217,25,25,0.5);*/

        float: left;
        margin-right: 0.08rem;
        margin-top:0.04rem;
        box-sizing: border-box;

        background: url(/images/xiangju/app/status11.png) no-repeat center center;
        background-size:0.6rem 0.28rem;
    }
    .main .house_list .item .item_bottom .house_status.daishou{
        /*border:0.02rem solid rgba(221,130,2,0.5);*/
        /*color:rgba(221,130,2,1);*/

        background: url(/images/xiangju/app/status22.png) no-repeat center center;
        background-size:0.6rem 0.28rem;
    }
    .main .house_list .item .item_bottom .house_status.shouqing{
        /*border:0.02rem solid rgba(122,126,130,0.5);*/
        /*color:rgba(122,126,130,1);*/

        background: url(/images/xiangju/app/status33.png) no-repeat center center;
        background-size:0.6rem 0.28rem;
    }

    .main .house_list .item .item_bottom .name_right{
        font-size:0.28rem;
        color:rgba(140,140,140,1);
        float: right;
        display: inline-block;
    }
    .main .house_list .item .item_bottom .name_right > img{
        display: inline-block;
        width:0.22rem;
        height:0.28rem;
        vertical-align: middle;
    }
    .main .house_list .item .item_bottom .name_right > span{
        display: inline-block;
        vertical-align: middle;
        height: 0.4rem;
        line-height: 0.4rem;
    }
    .main .house_list .item .price{
        display: block;
        font-size:0.28rem;
        color:rgba(180,37,54,1);
        margin-bottom: 0.16rem;
    }
    .main .house_list .item .addr{
        font-size:0.24rem;
        color:rgba(140,140,140,1);
    }
    .main .house_list .item .bq{
        display: block;
        margin-bottom: 0.16rem;
        height: 0.34rem;
        line-height: 0.34rem;
        box-sizing: border-box;
    }
    .main .house_list .item .bq span{
        display: inline-block;
        padding: 0 0.14rem;
        height:0.3rem;
        line-height: 0.32rem;
        text-align: center;
        background:rgba(80,184,186,1);
        border-radius:0.04rem;
        font-size:0.2rem;
        color:rgba(255,255,255,1);
        box-sizing: border-box;
    }
    .main .house_list .item .bq .color2{
        background:rgba(198,159,107,1);
    }
    .main .house_list .item .bq .color3{
        background:rgba(87,115,203,1);
    }



    .main .no_see{
        padding-top:2.2rem;
        display: block;
        width:100%;
    }
    .main .no_see > img{
        width:2.8rem;
        height:2.8rem;
        margin:0 auto;
    }
    .main .no_see > p{
        font-size:0.28rem;
        color:rgba(109,126,146,1);
        text-align: center;
        margin-top:0.32rem;
    }
</style>
