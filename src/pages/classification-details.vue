<template>
  <div>
    <!--搜索框start-->
    <div class="search-content-div clearfix">
      <a href="javascript:history.go(-1);"><div class="fl dx-h5-logo"><i class="fa fa-angle-left font-20"></i></div></a>
      <input class="search-input" type="text" placeholder="请输入商品/品牌分类进行搜索" value="" id="search" style="left:12%">
      <i class="fa fa-search fl h5-serch" style="right:10%"></i>
    </div>
    <!--搜索框end-->
    <div class="fl-brand clearfix">
      <p>品牌:</p>
      <ul class="fl-up" :class="classObject" id="xq-hpn">
        <!--jiekou-->
        <li v-for="item in details">
          <router-link :to="{path: '/classification_detail/'+item.BrandID}">{{item.BrandName}}</router-link>
        </li>
      </ul>
      <div @click="showAll = !showAll" class="xq-btn"><b id="dx-title">{{word}}</b><i class="fa fa-angle-double-down margin-5" :class="{ 'fa fa-angle-double-up': showAll }" id="dx-icon"></i></div>
    </div>
    <!--品牌展示start-->
    <div class="h5-commodity-introduction clearfix" style="padding-bottom: 0px;" id="wrapper">
      <v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite" :dataList="scrollData">
        <ul class="clearfix" style="padding-top: 20px;">
              <!--商品1-->
              <li style="margin-left: 1%;"  v-for="item in listProduct">
                <router-link :to="{path: '/detail/'+item.ID}">

                  <div class="h5-commodity-content">
                    <img v-bind:src="'http://www.etaor.com/' + item.ImagesOne">
                    <div class="new-discount-content">
                      <div class="h5-new-discount-price">
                        <div class="h5-resent-price fl"><i>¥</i>{{item.SellPriceNormal}}</div>
                        <div class="h5-riginal-price fr"><i>¥</i>{{item.ProductPrice}}</div>
                      </div>
                      <div class="h5-new-discount-font">
                        <span>{{item.ProductName}}</span>
                      </div>
                      <div class="address-info">
                        <div><span></span>{{item.WareHouseName}}</div>
                      </div>
                    </div>
                  </div>
                </router-link>
              </li>
          </ul>
      </v-scroll>
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
        return{
          kaiguan:0,
          PageIndex:1,//当前页
          pageSize:10,// 一页显示多少条
          SubClassID:'',
          details:[],
          listProduct:[],
          showAll:false,
          scrollData: {
            noFlag: false //暂无更多数据显示
          }
        }
    },
    mounted(){
      this.aa();  //初次访问查询列表
    },
    methods:{
      aa() {
          let id=this.$route.params.type;
          console.log(id)
          this.SubClassID=id
          let url=this.HOST +'/Product/GetProductList.aspx';
          let searchCondition={PageIndex:this.PageIndex,pageSize:this.pageSize,SubClassID:this.SubClassID};
          this.$http.post(url,searchCondition,{emulateJSON: true}).then((response) => {
            response = response.body;
            console.log(response);
            if(response.status===true){
              this.details=response.data.model.listBand;
              if(!this.kaiguan){
                this.listProduct=response.data.model.listProduct;
              }else{
                this.listProduct=_.union(this.listProduct,response.data.model.listProduct);
                let more = this.$el.querySelector('.load-more');
                if(_.isEmpty(response.data.model.listProduct)){
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
        this.PageIndex=1;
        this.kaiguan=0;
        this.aa();
        done(); // call done
      },
      onInfinite(done) {
        this.PageIndex++;
        this.kaiguan=1;
        this.aa();
        done();
        //this.listProduct=[];
        //判断是否为空
        if(_.isEmpty(this.listProduct)){
          this.scrollData.noFlag = true;
        }
      }
  },

  computed:{
    classObject: function () {
      return {
        'fl-brand-ul': this.showAll,
      }
    },
    word:function(){
      if(this.showAll == false){　　　　　　　　　　　//对文字进行处理
        return '展开'
      }else{
        return '收起'
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  /*分类商品详情页start*/
  a{color :#666!important}
  .showall {padding: 10px;height: 300px;overflow: hidden;clear: both;background: #f5f5f5;margin-top: 6px}
  .imgbtn {border-top: 1px solid #ccc; margin-top: 6px;margin-bottom: 10px}
  .fa-angle-double-up:before {content: "\f102";}
  .fl-brand {background: #fff;padding-top: 5px;position: fixed;z-index: 99999;top: 46px;width: 100%;}
  .fl-up {height: 50px;overflow: hidden;width :60%;}
  .fl-brand ul li {float: left;font-size: 14px; height: 20px; margin-right: 15px;margin-bottom: 5px;text-align: center;line-height: 20px;color: #666;}
  .fl-brand p{font-size: 16px;float: left;width: 50px;text-align: center;color: #777;margin-top: 3px;}
  .fl-warehouse p{height:30px;line-height:30px;}
  .fl-warehouse ul li{border:none;width: 60px;}
  .fl-warehouse ul li :hover{color:red;}
  .fl-brand-ul{width: 60%; height: 520px;overflow: auto;float: left;}
  .xq-shoucan{ margin: 0 10px;color: #ba393a;}
  .xq-pro{width: 27%;margin: 5px 0 5px 5px;}
  .xq-pro img{width: 80px;height: 80px;overflow: hidden;}
  .xq-list_nav{background: #fff;height: 95px;margin-bottom: 10px;}
  .xq-title{width: 70%;margin: 5px 0px;}
  .xq-title h5{font-size: 13px;color: #666;line-height: 18px;height: 45px;}
  .xq-title .xq-pro-price{color: #ba393a;font-size: 18px;line-height: 30px;margin-left: 10px;}
  .xq-list{margin-left: 15px;height: 85px;margin-bottom: 10px;}
  .xq-btn{font-size: 12px;color: #666;text-align: center;border: 1px solid #ba393b;width: 64px;border-radius: 15px;height: 21px;position: absolute;right: 20px;top: 30px;}
  #dx-title{display: block;float: left;width: 36px;text-align: center;margin: 0 auto;text-align: right;line-height: 20px;}
  #dx-icon{float: left;display: block;width: 16px;text-align: left;line-height: 21px;}

  /*分类商品详情页end*/
</style>
