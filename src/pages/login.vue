<template>
  <div>
    <div class="head_01">
      <a href="javascript:history.go(-1);"><div class="fl dx-h5-logo"><i class="fa fa-angle-left font-20"></i></div></a>
      <div class="tit">
        <h3>欧渠通账号登录</h3>
      </div>

    </div>
    <form id="formLogin" class="pwd-margin">
      <div class="container">
        <div class="item acount border-line"><div>账 户 </div><input type="text" v-model="uName" name="username"  placeholder="请输入账户名称/手机号" value="" /></div>
        <div class="item pwd border-line"><div>密 码 </div><input type="password" v-model="password" name="password"  placeholder="请输入登录密码" value=""/></div>
        <div class="item pwd">
          <div style="width:4.5rem;">验证码</div>
          <input type="text" placeholder="请输入验证码" v-model="validatecode" name="ValidateCode" style="width:86px; margin-top: 1px;margin-right:1px;"/>
          <img :src="imgDataUrl">
          <a @click="preview()" style="vertical-align: 8px;color:red; font-size:12px; text-decoration:none;line-height:22px;vertical-align:middle;margin-left:4px;"> 看不清<br />换一张</a>
        </div>

        <div class="autologin" style="margin-top: 10px;">
          <div class="autol-right"><label class="autoL"><input style="width:14px;height:14px;vertical-align:text-top;" type="checkbox" @click="clicked = ! clicked" />自动登录</label> </div>
        </div>
        <p v-model="errortext" class="tipError">{{errortext}}</p>
        <div class="item login">
          <button @click="btnLogin" class="btn-submit" style="margin-bottom: 0rem;" type="button"> 登 录 </button>
        </div>
        <div class="other">
          <router-link :to="{path: '/register'}">
            免费注册
          </router-link>
          <a href="forget_LoginPasswords.html">忘记密码？</a></div>
      </div>
    </form>
  </div>


</template>

<script>
  export default {
      data(){
          return{
              imgDataUrl:this.HOST +'/Member/ValidateCode.aspx',
              clicked:false,
              uName:'',
              password:'',
              validatecode:'',
              errortext: '',
          }
      },
    http: {
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    },
    methods:{
      //点击变换验证码
      preview(){
        this.imgDataUrl = this.HOST +'/Member/ValidateCode.aspx?sid=' + Math.random();
      },
      btnLogin(){

        var uName = this.uName;
        var password = this.password;
        var validatecode = this.validatecode;

        if (uName.length == 0) {
          this.errortext="账号不可以为空";
          return false;
        }

        if (password.length == 0) {
          this.errortext="密码不能为空";
          return false;
        }
        if (validatecode.length == 0) {
          this.errortext="验证码不能为空";
          return false;
        }
        let url=this.HOST +'/Member/Login.aspx';
        this.$http.post(url,{
          UserName: uName,
          UserPass: password,
          ValidateCode: validatecode,
          AutoLogin: ''
        },{emulateJSON: true}).then((response) => {
          response = response.body;
          console.log(response)
          if(response.status===true){
            window.location = '/personal_index';
          }
          this.preview();
         // verification="";
        }, response => {
          // error callback
          this.preview();
          //verification="";
        });
        return false;
      }
    }

  };
</script>
