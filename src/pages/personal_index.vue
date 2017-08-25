<template>
  <div>
    <div class="head_01">
      <router-link :to="{path: '/'}">
        <i class="fa fa-home"></i>
      </router-link>
      <div class="tit">
        <h3>我的账户</h3>
      </div>
      <div class="nav">
        <ul>
          <li class="cart">
            <a href="../Product/shopping-cart.html" target="_self"><i class="fa fa-shopping-cart" style="margin-right:1.0rem"></i></a>
          </li>
        </ul>
      </div>
    </div>
    <div class="user_view"  v-show="personal">
      <div class="user_bg">
        <div class="photo">
          <div class="top_bg68">
            <div class="user-info">
              <label>{{personal.MemberName}}</label>&nbsp;&nbsp;欢迎您！<br><i class="fa fa-certificate"></i>&nbsp;<span>{{personal.MemberLevel}}</span> </div>
            <div class="gray_div"></div>
          </div>
        </div>
        <div class="head-img">
          <img src="../assets/images/user68.png">
          <ul class="my-acount">
            <li>
              <a href="personal_balance.html" target="_self">
                <p>余额</p>
                <p class="red">￥{{personal.Credit}}</p>
              </a>
            </li>
            <li>
              <a href="personal_integration.html" target="_self">
                <p>积分</p>
                <p class="red" id="usercredit">{{personal.Balance}}积分</p>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="box">
        <div class="list_nav">
          <ul>
            <li class="items">
              <a href="personal_order.html?OId=0" target="_self">
                <div class="un"><span><i class="icon iconfont color-blue">&#xe623;</i>我的订单</span><i class="color-gray"> 查看全部订单 <i class="icon iconfont">&#xe62c;</i></i>
                </div>
              </a>
            </li>

            <li class="items order-icon">
              <div class="sub_items">
                <a href="personal_order.html?OId=1" target="_self"><i class="fa fa-money iocn-o"></i><span class="lineH">待付款</span></a>
              </div>
              <div class="sub_items">
                <a href="personal_order.html?OId=2" target="_self"><i class="fa fa-truck iocn-o"></i><span class="lineH">待发货</span></a>
              </div>
              <div class="sub_items">
                <a href="personal_order.html?OId=3" target="_self"><i class="fa fa-gift iocn-o"></i><span class="lineH">待收货</span></a>
              </div>
            </li>

          </ul>
          <ul>
            <li class="items">
                <router-link to="/personal_myaccount">
                <div class="un">
                  <span><i class="icon iconfont color-green">&#xe624;</i>我的账户</span>
                  <i class="icon iconfont">&#xe62c;</i></div>
                </router-link>
            </li>
            <li class="items">
              <router-link to="/personal_accountsafe">
                <div class="un">
                  <span><i class="icon iconfont color-gold">&#xe61b;</i>账户安全</span>
                  <i class="icon iconfont">&#xe62c;</i></div>
              </router-link>
            </li>
            <li class="items">
              <router-link to="/personal_info">
                <div class="un">
                  <span><i class="icon iconfont color-blue">&#xe629;</i>个人信息</span>
                  <i class="icon iconfont">&#xe62c;</i></div>
              </router-link>
            </li>
            <!--<li class="items">
                            <a href="personal_nameauthentication.html">
                                <div class="un">
                                    <span><i class="icon iconfont color-green" style="margin-left:-0.2rem;margin-right:0.15rem;">&#xe610;</i>实名认证</span>
                                <i class="icon iconfont">&#xe62c;</i></div>
                            </a>
                        </li>-->
            <li class="items">
              <a href="personal_myfavorite.html" target="_self">
                <div class="un">
                  <span><i class="icon iconfont color-red" style="font-size:1.0rem;">&#xe63b;</i>&nbsp;我的收藏</span>
                  <i class="icon iconfont">&#xe62c;</i></div>
              </a>
            </li>
            <li class="items">
              <router-link to="/receipt_address">
                <div class="un">
                  <span><i class="icon iconfont color-gold">&#xe634;</i>收货地址</span>
                  <i class="icon iconfont">&#xe62c;</i></div>
              </router-link>
            </li>
          </ul>
          <ul>
            <li class="items">
              <a href="personal_help.html" target="_self">
                <div class="un">
                  <span><i class="icon iconfont color-blue" style="font-size:1.2rem;">&#xe605;</i>帮助与客服</span>
                  <i class="icon iconfont">&#xe62c;</i></div>
              </a>
            </li>
            <!--<li class="items">
                            <a href="personal_messages.html" target="_self">
                                <div class="un">
                                    <span><i class="icon iconfont color-gold">&#xe60a;</i>系统消息</span>
                                <i class="icon iconfont">&#xe62c;</i></div>
                            </a>
                        </li>-->
            <li class="items">
              <a href="personal_saleafter.html" target="_self">
                <div class="un">
                  <span><i class="icon iconfont color-green">&#xe616;</i>售后管理</span>
                  <i class="icon iconfont">&#xe62c;</i></div>
              </a>
            </li>

          </ul>
          <ul>
            <!--<li class="items">
                <a href="personal_balanceTakecash.html" target="_self">
                    <div class="un">
                        <span><i class="fa fa-money" style="font-size:1.1rem;"></i>余额提现</span>
                    <i class="icon iconfont">&#xe62c;</i></div>
                </a>
            </li>-->

            <li class="items">
              <a href="personal_balanceDetail.html" target="_self">
                <div class="un">
                  <span><i class="icon iconfont color-blue" style="font-size:1.2rem;">&#xe61c;</i>余额明细</span>
                  <i class="icon iconfont">&#xe62c;</i></div>
              </a>
            </li>

            <li class="items">
              <a href="personal_integrationDetail.html" target="_self">
                <div class="un">
                  <span><i class="icon iconfont color-vi" style="font-size:1.1rem;">&#xe614;</i>积分明细</span>
                  <i class="icon iconfont">&#xe62c;</i></div>
              </a>
            </li>

            <li class="items">
              <router-link to="/personal_rank">
                <div class="un">
                  <span><i class="icon iconfont color-gold">&#xe60f;</i>会员等级</span>
                  <i class="icon iconfont">&#xe62c;</i></div>
              </router-link>
            </li>

            <li class="items">
              <a href="personal_buyDetail.html" target="_self">
                <div class="un">
                  <span><i class="icon iconfont color-green" style="font-size:1.1rem;">&#xe619;</i>会员购买明细</span>
                  <i class="icon iconfont">&#xe62c;</i></div>
              </a>
            </li>
          </ul>

          <ul>
            <li class="items">
                <div class="un" @click="quit">
                  <span><i class="icon iconfont color-red">&#xe63d;</i>退出</span>
                </div>
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
          personal:[]
       }
    },
  created() {
    let url = this.HOST + '/Member/MemberInformation.aspx';
    this.$http.post(url).then((response) => {
      response = response.body;
      console.log(response)
      if(response.status===true){
        this.personal=response.data
      }
    }, response => {
      // error callback
    });

  },
  methods:{
      quit(){
          let url = this.HOST + '/Member/Logout.aspx';
          this.$http.post(url).then((response) => {
            response = response.body;
            console.log(response)
            if(response.status===true){
              window.location.href = '/';
            }
          }, response => {
            // error callback
          });
        }
      }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../assets/iconfont/iconfont.css";
  .head_01 .tit h3{width: 100%;text-align: center;position:relative;z-index: 8888;font-size: 1.05rem;line-height: 2.85rem;}
  .head_01 i{font-size:1.35rem;color:#fff;line-height: 2.85rem;position: relative;z-index: 9999;}
  .head_01 .nav{position: relative;float: right;}
  .head_01 .cart .acount{font-size: 0.6rem;vertical-align: 12px;display: inline-block;margin-right:.5rem;margin-left:-4px;color: yellow;position: relative;z-index: 9999;}
  /*.head_01 .cart{margin-top:-7px;}*/
  .head_01 .search{margin-right:0.5rem;margin-top: -2px;z-index: 9999;position:relative;}
  .icon_lists .icon{color:#999;}
  .user_view{position:absolute;margin-top:2.85rem;width:100%;}
  .user_view .user_bg{background-color: #fff;}
  .user_view .photo .top_bg68 {
    height:150px;
    background: url(../assets/images/userbg.gif) #ffa1c1 no-repeat right top;
  }
  .user_view .photo .gray_div { width: 100%; height: 48px; background: #999;  opacity: 0.2; position:absolute; margin-top:-48px ;}
  .user_view .photo .top_bg68 .user-info { width:11.875rem; line-height: 22px; font-size: 0.875rem; color: #fff; position: relative; left: 130px; bottom: 3px; padding-top: 106px;}
  .user_view .head-img{margin-top:-46px;
    /*background: #fff;*/
    height: 5.5rem;
  }
  .user_view .head-img img{position:relative;float: left;border: 0;width:6.25rem ;height: 5.2rem;}
  .user_view .head-img .my-acount{margin-top:8px;}
  .user_view .head-img .my-acount li{display: inline-block;font-size: 0.8rem;line-height:1.2rem;width:100px;text-align: center;position:relative;
    float:right;margin-top:2.88rem;border-left:1px solid #ddd;}
  .user_view .head-img .my-acount li:last-child{border-left:0;}
  .user_view .head-img .my-acount li .red{color:red;}
  .clearfix{clear: both;}
  .user_view .list_nav ul{margin-bottom:0.5rem;background-color:#fff;padding-bottom:0rem;overflow:hidden;border-bottom: 1px solid #eee;}
  .user_view .list_nav ul li{height:2.85rem;line-height:2.85rem;border-bottom:1px solid #ddd;padding-left:0.5rem;padding-right:1.0rem;font-size: 0.875rem;box-sizing:border-box;}
  .user_view .list_nav ul li:last-child{border-bottom:0;}
  .user_view .list_nav ul li .un>i{position: relative; float: right;line-height: 2.85rem;color:#999;font-size: 0.875rem;}
  .user_view .list_nav ul li .un>span>i{line-height: 3.0rem;font-size: 1.4rem;margin-right:0.4rem;}
  .color-blue{color:#87cefa;}
  .color-green{color:#90ee90;}
  .color-gold{color:#ffd700;}
  .color-vi{color:#ee82ee;}
  .color-red{color:red;}

  .color-gray{font-size: 0.875rem;color: #ccc;}
  .user_view .list_nav .order-icon{height: 4.3rem;}
  .user_view .list_nav .order-icon .sub_items{position: relative;float: left;width:33%;text-align: center;margin-top:10px;}
  .user_view .list_nav .order-icon .iocn-o{display: block;font-size: 1.3rem;}
  .user_view .lineH{line-height:0.875rem;font-size:0.875rem ;display: inline-block;margin-top:-0.3rem ;}
</style>
