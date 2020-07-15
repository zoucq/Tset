<template>
	<div class="container login">

	    <div class="logo_img">
	        <img src="/images/xiangju/app/logo.png" />
	    </div>
	    <div class="content">
	        <div class="wrapper">
	            <input class="needsclick input" id="phone" v-model="editInfo.phone" type="text" placeholder="输入手机号" />
	            <img class="clear" src="/images/xiangju/app/clear.png" alt="">
	        </div>
	        <div class="wrapper">
	            <input class="needsclick input" id="code" v-model="editInfo.code" type="number" placeholder="短信验证码" />
	            <button class="code"  @click="sendCode">获取验证码</button>
	        </div>
	    </div>
	    <div class="tips">
	        未注册过的手机号将自动注册新账号
	    </div>
	    <div class="buttons">
	        <button class='submit'  @click="login">登录</button>
	    </div>
	    <div class="agree">
	        <span>注册/登录即代表同意</span>
	        <span class="black">《用户使用协议》</span>
	    </div>

	</div>
</template>

<script>

export default {
    name: 'logins',
    data () {
        return {
          	editInfo:{}
        }
    },
    mounted(){
    	

    },
    methods:{
    	login(){
			let data = {
	    		phone:this.editInfo.phone,
	    		code:this.editInfo.code
	    	}

    	},
        sendCode(){
        	if(this.editInfo.phone=='' || this.editInfo.phone==undefined || this.editInfo.phone.length==0){
        		this.$vux.toast.text('请输入手机号！', 'middle')
        		return ;
        	}
        	var data = {};
            data.action_name = 'appLogin';
            data.type = 1;
            data.phone = phone;

            this.$vux.loading.show({
                text: '正在登录...'
            })

            submit(data,function(res){
                console.log(res);
                if(res.errCode==0) {
                    layer.msg('验证码已发送!');

                    var count = 60;

                    timer = setInterval(function(){
                        $(that).html(count+'S').attr('disabled','disabled').removeClass('active');
                        if(count==0){
                            clearInterval(timer);
                            $(that).html('获取验证码').removeAttr('disabled').addClass('active');
                        }
                        count--;
                    },1000);

                }else {
                    layer.msg('err: '+res.errMsg);
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
	    height: 100%;
	    background:rgba(250,250,250,1);
	    overflow: hidden;
	}
	.close{
	    position: relative;
	    left:0.44rem;
	    top:0.38rem;
	    display: block;
	    width:0.32rem;
	    height:0.32rem;
	}

	.container .logo_img{
	    display: block;
	    width: 1.81rem;
	    height: 1.68rem;
	    padding: 1.4rem 0 1.16rem;
	    margin: 0 auto;
	}
	.container .logo_img img{
	    display: block;
	    width:100%;
	    height:100%;
	}

	.container .content{
	    display: block;
	    padding: 0 0.4rem;
	    box-sizing: border-box;
	}
	.container .content .wrapper{
	    width: 100%;
	    border-bottom: 1px solid rgba(0,0,0,0.1);
	    position: relative;
	    box-sizing: border-box;
	}
	.container .content .wrapper input{
	    width: 100%;
	    height: 0.6rem;
	    padding: 0.28rem 0;
	    background:rgba(250,250,250,1);
	    outline: none;
	    border: 0;
	    font-size: 0.30rem;
	    color:rgba(2,2,2,1);
	}
	.container .content .wrapper .clear{
	    position: absolute;
	    right:0;
	    top:50%;
	    display: block;
	    width:0.32rem;
	    height:0.32rem;
	    margin-top:-0.16rem;
	    display: none;
	}
	.container .content .wrapper .code{
	    position: absolute;
	    right: 0;
	    bottom: 0.28rem;
	    display: inline-block;
	    width: 1.64rem;
	    height: 0.6rem;
	    line-height: 0.6rem;
	    text-align: center;
	    font-size: 0.24rem;
	    border-radius:0.08rem;
	    border:1px solid rgba(191,191,191,0.4);
	    background: transparent;
	    color: rgba(191,191,191,0.5);
	    outline: none;
	}
	.container .content .wrapper .code.active {
	    /*background: rgba(180,37,54,1);*/
	    /*color: #fff;*/
	    color:rgba(38,38,38,1);
	    border:1px solid rgba(2,2,2,0.5);
	}

	.container .tips{
	    padding: 0 0.4rem;
	    display: block;
	    font-size:0.24rem;
	    color:rgba(38,38,38,1);
	    margin-top: 0.32rem;
	    margin-bottom: 0.8rem;
	}
	.container .buttons{
	    border: 0;
	    padding: 0 0.4rem;
	    display: block;
	}
	.container .buttons .submit{
	    padding: 0 0.4rem;
	    display: block;
	    width: 100%;
	    height:1rem;
	    text-align: center;
	    line-height: 1rem;
	    background:rgba(180,37,54,1);
	    border-radius:0.08rem;
	    font-size:0.32rem;
	    color:rgba(250,250,250,0.5);
	    border: 0;
	    outline: none;
	}
	.container .buttons .submit.active{
	    color:rgba(250,250,250,1);
	}
	.container .agree{
	    display: block;
	    padding: 0 0.4rem;
	    margin-top: 0.32rem;
	    font-size:0.24rem;
	    color: #8C8C8C
	}
	.container .agree .black{
	    color: #262626;
	}
</style>
