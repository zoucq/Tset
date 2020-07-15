<template>
      <div class="nav-fixed">
        <ul class="flex">
            <li class="flex-1 flex-pack-center n_item" >
                <router-link active-class="active" to="/app/home">
                    <img :src="$route.path=='/app/home'?'../src/assets/nav11.png':'../src/assets/nav1.png'" />
                    <span>首页{{count}}</span>
                </router-link>
            </li>
            <li class="flex-1 flex-pack-center n_item" >
                <router-link  active-class="active" to="/app/cdj">
                    <img :src="$route.path=='/app/cdj'?'/static/nav22.png':'/static/nav2.png'" />
                    <span>查底价</span>
                </router-link>
            </li>
            <li class="flex-1 flex-pack-center n_item" >
                <router-link active-class="active" to="/app/my">
                    <img :src="$route.path=='/app/my'?'/static/nav33.png':'/static/nav3.png'" />
                    <span>个人</span>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'navs',
    data () {
        return {

        }
    },
    mounted(){

    },
    computed:{
        count(){
          return 1
        }
    },
    methods:{
        
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >
  .nav-fixed{
      position: fixed;
      left: 0;bottom: 0;
      height: 0.98rem;
      line-height: 1rem;
      width: 100%;
      box-sizing: border-box;
      background:rgba(250,250,250,1);
      border-top:0.02rem solid rgba(0,0,0,0.1);
  }
  .nav-fixed ul{
      width: 100%;
      height: 100%;
  }
  .nav-fixed .n_item{
      text-align: center;
  }
  .nav-fixed .n_item a{
      display: flex;
      width:100%;
      height:100%;
      position: relative;
  }
  .nav-fixed .n_item img{
      display: block;
      width: auto;
      height: 0.4rem;
      margin: 0 auto 0.02rem;
      overflow: hidden;
      position: absolute;
      top:0.16rem;
      left:50%;
      -webkit-transform: translateX(-50%);
      -moz-transform: translateX(-50%);
      -ms-transform: translateX(-50%);
      -o-transform: translateX(-50%);
      transform: translateX(-50%);
  }
  .nav-fixed .n_item:first-child a img{
      height:0.44rem;
      top:0.12rem;
  }
  .nav-fixed .n_item span{
      display: block;
      width: 100%;
      line-height: 0.34rem;
      text-align: center;
      font-size:0.24rem;
      color:rgba(2,2,2,1);
      position: absolute;
      bottom:0.04rem;
  }
  .nav-fixed .n_item a.active span{
      color:rgba(180,37,54,1);
  }
</style>
