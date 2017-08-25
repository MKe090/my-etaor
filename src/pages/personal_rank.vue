<template>
  <div>
    <div id="" class="head_01">
      <a href="javascript:history.go(-1);" class="go-home" target="_self">
        <i class="icon iconfont">&#xe62b;</i>
      </a>
      <div class="tit" style="">
        <h3>会员等级</h3>
      </div>

    </div>
    <div class="user_view" v-model="rank">

      <div class="box">
        <div class="list_nav">
          <ul>
            <li class="items">
              <div class="un">会员等级：<span class="red-t-1">{{rank.MemberLevel}}</span></div>
            </li>
            <li class="items">
              <div class="un">到期时间：<span class="red-t-1">{{rank.LastVipTime}}</span></div>
            </li>
            <li class="items">
              <div class="un">账户积分：<span class="red-t-1">{{rank.Credit}}</span></div>
            </li>

          </ul>
          <ul style="padding-bottom:1.0rem;">
            <table cellpadding="2" cellspacing="2" width="100%" class="table-rank">
              <tr>
                <th>会员级别</th>
                <th>等级积分（分）</th>
              </tr>
              <tr>
                <td>普通会员</td>
                <td>0</td>
              </tr>
              <tr>
                <td>银牌会员</td>
                <td>8000</td>
              </tr>
              <tr>
                <td>金牌会员</td>
                <td>20000</td>
              </tr>
            </table>
            <div class="select-rank">
              购买等级：
                <select class="rank-select" @change="rankSelect($event)">
                  <option value="0">--请选择会员等级--</option>
                  <option value="1">普通会员</option>
                  <option value="2">银牌会员</option>
                  <option value="3">金牌会员</option>
                </select>
            </div>
            <button @click="gobuy" class="btn-submit" style="margin-bottom: 0rem;" type="button"> 购买 </button>
            <div class="tipError" style="color:red;font-size:0.875rem;margin-top:5px;" v-model="tipError">{{tipError}}</div>

          </ul>

        </div>
      </div>
    </div>
    <div class="md-overlay" v-if="delFlag" v-model="msg">{{msg}}</div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Toast } from 'mint-ui';
export default{
    data(){
        return{
          rank:[],
          rankid:'',
          tipError:'',
          delFlag:false,
          msg:''
        }
    },
  created() {
    let url = this.HOST + '/Member/MemberInformation.aspx';
    this.$http.post(url).then((response) => {
      response = response.body;
      console.log(response);
      if(response.status===true){
        this.rank=response.data
      }
    }, response => {
      // error callback
    });

  },
  methods:{
    rankSelect(e){
      this.rankid=e.target.value;
    },
    aa(response){
      this.tipError=response.msg;
      this.delFlag=true;
      this.msg=response.msg;
      setTimeout(() => {this.msg="";this.tipError="";this.delFlag=false;}, 2000);
    },
    gobuy(){
       // let instance = Toast('提示信息');
        let rankid=this.rankid;
        if(rankid == 0){
          this.tipError="请选择会员等级";
          return false;
        }
       // alert(this.rankid)
      let url = this.HOST + '/Member/MemberBuyLevel.aspx';
      this.$http.post(url,{ID: rankid}).then((response) => {
        response = response.body;
        let instance = Toast(response.msg);
        if(response.status===true){
          this.tipError="";
          //this.aa(response);
          this.rankid="0";
          this.$router.push({path: '/personal_rank'})
          setTimeout(() => {
            instance.close();
          }, 2000);
        }else{
          //this.aa(response);
          setTimeout(() => {
            instance.close();
          }, 2000);
          this.rankid="0";
        }
      }, response => {
        // error callback
      });
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  /*会员等级样式*/
  .table-rank {border: 0;font-size:0.875rem;color:#333;}
  .table-rank td,th{text-align: center;vertical-align: middle;line-height:1.8rem;border:1px solid #ddd;}
  .table-rank th{line-height:2.0rem;font-weight:800;}
  .user_view .box .select-rank {width:100%;margin:2.0rem 0.5rem;}
  .user_view .box .select-rank select{font-family: "微软雅黑";line-height:1.2rem;padding:0.2rem;border:1px solid #ddd;}
  .rank-select{width:50%;font-size: 1.0rem;line-height: 1.2rem;padding:0.5rem;}
  .md-overlay{background: rgb(102, 102, 102); position: fixed; z-index: 10;width: 180px; left: 50%;top: 50%; margin-top: -25px; margin-left: -90px; opacity: 0.9; border-radius: 5px; text-align: center;color: rgb(255, 255, 255); padding: 20px; font-size: 16px; font-weight: 600; line-height: 18px;}
</style>
