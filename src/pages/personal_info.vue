<template>
<div  v-model="info">
  <div class="head_01">
    <a href="javascript:history.go(-1);" class="go-home" target="_self">
      <i class="icon iconfont">&#xe62b;</i>
    </a>
  <div class="tit">
    <h3>个人信息</h3>
  </div>
  <!--<div class="nav">
            <ul>
                <li class="cart">
                    <a href="#" target="_self"><i class="fa fa-shopping-cart"></i></a>
                </li>
            </ul>
        </div>-->
  </div>
  <div class="user-info_01">
    <p>用户ID：<span>{{info.MemberID}}</span></p>
    <p>用户名：<span>{{info.MemberName}}</span></p>
  </div>
  <form class="form-info" >
    <div class="container">
      <div class="item pwd border-line other-tit">分销渠道信息:</div>
      <div class="item pwd border-line"><div>渠道类别</div>
        <select class="q-method" v-model="aa" @change="selectHospital($event)">
          <option selected>&#45;&#45;请选择分销渠道</option>
          <option :value="item.ID" v-for="(item,index) in info.ChannelList" >{{item.ChannelName}}</option>
        </select>
      </div>
      <div class="item pwd border-line">招商员编号:<span id="zsybh"></span></div>
      <!--<div class="item pwd"><lable>其&nbsp;&nbsp;他 </lable><input id="otherChannel" type="text" placeholder="请输入其他渠道"/></div>-->
      <div class="item pwd border-line other-tit">联系方式：</div>
      <div class="item pwd border-line"><div>邮&nbsp;&nbsp;箱 </div><span style="padding-left: 10px;width: 100%;">{{info.Email}}</span></div>
      <div class="item pwd border-line"><div>微&nbsp;&nbsp;信 </div><input  type="text" placeholder="请输入微信号" :value="info.WeChat"/></div>
      <div class="item pwd"><div>&nbsp;&nbsp;QQ </div><input type="text" placeholder="请输入QQ号码" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" :value="info.QQ"/></div>
      <p class="red-t center-t"><label style="display:none;"> * 错误提示信息 *</label></p>
      <div class="item login">
        <button class="btn-submit" type="button" @click="btn_submit">保存</button>
      </div>
    </div>
  </form>
</div>
</template>

<script type="text/ecmascript-6">
  export default{
    data() {
      return{
        info:[],
        aa:''
      }
    },
    created() {
      let url = this.HOST + '/Member/MemberInformation.aspx';
      this.$http.post(url).then((response) => {
        response = response.body;
        console.log(response);
        if(response.status===true){
          this.info=response.data
        }
      }, response => {
        // error callback
      });
    },

    methods:{
      selectHospital(e){
        this.hospitalId=e.target.value;
        console.log(e);
        console.log(e.target);
        console.log(e.target.value);
      },
      btn_submit(){
        let Senddata = {
          WeChat:this.info.WeChat,
          QQ: this.info.QQ,
          ChannelID: this.aa,
          ZhaoShangYuanID: "",
          ProvinceID: "",
          CityID: "",
          Address: "",
          Sex: ""
        };
        let url = this.HOST + '/Member/EditMemberInformation.aspx';
        this.$http.post(url,Senddata).then((response) => {
          response = response.body;
          console.log(response);
          if(response.status===true){
            this.info=response.data
          }
        }, response => {
          // error callback
        })
      }

    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  /*个人信息样式*/
  .form-info{margin-top:7.45rem;position:absolute;}
  .user-info_01{margin-top:3.35rem;position:absolute;height: 4.0rem;background-color:#fff;padding:0.5rem;box-sizing:border-box;width:100%;line-height:1.6rem;}
  .other-tit{margin-top:1.5rem;border-top:0px;border-top-left-radius:0.5rem;border-top-right-radius: 0.5rem;font-weight:700;}
</style>
