<template>
    <div class='container'> 
      <div class='wrapper'>
        home
        {{$route.path}}
      
      </div>
    </div>
</template>

<script>
import $api from '../apis/index.js'
export default {
    name: 'homes',
    data () {
        return {

        }
    },
    mounted(){
        console.log('home');

        
        console.log($api)
        // $api.post($api.url,{

        // })
        this.isLogin();
    },
    methods:{
        isLogin(){
           console.log('ac_token',localStorage.getItem('ac_token'));
            if(localStorage.getItem('ac_token')){
                this.upldataToken();
            }else{
                this.$router.push({path: '/app/login'})
            }
        },
        upldataToken(){
            $api.post($api.url,{
                action_name:'appAutoLogin',
                ac_token:localStorage.getItem('ac_token')
            }).then(res=>{
                if(res.errCode==0){
                    localStorage.setItem('ac_token',res.data.ac_token);
                }else{
                    layer.msg('err: ' + res.errMsg);
                    localStorage.removeItem('ac_token');
                    this.$router.push({path: '/app/login'})
                }
            });
        }
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

    .banner{
        height: 4rem;
        width: 100%;
        display: block;
        overflow: hidden;
        position: relative;
        padding-top: 0.88rem;
    }
    .banner img{
        display: inline-block;
        width: 100%;
        height: 100%;
    }
    .swipe{
        width:100%;
        height:100%;
        position: relative;
        overflow: hidden;
    }
    .swipe .swipe-wrap{
        height:100%;
    }
    .swipe .swipe-wrap > div{
        float: left;
        position: relative;
        width:100%;
        height:100%;
    }
    .dots {
        position: absolute;
        right:0.24rem;
        bottom: 0.24rem;
    }
    .dots span {
        display: inline-block;
        float: left;
        border-radius: 50%;
        height: 8px;
        width: 8px;
        border:1px solid #F0D2D2;
        background-color: transparent;
        box-sizing: border-box;
        margin-right:0.2rem;
        background: #F0D2D2;
    }
    .dots span:last-child{
        margin-right:0;
    }
    .dots span.active {
        background:rgba(180,37,54,1);
        border:1px solid rgba(180,37,54,1);
    }

    .sub_nav{
        width: 100%;
        padding: 0.24rem 0;
        box-sizing: border-box;
        background: #fff;
        display: block;
        margin-bottom: 0.2rem;
    }
    .sub_nav ul{
        width: 100%;
        display: flex;
    }
    .sub_nav .n_item{
        flex: 1;
        /* display: inline-block;
        width: 24.8%; */
        text-align: center;
    }
    .sub_nav .n_item img{
        display: block;
        width: 100%;
        margin: 0 auto;
        width: 1rem;height: 1rem;
        border-radius: 50%;
        overflow: hidden;
    }
    .sub_nav .n_item span{
        display: block;
        width: 100%;
        text-align: center;
        font-size:0.28rem;
        color:rgba(2,2,2,1);
        padding-top: 0.12rem;
    }

    .main{
        display: block;
        width: 100%;
    }
    .main .title{
        padding: 0.28rem 0.28rem 0;
        background: #fff;
        font-size:0.32rem;
        color:rgba(2,2,2,1);
        text-align: center;
    }
    .main .house_list{
        display: block;
        width: 100%;
    }
    .main .house_list .item{
        display: block;
        margin-bottom: 0.16rem;
        position: relative;
        background: #fff;
        padding: 0.32rem;
        box-sizing: border-box;
    }
    .main .house_list .item:last-child{
        margin-bottom:0;
    }
    .main .house_list .item .item_top{
        display: block;
        width: 100%;
        position: relative;
    }
    .main .house_list .item .item_top img{
        width: 100%;
        height: 3rem;
        display: block;
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
        background: #fff;
        padding: 0.24rem 0 0;
        width: 100%;
        box-sizing: border-box;
    }
    .main .house_list .item .item_bottom .name{
        background: #fff;
        margin-bottom: 0.08rem;
        overflow: hidden;
        clear: both;
    }
    .main .house_list .item .item_bottom .name_left{
        display: inline-block;
        float: left;
        color:rgba(2,2,2,1);
    }
    .main .house_list .item .item_bottom .house_status{
        width:0.68rem;
        height:0.32rem;
        text-align: center;
        line-height: 0.32rem;
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

        background: url(../assets/status11.png) no-repeat center center;
        background-size:0.68rem 0.32rem;
    }
    .main .house_list .item .item_bottom .house_status.daishou{
        /*border:0.02rem solid rgba(221,130,2,0.5);*/
        /*color:rgba(221,130,2,1);*/

        background: url(../assets/status22.png) no-repeat center center;
        background-size:0.68rem 0.32rem;
    }
    .main .house_list .item .item_bottom .house_status.shouqing{
        /*border:0.02rem solid rgba(122,126,130,0.5);*/
        /*color:rgba(122,126,130,1);*/

        background: url(../assets/status33.png) no-repeat center center;
        background-size:0.68rem 0.32rem;
    }
    .main .house_list .item .item_bottom .house_name{
        font-size:0.32rem;
        color:rgba(2,2,2,1);
        float: left;
        line-height: 0.44rem;
    }
    .main .house_list .item .item_bottom .name_right{
        font-size:0.24rem;
        color:rgba(140,140,140,1);
        float: right;
        display: inline-block;
        height: 0.4rem;
        line-height: 0.42rem;
        vertical-align: middle;
    }
    .main .house_list .item .item_bottom .name_right > img{
        display: inline-block;
        width:0.22rem;
        height:0.28rem;
    }
    .main .house_list .item .item_bottom .name_right > span{
        display: inline-block;
        height: 0.4rem;
        background: url('/images/xiangju/app/addr.png') no-repeat left 0.06rem;
        background-size: 0.22rem 0.28rem;
        padding-left:0.32rem;
    }
    .main .house_list .item .price{
        display: block;
        font-size:0.32rem;
        color:rgba(180,37,54,1);
        margin-bottom: 0.24rem;
    }
    .main .house_list .item .bq{
        display: block;
        height: 0.32rem;
        line-height: 0.32rem;
        box-sizing: border-box;
        overflow: hidden;
    }
    .main .house_list .item .bq span{
        display: inline-block;
        float: left;
        padding: 0 0.14rem;
        height:0.3rem;
        line-height: 0.32rem;
        text-align: center;
        background:rgba(80,184,186,1);
        border-radius:0.04rem;
        font-size:0.2rem;
        color:rgba(255,255,255,1);
        margin-right: 0.12rem;
    }
    .main .house_list .item .bq .color2{
        background:rgba(198,159,107,1);
    }
    .main .house_list .item .bq .color3{
        background:rgba(87,115,203,1);
    }
    .main .house_list .item .dijia{
        position: absolute;
        right: 0.32rem;
        bottom: 0.32rem;
        display: inline-block;
        width:1.6rem;
        height:0.64rem;
        text-align: center;
        line-height: 0.66rem;
        background:rgba(180,37,54,1);
        border-radius:0.04rem;
        border: 0;
        font-size:0.28rem;
        color:rgba(255,255,255,1);
        box-sizing: border-box;
    }


    .err{
        height: 100vh;
        background: url(/images/xiangju/app/err.png) no-repeat center 3.28rem;
        background-size: 2.8rem 2.8rem;
    }
    .err-text{
        height:0.44rem;
        font-size:0.28rem;
        color:rgba(109,126,146,1);
        line-height:0.44rem;
        text-align: center;
        position: relative;
        top: 6rem;
        display: none;
    }
</style>
