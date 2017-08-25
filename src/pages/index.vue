<template>
  <div id="app">
    <!--搜索框start-->
    <div class="search-content-div clearfix">
      <div class="fl h5-logo"><img src="../assets/images/logo.png"></div>
      <input class="search-input" type="text" placeholder="请输入商品/品牌分类进行搜索" id="search" value="">
      <i class="fa fa-search fl h5-serch"></i>
    </div>
    <!--搜索框end-->
    <div class="banner">
        <img src="../assets/images/banner1.jpg">
    </div>
    <!--正品start-->
    <div class="h5-product-content-info">
      <div class="h5-product-content-info-left clearfix">
        <div class="h5-left-info"><span class="h5-product-content-info-right">100%正品</span></div>
        <div class="h5-left-info-right"><span style="margin-left: 25px;" class="h5-product-content-info-right">7天内无忧退货</span></div>
      </div>
    </div>
    <!--正品end-->
    <!--正品end-->
    <div class="h5-commodity-introduction margin-top-20 clearfix" id="add">
      <!--新品特惠start-->
      <div class="h5-new clearfix">
        <div class="clearfix">
          <div class="h5-new-discount-title fl">推荐新品</div>
          <div class="h5-new-arrival fl">新品上市</div>
        </div>
        <!--商品1-->
        <div style="margin-left: 1%;"  v-for="goods in filterAddress">
          <!-- href="components/product-details.vue" target="_self" -->
          <router-link :to="{path: '/detail/'+goods.WareHouseProductID}">
            <div class="h5-commodity-content">
              <img v-bind:src="'http://www.etaor.com/' + goods.ImagesOne" style="width: 70%;height: 145px;">
              <div class="new-discount-content">
                <div class="h5-new-discount-price">
                  <div class="h5-resent-price fl"><i>¥</i>{{goods.SellPriceNormal}}</div>
                  <div class="h5-riginal-price fr"><i>¥</i>{{goods.ProductPrice}}</div>
                </div>
                <div class="h5-new-discount-font">
                  <span>{{goods.ProductName}}</span>
                </div>
                <div class="address-info">
                  <div><span></span>{{goods.WareHouseName}}</div>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>

      <div class="h5-new clearfix"  v-for="item in productList">
        <div>
          <div class="clearfix">
            <div class="h5-new-discount-title fl" v-for="title in item.listClass">{{title.ClassName}}</div>
          </div>
          <!--商品1-->
          <div style="margin-left: 1%;" v-for="details in item.listProduct">
            <router-link :to="{path: '/detail/'+details.WareHouseProductID}">
              <div class="h5-commodity-content">
                <img v-bind:src="'http://www.etaor.com/' + details.ImagesOne">
                <div class="new-discount-content">
                  <div class="h5-new-discount-price">
                    <div class="h5-resent-price fl"><i>¥</i>{{details.SellPriceNormal}}</div>
                    <div class="h5-riginal-price fr"><i>¥</i>{{details.ProductPrice}}</div>
                  </div>
                  <div class="h5-new-discount-font">
                    <span>{{details.ProductName}}</span>
                  </div>
                  <div class="address-info">
                    <div><span></span>法国</div>
                  </div>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <vs-footer></vs-footer>
  </div>
</template>

<script>
  import VsFooter from '../components/footer.vue'
  export default {
    components: {
      VsFooter
    },
    data() {
      return {
        filterAddress: [],
        productList:[],
      }
    },
    created() {
      var url=this.HOST +'/Product/GetProductListByNew.aspx'
      this.$http.post(url).then((response) => {
        response = response.body;
        console.log(response)
        if(response.status===true){
          this.filterAddress=response.data
        }
      }, response => {
        // error callback
      });
      var url2=this.HOST +'/Product/GetProductListByArea.aspx'
      this.$http.post(url2).then((res) => {
        res = res.body;
        console.log(res.data);
        if(res.status===true){
          this.productList=res.data
          //this.filterAddress=res.data
        }

      }, response => {
        // error callback
      });
    },
    methods: {
      aa(){
        this.$router.push({ path: '/ProductDetails' });
      }
    }
  }
