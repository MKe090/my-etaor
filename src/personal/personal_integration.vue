<template>
  <div style="background-color: #f0f0f0;">
    <div class="head_01">
      <a href="javascript:history.go(-1);" class="go-home" target="_self">
        <i class="icon iconfont">&#xe62b;</i>
      </a>
      <div class="tit" >
        <h3>积分充值</h3>
      </div>
    </div>
    <form class="pwd-margin">
      <div class="container">
        <div class="item pwd">会员积分：<div id="credit" v-model="integraiton">{{integraiton.Credit}}</div></div>
        <!--<div class="item pwd">会员比例：1RMB 换 10积分</div>-->
        <div class="tip">
          * 最低充值10积分，且输入的充值积分必须为10的倍数
                </div>
        <div class="item acount border-line"><div>充值积分</div><input v-model="creditSum" type="text" placeholder="请输入充值积分数" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" /></div>
        <div class="item pwd">
          <div style="width: 125px">支付方式</div>
          <select  @change="PayTypeID($event)" class="pay-method">
            <option value="0">--请选择付款方式--</option>
            <option value="1">支付宝支付</option>
            <option value="3">余额支付</option>
          </select>
        </div>
        <p class="red-t center-t"><b class="tipError" v-model="tipError">{{tipError}}</b></p>
        <div class="item login">
          <button @click="creditSubmitS" class="btn-submit" type="button">提交</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script type="text/ecmascript-6">
export default{
    data(){
        return{
          integraiton:[],
          creditSum:'',
          id:'',
          tipError:''
        }
    },
  created() {
    let url = this.HOST + '/Member/MemberInformation.aspx';
    this.$http.post(url).then((response) => {
      response = response.body;
      if(response.status===true){
        this.integraiton=response.data
      }
    }, response => {
      // error callback
    });
  },
  methods:{
    PayTypeID(e){
      this.id=e.target.value;
    },
    creditSubmitS(){
        let creditSum=this.creditSum;
        let ReturnUrl='/personal_integration';
        let PayTypeID=this.id;
        if(creditSum.length==0){
          this.tipError="金额不可以为空";
          return false
        }
        if(creditSum<10){
            this.tipError="最低充值10积分";
            return false
        }
        if((creditSum%10)!=0){
            this.tipError="充值积分必须为10的倍数";
            return false
        }
        if(PayTypeID==0){
            this.tipError="请选择支付方式";
            return false
        }
        if(PayTypeID==1){
          let url = this.HOST + '/Member/MemberCreditBuy.aspx';
          this.$http.post(url,{
            PayCredit: creditSum,
            PayTypeID: PayTypeID,
            ReturnUrl: ReturnUrl
          }).then((response) => {
            response = response.body;
            console.log(response.data)
            if(response.status===true){
              this.$router.push({path: 'response.data'})
            }
          }, response => {
            // error callback
          });
        }
      if(PayTypeID==3){
        let url = this.HOST + '/Member/MemberCreditBuy.aspx';
        this.$http.post(url,{
          PayCredit: creditSum,
          PayTypeID: PayTypeID,
          ReturnUrl: ReturnUrl
        }).then((response) => {
          response = response.body;
          console.log(response.data);
          if(response.status===true){
            this.$router.push({path: '/personal_balancePay/'+response.data})

          }
        }, response => {
          // error callback
        });
      }
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  /*会员等级样式*/
  .pay-method{border:0;width:100%;font-family: "微软雅黑";font-size: 0.875rem;}
  .tip{font-size: 0.75rem;color:red;padding-left:0.5rem;line-height:1.0rem;padding-top:0.5rem;}
  .pwd-margin {margin-top: 2.95rem; position: absolute;}
  form {width: 100%; min-height: 500px;}
  body {background: #f0f0f0;}
  form .container .acount{padding-top:1px;margin-top: 10px;}
  .tipError{color: #f00;font-size: 13px; margin-left: 5%;margin-top: 10px;display: block;width: 100%;}
</style>
