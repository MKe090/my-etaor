<template>
<div>
  <!--顶部导航start-->
  <div class="search-content-div clearfix">
    <a href="javascript:history.go(-1);" class="fl dx-h5-logo">
      <i class="icon iconfont">&#xe62b;</i>
    </a>
    <div class="dz-sign-in">收货地址</div>
    <button type="button" class="item-submit" @click="addperson"><i class="fa fa-plus margin-right-5"></i>新增</button>
  </div>
  <!--顶部导航end-->
  <!--有地址显示start-->
  <v-scroll style="top: 40px;" :on-refresh="onRefresh" :on-infinite="onInfinite" :dataList="scrollData">

    <!--地址1start-->
    <div class="address row" v-for="(item, index) in address" >
      <div class="item-addr bdb-1px">
        <div class="ia-m m ia-m78">
          <div class="mt_new">
            <span>{{item.Receiver}}</span>
            <strong class="phone">{{item.ContactTel}}</strong>
          </div>
          <div class="mc">
            <p>{{item.provincename+item.cityname+item.Address}}
            </p>
          </div>
        </div>
      </div>
      <div class="clearfix sh-write">
        <div class="item-bottom clearfix fl sh-item-bottom" style="width: 50%;">
          <div class="default-address">
            <label class="m-checkbox clearfix">
	                        <span class="box fl xz-selected">
                            	<div class="xz-unchecked">
									<i class="fa fa-check"></i>
                            	</div>
	                        </span>
              <span class="margin-5 fl" style="margin-top: -2px;">默认地址</span>
            </label>
          </div>
        </div>
        <div class="fl xz-address">
          <a class="ia-r" href="add-address.html">
            <i class="fa fa-pencil-square-o"></i>
            <span class="addsedit">编辑</span>
          </a>
        </div>
        <div class="delete_box sh-delete_box fr">
          <span class="delete_up"></span>
          <span class="delete_down"></span>
          <span class="del">删除</span>
        </div>
    </div>
    <!--地址1end-->
  </div>
  </v-scroll>
  <!--确定删除弹框start-->
 <!-- <div class="jd_win">
    <div class="jd_win_box">
      <div class="jd_win_tit">你确定删除该商品吗？</div>
      <div class="jd_btn clearfix">
        <a href="#" class="cancle fl">取消</a>
        <a href="#" class="submit fr">确定</a>
      </div>
    </div>
  </div>-->
  <!--确定删除弹框end-->
  <!--地址2end-->
  <div class="xz-button">
    <a href="add-address.html" target="_self">
    </a>
  </div>
  <!--有地址显示end-->
  <!--没有收货地址start-->
  <div style="padding-top: 45%; display: none;">
    <div class="xz-icon">
      <img src="../assets/images/xz-icon.jpg" height="120" width="120"/>
    </div>
    <p class="xz-receiving-address">您还没收货地址哦！</p>
    <a href="add-address.html" target="_self">
      <div class="xz-new-address">新建地址</div>
    </a>
  </div>
