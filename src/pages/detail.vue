<template>
  <div>
    <!--顶部导航start-->
    <div class="search-content-div clearfix">
      <a href="javascript:history.go(-1);">
        <div class="fl dx-h5-logo">
          <i class="fa fa-angle-left font-20"></i>
        </div>
      </a>
      <div class="fr dx-sign-in">
        <i class="fa fa-share-alt"></i>
        <div class="bdsharebuttonbox">
          <div class="jiathis_style_32x32">
            <a href="#"></a>
          </div>
        </div>
      </div>
      <div class="fr dx-shopping-cart">
        <router-link to="/shopping_cart" @click.native="flushCom">
          <i class="fa fa-shopping-cart"></i>
          <span class="dx-radio">1</span>
        </router-link>
      </div>
    </div>
    <mt-swipe :auto="0" style="padding-top: 46px;height: 360px;" v-model="slides">
      <mt-swipe-item v-if="slides.ImagesOne!==''">
        <img :src="'http://www.etaor.com/' + slides.ImagesOne" height="360" width="100%"/>
      </mt-swipe-item>
      <mt-swipe-item v-if="slides.ImagesTwo!==''">
        <img :src="'http://www.etaor.com/' + slides.ImagesTwo" height="360" width="100%"/>
      </mt-swipe-item >
      <mt-swipe-item  v-if="slides.ImagesThree!==''">
        <img :src="'http://www.etaor.com/' + slides.ImagesThree" height="360" width="100%"/>
      </mt-swipe-item>
      <mt-swipe-item v-if="slides.ImagesFour!==''">
        <img :src="'http://www.etaor.com/' + slides.ImagesFour" height="360" width="100%"/>
      </mt-swipe-item>
    </mt-swipe>
    <!--商品详情start-->
    <div class="dx-product-right" v-model="slides">
      <div class="dx-describe">{{slides.ProductName}}</div>
      <div class="dx-pingpai"><span>品&nbsp&nbsp&nbsp&nbsp牌：<span>{{slides.BrandName}}</span></span></div>
      <div class="dx-pingpai"><span>产地：<span>{{slides.ProductFrom}}</span></span><span>分类：<span>{{slides.ClassName}}</span></span></div>
      <div class="dx-price clearfix">
        <div class="dx-original-price fl">会员价:<i>￥</i><span>{{slides.SellPriceNormal}}</span></div>
        <div class="dx-present-price fr">市场价:<em>￥{{slides.ProductPrice}}</em></div>
      </div>
      <div class="dx-pingpai"><span>发货地：</span><span>由{{slides.WareHouseName}}</span></div>
      <div class="dx-number">
        <span class="dx-how">数&nbsp&nbsp&nbsp&nbsp量：</span>
        <span class="input-number-decrement border-right" @click="SubCount">–</span><input class="input-number" :value="productNumber" type="text" v-model="productNumber"><span class="input-number-increment border-left" @click="AddCount()">+</span>
      </div>
      <div class="dx-notice">
        <ul class="clearfix">
          <li>
            <div class="fl margin-left-25 dx-just"><img src="../assets/images/icon-zheng.png" height="40" width="40"/></div>
            <div class="fl">
              <p class="p-one">100%正品</p>
              <p class="p-two">全球精选 正品保证</p>
            </div>
          </li>
          <li>
            <div class="fl margin-left-25 dx-just"><img src="../assets/images/icon-tui.png" height="40" width="40"/></div>
            <div class="fl">
              <p class="p-one">七天无忧退货</p>
              <p class="p-two">国内退货 售后无忧</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!--商品详情end-->
    <div style="width: 100%;height: 10px;background: #eee;"></div>
    <div class="dx-mui-scroll">
      <div class="clearfix">
        <div class="h5-new-discount-title fl">商品详情</div>
      </div>
      <div class="produce-details" v-html="ProductText">
      </div>
    </div>
    <!--商品介绍start-->
    <!--底部导航start-->
    <footer>
      <ul class="dx-foot-nav">
        <li style="width: 15%;margin-top: 10px;">
          <router-link to="/">
            <i class="fa fa-home color" style="font-size: 24px;margin-top: -8px;"></i>
            <div class="font-12">首页</div>
          </router-link>
        </li>
        <li style="width: 15%; margin-top: 10px" id="CollectProduct">
          <i class="fa fa-heart color-gery collection"></i>
          <div class="font-12">收藏</div>
        </li>
        <li style="width: 35%;">
          <span class="dx-buy" @click="OnAddShoppingCart">加入购物车</span>
        </li>
        <li style="width: 35%;">
          <span class="dx-btn" id="OnBuy">立即购买</span>
        </li>
      </ul>
    </footer>
    <!--底部导航end-->
  </div>
