<template>
  <div style="background-color:#F0F0F0;">
    <div class="head_01">
      <a href="javascript:history.go(-1);" class="go-home" target="_self">
        <i class="icon iconfont">&#xe62b;</i>
      </a>
      <div class="tit" >
        <h3>手机绑定</h3>
      </div>
    </div>
    <form class="pwd-margin">
      <div class="container" >
        <div class="item pwd" style="margin-top:0.5rem;"><div>手机号码 </div><input v-model="Mobile"  type="number" placeholder="请重新输入手机号码" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')"/></div>
        <p class="red-t center-t"><b v-model="tipsError">{{tipsError}}</b></p>
        <div class="item login">
          <button @click="submit_phone" class="btn-submit" type="button">提交</button>
        </div>
      </div>
    </form>
    <div class="md-overlay" v-if="delFlag" v-model="msg">{{msg}}</div>
  </div>
</template>

<script type="text/ecmascript-6">
export default{
    data(){
        return{
          Mobile:'',
          tipsError:'',
          delFlag:false,
          msg:''
        }
    },
  created() {
    let url = this.HOST + '/Member/GetMemberMobile.aspx';
    this.$http.post(url).then((response) => {
      response = response.body;
      if(response.status===true){
        this.Mobile=response.data
      }
    }, response => {
      // error callback
    });
  },
  methods:{
    submit_phone(){
      let telenphone=this.Mobile;
      if(telenphone.length==0){
        this.tipsError="手机号码不能为空！";
          return false
      }
      if (!(/^1[0-9]{10}$/.test(telenphone))) {
        this.tipsError="输入的手机号格式不正确";
        return false;
      }
      let url = this.HOST + '/Member/BindMobile.aspx';
      this.$http.post(url,{Mobile: telenphone}).then((response) => {
        response = response.body;
        if(response.status===true){
          this.tipsError="手机绑定成功！";
          this.delFlag=true;
          this.msg=response.msg;
          setTimeout(() => {this.msg=""; this.tipsError="";this.delFlag=false;}, 2000);
        }
      }, response => {
        // error callback
      });
    }
  }
}
</script>

<style scoped>
  /*设置密码/修改密码*/
  .pwd-margin{margin-top:2.95rem;position:absolute;}
  form .container .pwd {display: -webkit-box; display: -ms-flexbox; display: flex; padding-left: 1rem; box-sizing: border-box; background-color: #fff; border: 1px solid #ccc;  }
  .center-t label {font-size: 0.75rem;  min-height: 1.8rem;  font-weight: 600;  margin-top: 10px;  }
  .red-t{color: red;}
</style>
