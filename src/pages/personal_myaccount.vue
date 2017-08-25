<template>
<div>
  <div id="" class="head_01">
    <a href="javascript:history.go(-1);" class="go-home" target="_self">
      <i class="icon iconfont">&#xe62b;</i>
    </a>
    <div class="tit">
      <h3>我的账户</h3>
    </div>
  </div>
  <div class="user_view">
    <div class="box">
      <div class="list_nav" v-model="myaccount">
        <ul>
          <li class="items">
            <div class="un">会员等级：<label class="red-t-1">{{myaccount.MemberLevel}}</label>
            </div>
          </li>
          <li class="items">
            <div class="un">账户余额：<label class="red-t-1">{{myaccount.Credit}}</label>
            </div>
          </li>
          <li class="items">
            <div class="un">账户积分：<label class="red-t-1">{{myaccount.Balance}}</label>
            </div>
          </li>

        </ul>
        <ul>
          <li class="items">
            <router-link to="/personal_rank">
              <div class="un">等级升级<i class="icon iconfont">&#xe62c;</i></div>
            </router-link>
          </li>
          <li class="items">
            <router-link to="/personal_integration">
              <div class="un">积分充值<i class="icon iconfont">&#xe62c;</i></div>
            </router-link>
          </li>
          <li class="items">
            <a href="personal_balance.html" target="_self">
              <div class="un">余额充值<i class="icon iconfont">&#xe62c;</i></div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
export default{
  data() {
    return{
      myaccount:[]
    }
  },
  created() {
    let url = this.HOST + '/Member/MemberInformation.aspx';
    this.$http.post(url).then((response) => {
      response = response.body;
      console.log(response);
      if(response.status===true){
        this.myaccount=response.data
      }
    }, response => {
      // error callback
    });

  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  /*我的账户样式*/
  .user_view .box .un .red-t-1{vertical-align: -1px;font-size: 0.875rem;line-height: 2.85rem;color:red;}
  .user_view .box .un .explain{width:1.4rem;font-size: 1.2rem;line-height: 2.85rem;position:relative;float:right;color:#00bfff;}
  .user_view .box .blue-t{color:#00bfff;}
</style>
