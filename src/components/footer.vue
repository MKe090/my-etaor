<template>
  <div>
    <ul class="zf-foot-nav">
      <li>
        <a href="#">
          <i class="fa fa-home fa-2x color"></i>
          <div class="font-27">首页</div>
        </a>
      </li>
      <li>
        <a>
          <i class="fa fa fa-reorder fa-2x color"></i>
          <div class="font-27">
          <router-link :to="{path: '/classification'}">
            分类
            </router-link>
          </div>
        </a>
      </li>
      <li>
        <a>
          <i class="fa fa-shopping-cart fa-2x color"></i>
          <div class="font-27">
            <router-link :to="{path: '/shopping_cart'}" @click.native="flushCom">
              购物车
            </router-link>
          </div>
        </a>
      </li>
      <li>
        <a>
          <i class="fa fa-user fa-2x color"></i>
          <div class="font-27" @click="personeal">
            我的
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
data(){
    return{

    }
},
  methods: {
     personeal(){
       var url = this.HOST + '/Member/IsLogin.aspx';
       this.$http.post(url).then((response) => {
         response = response.body;
         console.log(response)
         if(response.status===true){
           window.location = '/personal_index';
         }else {
           window.location = '/login';
         }
       }, response => {
         // error callback
       });
     },
    flushCom:function(){
      this.$router.go(0);
    }
   }
}
</script>
<style scoped>
  a{color: #666}
.zf-foot-nav{width: 100%;height:80px;background: #fff;position: fixed;bottom: 0px;border-top: 1px solid #ddd;}
.zf-foot-nav li{float: left;width: 25%;text-align: center;line-height: 30px;margin-top: 10px;}
</style>
