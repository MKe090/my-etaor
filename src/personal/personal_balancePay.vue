<template>
  <div>
    <div class="head_01">
      <a href="javascript:history.go(-1);" class="go-home" target="_self">
        <i class="icon iconfont">&#xe62b;</i>
      </a>
      <div class="tit" >
        <h3>余额充值积分</h3>
      </div>
    </div>
    <div class="user_view" v-model="CreditLoad">
      <div class="box">
        <div class="list_nav">
          <div class="user-info_02">
            <div><div>购买充值积分</div><div class="payCash">{{CreditLoad.PayCredit}}</div></div>
            <div><div>应支付金额</div><div class="payCash">￥{{CreditLoad.PayCash}}</div></div>
          </div>
          <ul>
            <li id="yuePay-border1">
              <div class="">余额支付,请输入支付密码：</div>
            </li>
            <li id="yuePay-border2">
              <div class="item pwd border-line"><input id="inputPwd" type="password" placeholder="请输入支付密码" value=""/></div>
            </li>
            <li style="border:0;">
              <button id="rightPay" class="btn-submit" style="margin-bottom: 0rem;" type="button"> 确定支付 </button>
            </li>
            <li>
              <a href="forget_passwords.html">
                忘记支付密码？
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
    data(){
        return{
          CreditLoad:[]
        }
    },
  created() {
    console.log(this.$route.params.type)
    let GGrderID=this.$route.params.type
    let url = this.HOST + '/Member/BalanceToCreditLoad.aspx';
    this.$http.post(url,{ID:GGrderID},{emulateJSON: true}).then((response) => {
      response = response.body;
      if(response.status===true){
        this.CreditLoad=response.data
      }
    }, response => {
      // error callback
    });
  }

}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #inputPwd {border: 0;width: 100%;padding-left: 10px;font-family: "微软雅黑";font-size: .875rem;}
  .payCash {color: red;font-size: 18px;}
</style>
