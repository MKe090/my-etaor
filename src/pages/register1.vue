<template>
  <div>
    <div class="head_01">
      <a href="javascript:history.go(-1);"><div class="fl dx-h5-logo"><i class="fa fa-angle-left font-20"></i></div></a>
      <div class="tit">
        <h3>用户注册</h3>
      </div>
    </div>
    <form class="pwd-margin" @submit.prevent="validateBeforeSubmit">
      <div class="container">
        <div class="item acount border-line"><div><span class="red">*</span>账 户 </div>
          <input name="name" v-model="name" v-validate="'required|alpha'" :class="{'input': true, 'is-danger': errors.has('name') }" type="text" placeholder="请输入账户名称">
        </div>
        <div class="item pwd border-line"><div><span class="red">*</span>密 码 </div>
          <input placeholder="请输入密码" type="password" name="pwdnew"
                 maxlength="20" autocomplete="off" v-validate="'required|min:9|max:20|alpha_num'" :class="{'is-danger-input': errors.has('pwdnew')}"v-model="pwdnew">
        </div>
        <div class="item pwd border-line"><span class="red">*</span><div>确认密码 </div>
          <input placeholder="请再次输入密码" type="password" name="cmdnew"
                 maxlength="20" autocomplete="off"  v-validate.initial="'required|confirmed:pwdnew'" :class="{'is-danger-input': errors.has('pwdnew')}"v-model="cmdnew">
        </div>
        <div class="item pwd border-line"><div><span class="red">*</span>手 机 </div>
          <input name="phone" v-model="phone" v-validate="'required|numeric'" :class="{'input': true, 'is-danger': errors.has('phone') }" type="text" placeholder="请输入手机号码">
        </div>
        <div class="item pwd border-line"><div><span class="red">*</span>邮 箱 </div>
          <input name="email" v-model="email" v-validate="'required|email'" :class="{'input': true, 'is-danger': errors.has('email') }" type="text" placeholder="请输入邮箱地址">
        </div>
        <div class="item pwd border-line">
          <div style="width:4.5rem;"><span class="red">*</span>验证码</div>
          <input type="text" placeholder="请输入验证码" name="ValidateCode" style="width:86px; margin-top: 1px;margin-right:1px;" />
          <img :src="imgDataUrl">
          <a  @click="preview($event)" style="vertical-align: 8px;color:red; font-size:12px; text-decoration:none;line-height:22px;vertical-align:middle;margin-left:4px;"> 看不清<br />换一张</a>
        </div>
        <div class="item pwd border-line"><div style="width: 8.0rem;">欧渠通账户 </div><input type="text"  name="oqt" placeholder="请输入欧渠通账户" value="" /></div>
        <div class="item pwd">
          <div>招商员ID </div>
          <select type="select" id="zsyID" style="width: 65%;border: 0px;margin-left: 10%;">
            <option value="0">&#45;&#45;请选择招商员ID&#45;&#45;</option>
            <option  v-model="verification"  :value="item.id" v-for="item in merchants">{{item.AdminName}}</option>

          </select>
        </div>
        <div class="protocol"><div><input id="agree" type="checkbox"  @click="clicked = ! clicked"/>我已经阅读并同意</div><a href="login_protocol.html">《欧渠通用户协议》</a></div>
        <div>
          <p v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</p>
          <p v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</p>
          <p v-show="errors.has('phone')" class="help is-danger">{{ errors.first('phone') }}</p>
          <p v-show="errors.has('pwdnew')" class="help is-danger">{{ errors.first('pwdnew') }}</p>
          <p v-show="errors.has('cmdnew')" class="help is-danger">{{ errors.first('cmdnew') }}</p>
        </div>
        <div class="item login">
          <button :class="clicked?'btn-submit':'btn-submit2'"  type="submit" >注册</button>

        </div>
        <div class="item other"><a href="../login/login.html">已有账号，请登录</a></div>
      </div>
    </form>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'form-example',
    data: () => ({
      imgDataUrl: 'http://www.etaor.com/WebService/Member/ValidateCode.aspx',
      merchants:[],
      clicked:false,
      email: '',
      name: '',
      phone: '',
      url: '',
      pwdnew:'',
      cmdnew:'',
      code:'',
      verification:'verification'
    }),
    created() {
      var url1=this.HOST +'/Member/GetZhaoShangYuan.aspx';
      this.$http.post(url1).then((response) => {
        response = response.body;
        console.log(response)
        if(response.status===true){
          this.merchants=response.data
        }
      }, response => {
        // error callback
      });
      this.validateBeforeSubmit();
    },
    methods: {
      validateBeforeSubmit() {
        console.log(this.email)
        console.log(this.verification)
        console.log(this.$validator.validateAll())
        var name=this.name;
        var pwdnew=this.pwdnew;
        var email=this.email;
        var phone=this.phone;
        this.$validator.validateAll().then(() => {
          let url=this.HOST +'/Member/Register.aspx';
          this.$http.post(url,{
            UserName: name,
            UserPass: pwdnew,
            Email: email,
            Mobile: phone,
            ValidateCode: '8kpc',
            ZhaoShangYuanID: 'zhiqiu',
            OuquTong: '111'
          }).then((response) => {
            response = response.body;
            console.log(response)
            if(response.status===true){
              this.filterAddress=response.data
            }
          }, response => {
            // error callback
          });
          // eslint-disable-next-line
          /*UserName: formData[0].value,
           UserPass: formData[1].value,
           Email: formData[4].value,
           Mobile: formData[3].value,
           ValidateCode: formData[5].value,
           ZhaoShangYuanID: $("#zsyID").val().trim(),
           OuquTong: $("#oqt").val().trim()*/
          //alert('From Submitted!');
        }).catch(() => {
          // eslint-disable-next-line
          //alert('Correct them errors!');
        });
      },
      //点击变换验证码
      preview(event){
        this.imgDataUrl = 'http://www.etaor.com/WebService/Member/ValidateCode.aspx?sid=' + Math.random();
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  a,img,button{-webkit-tap-highlight-color:rgba(255,255,255,0);}
  *{ -webkit-tap-highlight-color: rgba(0,0,0,0);-webkit-tap-highlight-color: transparent; /* For some Androids */ }

  a {
    -webkit-touch-callout: none;
    -webkit-user-select: none;-webkit-appearance:none;
  }
  select,option{border:1px solid #ddd;background-color:#fff;color:#666;}
  html{font-size: 100%;}
  form{width:100%;min-height: 500px;}
  form>.container{width:100%;  }
  form .container .item{
    width: 100%;
    min-height: 2.8rem;
    line-height: 2.8rem;}
  form .container .title{
    border-bottom: 1px solid #C8C8C8;
    color: #000;
    text-align: center;
    background-color: #F7F7F8;
  }
  form .container .acount{
    display: -webkit-box;display: -moz-box;display: -ms-flexbox;display: -webkit-flex;display: flex;
    padding-left:1.0rem;box-sizing:border-box;background-color:#fff;padding-top :45px;}
  form .container .pwd{
    display: -webkit-box;display: -moz-box;display: -ms-flexbox;display: -webkit-flex;display: flex;

    padding-left:1rem;box-sizing:border-box;background-color:#fff;}
  form .container .login{padding-top: 0.5rem;}
  .btn-submit{margin-top:10px;margin-bottom:2.0rem;height: 2.5rem;width:100%;background-color:#B1191A;border:1px solid #B1191A;font-size:1.0rem;color:#fff;font-family:"微软雅黑";}
  .btn-submit2{margin-top:10px;margin-bottom:2.0rem;height: 2.5rem;width:100%;background-color:#e6e6e6;border:1px solid #e6e6e6;font-size:1.0rem;color:#fff;font-family:"微软雅黑";}

  form .container .other>a:nth-child(2) {float: right;position: relative;}
  form .container .item > input,.q-method{border: 0;padding-left:10px;font-family:"微软雅黑";font-size:.875rem; margin-left: 6%;}
  form .container lable{width:6.0em;display: inline-block;}
  form .container .other{box-sizing:border-box;padding:5px 12px;}
  form .container .other>a{font-size: .8rem;}
  form .border-line{border-bottom:1px solid #ddd;}
  .center-t{display:inline-block;padding-left:0.5rem;min-height:1.8rem;font-weight:600;margin-top:10px;}
  .center-t p{margin-top:10px;font-size: 13px; color: red;}
  /*注册样式*/
  form .protocol{font-size: .875rem;margin: 10px 10px 2px 10px;}
  form .protocol a{color:#007AFF;}
  .red{color:red;}
  .head_01{height: 2.85rem;width: 100%;line-height: 2.85rem;color:#fff;background:#B1191A;position:fixed;z-index: 999;}
  .head_01 .go-home{margin-left:0.5rem ;position: absolute;z-index: 9999;/*width: 2.5rem;*/font-size:1.55rem;}
  .head_01 .tit{display: inline-block;text-align: center;width: 70%;position: absolute;z-index: 8888;}
  .head_01 .tit h3{width: 100%;text-align: center;position:relative;z-index: 8888;font-size: 1.05rem;line-height: 2.85rem;}
</style>