</template>

<script type="text/ecmascript-6">
  import { Toast } from 'mint-ui';
  import { cookieutil } from '../cookie/cookies';
  export default{
    data() {
      return {
        slides: [],
        ProductText:'',
        ProductStock:'',
        productNumber:'1',
        MinBuyNumber:'',
        MaxBuyNumber:''

      }
    },
    watch: {
      '$route' (to, from) {
        // 对路由变化作出响应...
        this.product()
      }
    },
    created() {
      this.product()
    },
    methods: {
        //跳转并刷新页面
      flushCom:function(){
        this.$router.go(0);
      },
      product(){
        let id=this.$route.params.type;
        let url=this.HOST +'/Product/GetProductDetail.aspx';
        this.$http.post(url,{ID:id},{emulateJSON: true}).then((response) => {
          response = response.body;
          if(response.status===true){
            this.slides=response.data;
            let list=response.data.ProductText;
            list = list.split( "&gt;").join(">");
            list = list.split("&lt;").join("<");
            list = list.split( "&nbsp;").join(" ");
            list = list.split( "&quot;").join("\"");
            list = list.split( "&#39;").join("\'");
            list = list.split( "\\\\").join("\\");//对斜线的转义
            list = list.split( "\\n/g").join("\n");
            list = list.split("\\r/g").join("\r",);
            list=list.split("/ueditor/").join("http://www.etaor.com/ueditor/");
            this.ProductText=list;
            this.ProductStock=response.data.ProductStock;
            this.MinBuyNumber=response.data.MinBuyNumber;
            this.MaxBuyNumber=response.data.MaxBuyNumber;
          }
        }, response => {
          // error callback
        });
      },
      //点击商品＋
      AddCount(){
        if (this.productNumber >= 0) {
          let Result = parseInt(this.productNumber);
          let ProductStock = parseInt(this.ProductStock);
          if (parseInt(Result + 1) > ProductStock) {
            let instance = Toast('商量库存数量不足');
            setTimeout(() => {
              instance.close();
            }, 2000);
            this.productNumber=this.ProductStock;
            return false;
          }
          if (Result >= 0) {
            this.productNumber=Result+1;
          }
        }
      },
      //点击商品-
      SubCount(){
        if (this.productNumber > 0) {
          let Result = parseInt(this.productNumber);
          if (Result > 1) {
            this.productNumber=Result - 1;
          }
        }
      },
      //加入购物车
      OnAddShoppingCart(){
        //取得商品ID，数量
        let WareHouseProductID = parseInt(this.$route.params.type);//商品id
        console.log(WareHouseProductID)
        let Number = parseInt(this.productNumber);//添加数量
        console.log(Number)

        let ProductStock = parseInt(this.ProductStock);//库存
        console.log(ProductStock)

        //取得最低购买数
        let MinBuyNumber = parseInt(this.MinBuyNumber);
        //取得限购数
        let MaxBuyNumber = parseInt(this.MaxBuyNumber);
        //判断值是不是为0
        if (Number == 0) {
          let instance = Toast('请输入购买数量');
          setTimeout(() => {
            instance.close();
          }, 2000);
          this.productNumber=MinBuyNumber;
          return false;
        };
        if (Number > ProductStock) {
          let instance = Toast('商量库存数量不足');
          setTimeout(() => {
            instance.close();
          }, 2000);
          this.productNumber=ProductStock;
          return false;
        };
        if (Number < MinBuyNumber) {
          let instance = Toast('购买数量不能低于最低购买数');
          setTimeout(() => {
            instance.close();
          }, 2000);
          this.productNumber=MinBuyNumber;
          return false;
        }
        if (Number > MaxBuyNumber) {
          let instance = Toast('购买数量不能大于限购数量');
          setTimeout(() => {
            instance.close();
          }, 2000);
          this.productNumber=MaxBuyNumber;
          return false;
        }
        let CartList = [];
        //查看购物车是否存在这个商品
        if (cookieutil.getCookie('ShoppingCart') !== null && cookieutil.getCookie('ShoppingCart').length > 0) {
          let Cart = cookieutil.getCookie('ShoppingCart');//商品id号  商品加入购物车的次数
          console.log("@@@"+Cart+"@@@")
          //先把json转为数组
          let CartObj = eval(JSON.parse(Cart));
          for (let i = 0; i < CartObj.length; i++) {
            let ShoppingCart = {
              WareHouseProductID: CartObj[i].WareHouseProductID,
              Number: CartObj[i].Number
            };
            CartList.push(ShoppingCart);
          }
          console.log(CartList)
          //判断是否存在，存在的修改数量， 不存在的添加
          var IsExists = false;//默认不存在
          for (var i = 0; i < CartList.length; i++) {
            if (WareHouseProductID == CartList[i].WareHouseProductID) {
              //判断添加的数量与购物车原来数量是否大于限购数量
              var CartNumber = parseInt(CartList[i].Number) + Number;
              if (CartNumber > MaxBuyNumber) {
                func(180, 50, "购物车存在数量与当前购买数量总和不能大于限购数量!", 2000);
                return false;
              }
              //修改数量
              CartList[i].Number = parseInt(CartList[i].Number) + Number;
              IsExists = true;
              break;
            }
          }
          if (!IsExists) {
            //添加添商品
            let ShoppingCart = {
              WareHouseProductID: WareHouseProductID,
              Number: Number
            };
            CartList.push(ShoppingCart);
          }
        }
        else {
          //不存在cookie，直接添加添商品
          let ShoppingCart = {
            WareHouseProductID: WareHouseProductID,
            Number: Number
          };
          CartList.push(ShoppingCart);
        }

        let str = JSON.stringify(CartList);
        cookieutil.setCookie('ShoppingCart', str, 7);
        alert( "加入购物车成功!");
        console.log('555555555'+str+'5555555555555');

        console.log('!!!!'+cookieutil.getCookie("ShoppingCart")+'!!!!!');

        //查看购物车是否存在这个商品
        console.log('%%%%%%%%%%'+CartList+'%%%%%');
        console.log(WareHouseProductID,Number,ProductStock,MinBuyNumber,MaxBuyNumber)
       /* cookieutil.setCookie("pwd","666",7);
        console.log(cookieutil.getCookie("pwd"));*/
      },


    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  *{margin: 0; padding: 0; border: 0; font: inherit; font-size: 100%; vertical-align: middle;}
  body{background: #fff;}
  .mui-slider {padding-top: 46px;}
  a{color: #fff;}
  .color-gery{color: #999;}
  /*弹框样式*/
  .bdshare-button-style0-16 a, .bdshare-button-style0-16 .bds_more{background-image:none !important;}
  .mui-toast-message{height: 80px;background: #000;opacity: 0.9;line-height: 80px;color: #fff;font-size: 18px;font-weight: bold;}
  .bdsharebuttonbox {border: 1px solid #000;position: relative;top: -36px;right: 7px;opacity: 0;}

  .dx-pingpai{height: 30px;width: 92%;line-height: 30px;color: #666;font-size: 13px;margin: 0 auto;}
  .dx-pingpai span{margin-right:10px;}
  .dx-describe{width: 92%;overflow: hidden;font-size: 14px;color: #666;line-height: 24px;text-align: left;margin: 5px auto;}
  .dx-price{width: 92%;color: #666;margin: 3px auto;font-size: 14px;}
  .dx-original-price{padding-top: 5px;font-size: 12px;}
  .dx-original-price i{font-size: 12px;color: #B1191A;margin-left:10px;}
  .dx-original-price span{font-size: 18px;color: #B1191A;}
  .dx-present-price{padding-top: 5px;font-size: 12px;}
  .dx-present-price em{margin-left:10px;text-decoration: line-through;}
  .dx-retail-price {float: right;margin-right: 100px;}
  .dx-retail-price span{margin-left:10px;}
  .dx-Number{margin-left:30px;}
  .input-number {width: 80px;padding: 0 12px;vertical-align: top;text-align: center;outline: none;
    width: 15% !important;height: 24px !important;line-height: 24px !important;}
  .input-number,
  .input-number-decrement,
  .input-number-increment {border: 1px solid #cccccc;height: 25px;user-select: none;}
  .input-number-decrement,
  .input-number-increment {display: inline-block;width: 24px;line-height: 24px;color: #444444;text-align: center;cursor: pointer;height: 24px;}
  .input-number-decrement:active,
  .input-number-increment:active {background: #dddddd;}
  .dx-number{width: 92%;margin: 10px auto;margin-bottom: 30px;}
  .dx-how{font-size: 13px;color: #666;margin-right: 5px;}
  .dx-just img{width: 30px;margin-top: 4px;}
  .fl p{font-size: 12px;line-height: 15px;color: #999;text-align: left;margin-left: 10px;margin-right: 10px;}
  .dx-notice{margin-top: 10px;
    margin-bottom: 15px;    margin-left: 10px;}
  .dx-collection span{font-size: 14px;color: #666;margin-left: 10px;margin-right: 50px;}
  .dx-collection{margin-top: 18px;text-align: center;margin-left:80px;}
  .dx-new-discount-title{width:232px;}
  .dx-recommend-products{margin-top:40px;margin-bottom:50px;}
  /*商品内容区样式end*/
  .dx-mui-scroll{margin-top: 10px;}
  .dx-mui-scroll img{width: 100%;margin-top: 15px;}
  /*底部导航*/
  .dx-foot-nav{width: 100%;height: 50px;background: #fff;position: fixed;bottom: 0px;z-index: 10;}
  .dx-foot-nav li{float: left;text-align: center;line-height: 20px;font-size: 21px;}
  .dx-buy{background: #FF9500;color: #fff;height: 50px;display: block;float: left;text-align: center;line-height: 50px;width: 100%;font-size: 18px;}
  .dx-btn{height: 50px;background: #b1191a;display: block;float: left;text-align: center;line-height: 50px;color: #fff;width: 100%;font-size: 18px;}
  /*顶部导航*/
  .dx-h5-logo{color: #Fff;line-height: 46px;margin-left: 5px;width:40px;}
  .dx-shopping-cart{color: #Fff;line-height: 43px;font-size: 20px;text-align: center;height: 46px;width:38px;}
  .dx-sign-in{color: #Fff;line-height: 48px;font-size: 19px;width: 50px;text-align: center;}
  .dx-radio{width: 14px;height: 14px;background: #fff;color: #8c0606;border-radius: 50%;display: block;float: right;font-size: 12px;line-height: 14px;text-align: center;margin-top: 5px;}
  /*.bdsharebuttonbox.bdshare-button-style0-16{position: absolute;right: 10px;}*/
  .border-right{border-right: none !important;}
  .border-left{border-left: none !important;}

  .mint-swipe-indicator.is-active {
    background: #B1191A !important;
  }
  .mint-swipe-indicator {
    opacity: 1 !important;
  }
  .mint-swipe-indicator {
    background: #ccc !important;
  }
</style>
