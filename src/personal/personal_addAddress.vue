<template>
  <div>
    <div class="head_01">
      <a href="javascript:history.go(-1);" class="go-home" target="_self">
        <i class="icon iconfont">&#xe62b;</i>
      </a>
      <div class="tit" >
        <h3>新增收件人地址</h3>
      </div>
    </div>
    <form class="pwd-margin" id="addressInfo">
      <div class="container">
        <div class="item acount"><div>收件人名</div><input v-model="rname" type="text" placeholder="请输入收件人名" /></div>
        <div class="item pwd"><div>手机号码</div><input v-model="rmobile" type="text" placeholder="请输入手机号码" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" /></div>
        <div class="item pwd"><div style="width: 40%">所在省份</div>
          <select  @change="selectPo($event)">
            <option value="0" >--选择省份--</option>
            <option  v-for="(item, index) in province" :value="item.provinceid">{{item.provincename}}</option>
          </select>

        </div>
        <div class="item pwd">
          <div style="width: 40%">所在城市</div>

          <select @change="SelectCity($event)">
            <option  v-model="selectCi" value="0">--选择城市--</option>
            <option v-for="(item, index) in positioncity" :value="item.id">{{item.cityname}}</option>

          </select>
        </div>
        <div class="item pwd"><div style="width: 40%">详细地址 </div><input v-model="detailAddress" type="text" placeholder="请输入详细地址" /></div>

        <div class="item pwd"><input type="checkbox" style="margin-top: 16px;width:20px;" v-model="item.state" v-on:click="IsDefault(item)"/>设为默认地址{{item.state}}</div>

        <div class="red-t center-t">
          <p class="tipError" v-model="tipError">{{tipError}}</p>
        </div>
        <div class="item login">
          <button @click="saveAddress" class="btn-submit" type="button">保存</button>
        </div>
      </div>
    </form>
    <div>

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default{
    data(){
        return{
          province:[],
          selectCi:'',
          rname:'',
          rmobile:'',
          curr_poId:'',
          cityval:'',
          detailAddress:'',
          checkedNames:'',
          positioncity:[],
          tipError:'',
          item: [{
            state: false
          },{
            state: true
          }]
        }
    },
  created() {
    /* let pageIndex = 1;
     let pageSize = 4;*/
    let url = this.HOST + '/Common/GetPositionProvince.aspx';
    this.$http.post(url).then((response) => {
      response = response.body;
      if(response.status===true){
        this.province=response.data.list;
      }
    }, response => {
      // error callback
    });
  },
  methods:{
    selectPo(e){
      let selectCielem = this.selectCi;
      let curr_poId =e.target.value;
      this.curr_poId =e.target.value;
      if (curr_poId == 0) {
        selectCielem.empty();
        selectCielem="选择城市"
        return false;
      }
      let url = this.HOST + '/Common/GetPositionCity.aspx';
      this.$http.post(url,{ProvinceID: curr_poId}).then((response) => {
        response = response.body;
        if(response.status===true){
          this.positioncity=response.data.list;
        }
      }, response => {
        // error callback
      });

    },
    SelectCity(e){
      this.cityval =e.target.value;
    },
    IsDefault(item){
      item.state = !item.state;
    },
    saveAddress(){
      let rName = this.rname;
      let rmobile = this.rmobile.trim();
      let selectPoId = this.curr_poId.trim();
      let selectCiId = this.cityval.trim();
      let detailAddress = this.detailAddress.trim();
      let IsDefault = this.item.state;
      if (rName.length == 0) {
        this.tipError="账号不可以为空";
        return false;
      }
      if (rmobile.length == 0) {
        this.tipError='手机号码不能为空';
        return false;
      }
      if (selectPoId == 0) {
        this.tipError='请选择所在省份';
        return false;
      }
      if (selectCiId == 0) {
        this.tipError='请选择所在城市';
        return false;
      }
      if (detailAddress.length == 0) {
        this.tipError='详细地址不能为空';
        return false;
      }
      let url = this.HOST + '/Member/AddMemberReceiver.aspx';
      this.$http.post(url,{
        ProvinceID: selectPoId,
        CityID: selectCiId,
        Receiver: rName,
        Address: detailAddress,
        Mobile: rmobile,
        IsDefault: IsDefault
      }).then((response) => {
        response = response.body;
        if(response.status===true){
         alert(11);
          this.$router.push({path: '/receipt_address'})
        }
      }, response => {
        // error callback
      });

    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #selectPo,#selectCi{height:2.8rem;width:100%;}
  select, option { border: none;background-color: #fff;color: #666;}
</style>