</script>
<style lang="less">
  @import "../assets/font-awesome-4.5.0/css/font-awesome.min.css";
  /*首页样式start*/
  .mui-slider-item img{width: 100%;}
  .button {width: 44px;height: 28px;margin-top: 11px;border-radius: 5px;background: #fff;
    border: 1px solid #ddd;color: #666;font-size: 12px;text-align: center;color: #999;}
  .h5-new {margin-top: 5px;}
  .go-home .fa-home {color: #fff;font-size: 24px;line-height: 48px;}
  .banner img{width: 100%;margin-top: 46px;}
  .mui-slider-item img{width: 100%;}
  .search-content-div {background-color: #B1191A;height: 46px;position: fixed;z-index: 999;width: 100%;}
  .search-content-div .search-input {height: 30px;border: 2px solid #fff;float: left;width: 76%;outline: none;padding: 0 0px 0 10px;line-height: 30px;border-radius: 10px;font-size: 12px;position: absolute;left: 18%;top: 8px;}
  .search-content-div .search-input-btn {width: 50px;height: 36px;background-color: #B61D1D;float: left;text-align: center;cursor: pointer;}
  .hf-sign-in{color: #fff;line-height:50px;font-size: 14px;position: absolute;right: 15px;top: 0px;}
  .fl.h5-logo {width: 16%;position: absolute;top: 9px;left: 10px;}
  .h5-serch {position: absolute;top: 8px;right: 3%;color: #666;width: 50px;height: 30px;text-align: center;line-height: 30px !important;z-index:2;font-size: 18px !important;}
  .h5-logo img{width: 50px;height:24px;}
  .h5-product-content-info {width: 100%;height: 42px;line-height: 42px;margin: 0 auto;border-bottom: 1px  dashed #bbb;}
  .h5-product-content-info-right {font-size: 12px;color: #999999;float: left;}
  .h5-left-info {background: url("../assets/images/icon-zheng.png") no-repeat;margin-left: 5px;display: inline-block;margin-right: 15px;background-position: 0 10px;background-size: 20px;}
  .h5-left-info span {padding-left: 20px;}
  .h5-left-info-right {display: inline-block;background: url("../assets/images/icon-tui.png") no-repeat;background-position: 0 10px;background-size: 20px;}

  /*.h5-new{margin-bottom: 20px;}*/
  .h5-new-discount-title {width: 110px;height: 30px;background-color: #B1191A;color: #ffffff;font-size: 16px;font-weight: bold;text-align: center;line-height: 30px;display: inline-block;margin-left: 5px;}
  .h5-commodity-introduction{padding-bottom: 60px;background: #eee;}
  .h5-commodity-introduction a{float: left;display: block;width:49%;margin-right: 1%;}
  .h5-new-arrival{font-size: 14px;line-height: 30px;margin-left: 10px;color: #666;width: 190px;overflow: hidden;height: 30px;}
  .h5-commodity-content{border: 1px solid #ddd;margin-top: 5px;background: #fff;position: relative;overflow: hidden;}
  .h5-resent-price{font-size: 15px;color: #B1191A;font-weight: bold;}
  .h5-riginal-price{font-size: 15px;color: #7f7f7f;padding-top: 4px;text-decoration: line-through;}
  .h5-commodity-content img{width: 70%;margin: 0 auto;margin-left: 15%;overflow: hidden;height: 145px;}
  .h5-new-discount-price{width:90%;margin:0 auto;margin-top:2px;height:25px;}
  .h5-new-discount-font{font-size: 12px;line-height: 22px;color: #666;width: 90%;margin: 0 auto;height: 48px;overflow: hidden;margin-bottom:20px;}
  .address-info{font-size: 12px;float: right;margin-right: 5%;color: #666;position: absolute;right: 5px;bottom: 5px;}
  /*商品详情页end*/

</style>
