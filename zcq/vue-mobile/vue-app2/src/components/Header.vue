<template>
  <div class="head">
      <div class='headers'>{{text}}</div>
  </div>
</template>

<script>

export default {
    name: 'heads',
    data () {
        return {
          text:''
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
  .head{
      padding-top: 0.88rem;
  }
  .headers{
      position: fixed;
      left:0;
      top:0;
      z-index:99;
      width: 100%;
      height: 0.88rem;
      text-align: center;
      line-height: 0.88rem;
      background:rgba(48,48,48,1);
      background:rgba(48,48,48,1) url('/static/name_1.png') no-repeat center center;
      background-size: 2.5rem 0.4rem;
      font-size:16px;
      color:rgba(255,255,255,1);
  }
</style>
