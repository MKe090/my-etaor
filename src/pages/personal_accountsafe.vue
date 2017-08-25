<template>
<div>
  <div class="head_01">
    <a href="javascript:history.go(-1);" class="go-home" target="_self">
      <i class="icon iconfont">&#xe62b;</i>
    </a>
    <div class="tit" >
      <h3>账户安全</h3>
    </div>
  </div>
  <div class="user_view">
    <div class="box">
      <div class="list_nav">
        <div class="user-info_02" v-model="accountsafe">
          <div><span>用户ID：</span><span class="user-id">{{accountsafe.MemberID}}</span></div>
          <div><span>用户名：</span><span id="user-name">{{accountsafe.MemberName}}</span></div>
        </div>
        <ul>
          <!--<li class="items"><a href="personal_nameauthentication.html" target="_self">
              <div class="un">实名认证<i class="icon iconfont">&#xe62c;</i></div>
              </a>
              </li>-->
          <li class="items">
            <router-link to="/personal_setTel">
              <div class="un">手机绑定<i class="icon iconfont">&#xe62c;</i></div>
            </router-link>
          </li>
          <li class="items"><a href="personal_info.html" target="_self">
            <div class="un">完善个人信息<i class="icon iconfont">&#xe62c;</i></div>
          </a>
          </li>
        </ul>
        <ul>
          <li class="items"><a href="modify_Login_passwords.html" target="_self">
            <div class="un">修改登录密码<i class="icon iconfont">&#xe62c;</i></div>
          </a>
          </li>
          <li class="items">
            <a class="" href="personal_modify_Paypasswords.html" target="_self">
              <div class="un">设置/修改支付密码<i class="icon iconfont">&#xe62c;</i></div>
            </a>
          </li>
          <li class="items"><a href="forget_passwords.html" target="_self">
            <div class="un">忘记支付密码<i class="icon iconfont">&#xe62c;</i></div>
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
      accountsafe:[]
    }
  },
  created() {
    let url = this.HOST + '/Member/MemberInformation.aspx';
    this.$http.post(url).then((response) => {
      response = response.body;
      console.log(response);
      if(response.status===true){
        this.accountsafe=response.data
      }
    }, response => {
      // error callback
    });

  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  /*账户安全样式*/
  .user_view .user-info_02,.user-info_03{padding: 0.5rem;width:100%;background-color:#fff;box-sizing: border-box;font-size:0.875rem;line-height:1.65rem;color:#666;margin-bottom:0.5rem;}
  .user_view .user-info_02 .user-id{font-weight: 600;color:#333;}
  .user_view .user-info_02 .safe-process{display: inline-block;width:100px;height:1.25rem;background-color:lawngreen;
    margin:0 0.5rem;vertical-align: text-bottom;}
  .color-txt-orange{color:orange;}
</style>