</div>
</template>
<script type="text/ecmascript-6">
  import VScroll from '../components/scroll.vue'
  export default {
    components: {
      VScroll
    },
    data() {
      return {
        kaiguan:0,
        address:[],// 下拉更新数据存放数组
        items: [],
        pageIndex: 1, //当前页
        pageSize: 4, // 一页显示多少条
        scrollData: {
          noFlag: false //暂无更多数据显示
        }
      }
    },
    mounted: function() {
      this.getList();
    },
    methods: {
      getList(){
        let url = this.HOST + '/Member/MemberReceiveList.aspx';
        this.$http.post(url,{PageIndex: this.pageIndex,PageSize: this.pageSize},{emulateJSON: true}).then((response) => {
          response = response.body;
          if(response.status===true){
            if(!this.kaiguan){
              this.address=response.data.list;
            }else{
              this.address=_.union(this.address,response.data.list);
              let more = this.$el.querySelector('.load-more');
             if(_.isEmpty(response.data.list)){
               more.style.display = 'none'; //隐藏加载条
               this.scrollData.noFlag = true;
              }
            }
            this.kaiguan=0;
          }
        }, response => {
          // error callback
          this.kaiguan=0;
        });

      },
      onRefresh(done) {
        this.pageIndex=1;
        this.kaiguan=0;
        this.getList();
        done(); // call done
      },
      onInfinite(done) {
        this.pageIndex++;
        this.kaiguan=1;
        this.getList();
        done();
      },
      addperson(){
        this.$router.push({path: '/personal_addAddress'})
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .addsedit {font-size: 0.875rem;}
  .del {float: right;margin-top: -22px; font-size: 12px; position: relative; display: inline-block; width: 30px;}
  .default-address {margin-top: 10px;margin-left: 10px;width: 53%;float: left;}
  .addsedit {font-size: 12px;position: relative;display: inline-block;width: 30px;}
  .xz-address {width: 20%;text-align: center;font-size: 18px; margin-left: 10px;line-height: 38px;margin-top: 0px;}
  .sh-delete_box {width: 50px;}
  .del{position: relative;float: right;margin-top: -22px;}
  .telephone {position: relative;float: right;}
  .sh-write {border-bottom: 0;}
  .item-addr .ia-m {width: 90%;}
  .scroller ul { list-style: none;padding: 0;margin: 0;width: 100%;text-align: left; margin-top: 58px;}
  .pullDownIcon{margin-top:50px !important;}
  .pullDownLabel{padding-top: 45px !important;}
  .addsedit {font-size: 12px;position: relative;display: inline-block;width: 30px;  }
  /*地址管理*/
  .dz-sign-in{color: #fff;line-height:46px;font-size: 20px;text-align: center;width: 70%;margin: 0 auto;}
  .dx-h5-logo {color: #Fff;line-height: 46px; margin-left: 5px; width: 40px;}
  .item-submit{cursor: pointer;position: relative;left: 30px;top: -34px;
    border: none;background: none;color: #fff;font-size: 16px;float: right; margin-right: 50px;}
  /*收货地址样式start*/
  .xz-button{position: absolute;bottom: 10px;width: 90%;left: 5%;}
  .address {background: #FFF;margin-bottom: 10px;}
  .item-addr .ia-m {float: left;width: 80%;margin-left: 15px;color: #666;font-size: 16px;}
  .item-addr .ia-m p {color: #666;font-size: 13px;line-height: 24px;padding-top: 8px;}
/*  .xz-address{width: 12%;text-align: center;font-size: 20px;margin-left: 26px;line-height: 42px;margin-top: -5px;}*/
  .xz-icon img{width: 120px;height: 115px;margin: 0 auto;display: block}
  .xz-receiving-address{font-size: 20px;color: #666;margin: 0 auto;text-align: center;margin-top: 15px;}
  .xz-new-address{border: 1px solid #ccc;width: 26%;height: 40px;border-radius: 5px;text-align: center;line-height: 40px;margin: 0 auto;margin-top: 25px;font-size: 16px;}
  .sh-write{height: 42px;border-top: 1px solid #ccc;line-height: 21px;border-bottom: 1px solid #ccc;}
  .sh-delete_box{margin-right: 8px;margin-top: 12px;}
  .item-addr{height: 95px;padding-top: 15px;}
  .sh-item-bottom{width: 95%;font-size: 13px;color: #666;}
  .xz-selected{border: 1px solid #ccc;border-radius: 5px;width: 16px;height: 16px;}
  .xz-unchecked{display: none;font-size: 20px;color: #B1191A;margin-top: -5px;}
  .delete_box .delete_down {margin-top: -2px;width: 18px;height: 18px;display: block;background: url('../assets/images/delete_down.png');background-size: 16px 16px;}
  .delete_box .delete_up {
    width: 15px;
    height: 5px;
    display: block;
    background: url('../assets/images/delete_up.png');
    background-size: 16px 7px;
    margin-left: 0px;
  }
  /*收货地址样式end*/
</style>
