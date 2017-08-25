<template>
  <div>
    <!--顶部导航start-->
    <div class="search-content-div clearfix">
      <a href="javascript:history.go(-1);">
        <div class="fl dx-h5-logo">
          <i class="icon iconfont font-20">&#xe62b;</i>
        </div>
      </a>
      <div class="dz-sign-in">我的购物车</div>
    </div>
    <!--顶部导航end-->
    <div  style="padding-top: 46px;" ></div>
    <div v-for="(items,index) in shopCatalog">
    <!--购物车start-->

    <div class="gwc">
      <div class="gwc_tb2 clearfix">
        <div class="gw-color-write">
          <input type="checkbox" class="fl" v-model="items.checked" /><p class="fl">{{allChecked}}</p>
          <div class="dx-consignment fl" >{{index}}<span>&nbsp;&nbsp;&nbsp;发货</span></div>
        </div>
        <!--商品1-->
        <div class="product fl" v-for="(item,index) in items">
          <div class="clearfix margin-top5">
           <!-- <span class="item-check-btn" v-bind:class="{'check':item.checked}" @click="selectedProduct(item)"></span>-->
            <input type="checkbox" v-model="item.checked" />{{allChecked}}
            <div class="delete_box fr">
              <span class="delete_up"></span>
              <span class="delete_down" :id="item.ID" @click="del(item)"></span>
            </div>
          </div>
          <div class="shop_info clearfix" :id="item.ID">
            <router-link :to="{path: '/detail/'+item.ID}" class="img_box fl">
              <img :src="'http://www.etaor.com/'+item.ImagesOne" alt="">
            </router-link>
            <div class="info_box">
              <router-link :to="{path: '/detail/'+item.ID}" >{{item.ProductName}}</router-link>
              <p class="p_price">&yen;{{item.SellPriceNormal}}</p>
              <div class="p_opition">
                <div class="change_num fl">
                  <span class="border-right" :data-ID="item.ID" @click="changeMoney(item, -1)">-</span>
                  <input type="tel" :value="changenum(item)" v-model="item.num" >
                  <span class="border-left" @click="changeMoney(item,1)">+</span>
                </div>
              </div>
            </div>
          </div>
          <div class="jd_win" v-if='showwin'>
            <div class="jd_win_box">
              <div class="jd_win_tit">你确定删除该商品吗？</div>
              <div class="jd_btn clearfix">
                <a href="#" class="cancle fl" @click="cancel">取消</a>
                <a href="" class="submit fr"  @click="submit(item)">确定</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    <!--购物车商品end-->
    <!--提交订单start-->
    <div class="gwc_tb3 clearfix">
      <div class="fl margin-left-10">
        <input type="checkbox" v-model="allChecked" />全选{{allChecked}}
      </div>
      <a href="order-details.html" class="jz2" id="jz2">提交订单</a>
      <div class="fr margin-right-10 gw-total-yf">合计(不含运费):￥<span v-html="totalMoney"></span></div>
    </div>

    <!--提交订单end-->
  </div>
</template>

<script type="text/ecmascript-6">
  import { cookieutil } from '../cookie/cookies';
  import _ from 'lodash';
  export default{
    data(){
        return{
          productlist:[],
          array:[],
          checkAllFlag:false,
          shopCatalog:[],
          num:[],
          showwin:false,
          WareHouseProductID:[],
          totalMoney:'0'
        }
    },
  created() {
    this.product()
  },
  methods:{
    //跳转并刷新页面
    flushCom:function(){
      this.$router.go(0);
    },
    product(){
          let CartList=[];
          let ProductID=[];
          let shopping_cart=cookieutil.getCookie('ShoppingCart');
          let cart = JSON.parse(shopping_cart);
          console.log( JSON.stringify(cart));
          for(let i = 0; i < cart.length; i++){
            let ShoppingCart = {
              WareHouseProductID: cart[i].WareHouseProductID,
              Number: cart[i].Number
            };
            CartList.push(ShoppingCart);
            let cart_list = CartList[i].WareHouseProductID;
            ProductID.push(cart_list)
          }
          let array = [];
          this.array=array;
          for (let i = 0; i < CartList.length; i++) {
            let item = CartList[i];
            array[item["WareHouseProductID"]] = item["Number"];
           // this.aa=array[item.ID];
          }

          let WareHouseProductID = ProductID.join(",");
          this.WareHouseProductID=WareHouseProductID;
          console.log(WareHouseProductID)
          if (WareHouseProductID ==="") {
           console.log(" 购物车内暂时没有商品!");
            return false;
          }
          let url=this.HOST +'/Product/GetProductListByIDList.aspx';
          this.$http.post(url,{Idlist: WareHouseProductID},{emulateJSON: true}).then((response) => {
            response = response.body;

            if(response.status===true){
              console.log(response.data)
              this.productlist=response.data.list;
              let items=response.data.list;
              for (let i=0; i<items.length;i++){
                let dd={'WareHouseProductID':parseInt(items[i].ID)}
                let num=_.result( _.find(cart,dd),'Number');
                    this.num=num;
              }
              //拆分数组
              this.shopCatalog=_.groupBy(items, function(n) {
                return n.WareHouseName;
              });

              console.log(this.shopCatalog)
              console.log(this.shopCatalog.length);
            }
          }, response => {
            // error callback
          });

        },
    changenum(item){
        if(typeof item.num=='undefined'){
          this.$set(item,'num',this.array[item.ID]);
        }
      },
      //增加商品
    changeMoney(item,way){
            if(way>0){
              item.num++
              let CartList = new Array();
              let Cart=cookieutil.getCookie('ShoppingCart');
              //先把json转为数组
              let CartObj = eval(JSON.parse(Cart));
              for (let i = 0; i < CartObj.length; i++) {
                let ShoppingCart = {
                  WareHouseProductID: CartObj[i].WareHouseProductID,
                  Number: CartObj[i].Number
                };
                CartList.push(ShoppingCart);
              }
              //判断是否存在，存在的修改数量
              for (let i = 0; i < CartList.length; i++) {
                if (item.ID == CartList[i].WareHouseProductID) {
                  //修改数量
                  CartList[i].Number = parseInt(CartList[i].Number) + 1;
                  break;
                }
              }
              //重新写入cookie
              let str = JSON.stringify(CartList);
              cookieutil.setCookie('ShoppingCart', str, 7);
            }else{
              item.num--;
              let CartList = new Array();
              let Cart=cookieutil.getCookie('ShoppingCart');
              //先把json转为数组
              let CartObj = eval(JSON.parse(Cart));
              for (let i = 0; i < CartObj.length; i++) {
                let ShoppingCart = {
                  WareHouseProductID: CartObj[i].WareHouseProductID,
                  Number: CartObj[i].Number
                };
                CartList.push(ShoppingCart);
              }
              //判断是否存在，存在的修改数量
              for (let i = 0; i < CartList.length; i++) {
                if (item.ID == CartList[i].WareHouseProductID) {
                  //修改数量
                  CartList[i].Number = parseInt(CartList[i].Number)- 1;
                  break;
                }
              }
              //重新写入cookie
              let str = JSON.stringify(CartList);
              cookieutil.setCookie('ShoppingCart', str, 7);
              if(item.num<1){
                item.num=1;
              }
            }
      },
    //点击删除按钮
    del(item){
        //获取当前的data-ID
      this.WareHouseProductID=item.ID;
      this.showwin=!this.showwin;
    },
    //点击取消按钮
    cancel(){
      this.showwin=false;
    },
    //点击删除确定按钮
    submit(){
      let CartList = [];
      let Cart=cookieutil.getCookie('ShoppingCart');
      let CartObj = eval(JSON.parse(Cart));
      for (let i = 0; i < CartObj.length; i++) {
        let ShoppingCart = {
          WareHouseProductID: CartObj[i].WareHouseProductID,
          Number: CartObj[i].Number
        };
        CartList.push(ShoppingCart);
      }
      //判断是否存在
      for (let i = 0; i < CartList.length; i++) {
        if (this.WareHouseProductID == CartList[i].WareHouseProductID) {
          //删除此项
          CartList.splice(i, 1);
          break;
        }
      }
      //重新写入cookie
      let str = JSON.stringify(CartList);
      cookieutil.setCookie('ShoppingCart', str, 7);
      this.showwin=false;
      this.$router.push({path: '/shopping_cart'})
    },
    // 计算商品总金额
    calTotalMoney() {
      var oThis = this;
      this.totalMoney = 0;
      for ( var i = 0, len = this.productlist.length; i < len; i++ ) {
        var list = this.productlist[i]['list'];
        list.forEach(function(item, index, arr) {
          if ( list[index]['checked'] ) {
            oThis.totalMoney += parseFloat(item.SellPriceNormal) * parseFloat(item.num);
          }
        });
      }
    },
    selectedProduct(item){
      if(typeof item.checked=='undefined'){
        this.$set(item,"checked",true);
      }else{
        item.checked=!item.checked;
      }

    },
  },
    computed: {
      allChecked: {
        get: function(){
          return this.checkedCount == this.productlist.length;
          console.log(this.checkedCount)
          console.log(   this.calTotalMoney())
        },
       set: function(value){
          this.productlist.forEach(function(item){
            item.checked = value
          })
          return value;
        }

      },
      checkedCount: {
        get: function(){
          let _this=this;
          let i = 0;
          this.productlist.forEach(function(item){
            if(typeof item.checked=='undefined'){
              _this.$set(item,"checked",true);
            }
            if(item.checked == true) i++;
          });
          return i;
        }
      }
    },

}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  /*我的购物车样式start*/
  .jd_wins{display :block;}
  .item-check-btn {
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 1px solid #ccc;
    border-radius: 50%;
    text-align: center;
    vertical-align: middle;
    cursor: pointer; }
  .item-check-btn .icon-ok {
    display: none;
    width: 100%;
    height: 100%;
    fill: #fff;
    -ms-transform: scale(0.8);
    transform: scale(0.8); }
  .item-check-btn.check {
    background: #EE7A23;
    border-color: #EE7A23; }
  .item-check-btn.check .icon-ok {
    display: inline-block; }
  .check {
    border-color: #EE7A23;
    border-width: 2px; }
  .margin-top5{margin-top: -10px;}
  .product {margin: 20px 10px 0 10px;position: relative;width: 93%;}
  .dx-consignment {margin-left: 10px;margin-top: 2px;}
  .p_opition {margin-top: 10px;margin-left: 5px;}
  .gwc{width: 100%;background: #fff;margin-bottom: 10px;}
  .jz2 {width: 100px;height: 50px;line-height: 50px;text-align: center;font-size: 16px;color: #fff;background: #B61D1D;display: block;float: right;}
  .gwc_tb2 {font-size: 12px;}
  .shop_info {padding-left: 12px;height: 100%;width: 100%;margin-bottom: 10px;}
  .gw-color-write {margin: 0px 10px;height: 45px;border-bottom: 1px solid #ccc;padding-top: 15px;}
  .info_box .p_price {color: #b61d1d;font-size: 14px;margin-top: 10px;margin-left: 5px;}
  .tb2_td2 img{width: 60px;height: 60px; overflow:hidden;}
  .gwc_tb3 {width: 100%;height: 50px;line-height: 50px;position: fixed;background: #f2f2f2;z-index: 999;bottom: 0;font-size: 12px;color: #666;}
  /*重置默认样式t*/
  *,::before,::after{margin: 0;padding: 0;-webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -o-box-sizing: border-box;
    -ms-box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
  }
  .gw-total-yf span{color: #b61d1d;font-size: 15px;margin-left: 5px;}
  .delete_box .delete_up {width: 15px;height: 5px;display: block;background: url("../assets/images/delete_up.png");background-size: 16px 7px;margin-left: 0px;}
  .jd_shop .jd_shop_con .product{border-bottom: 1px solid #ccc;height: 100px;position: relative;}
  .shop_info .info_box{overflow: hidden;padding-top: 10px;padding-right: 10px;}
  .jd_shop .shop_info .img_box{height: 100px;width: 90px;float: left;padding:10px;padding-left: 0;}
  .jd_shop .shop_info .img_box img{width: 100%;height: 100%;display: block;}
  .info_box .p_name{line-height: 15px;height: 30px;width: 98%;display: block;overflow: hidden;font-size:12px;}
  .change_num{font-size:12px;}
  .p_opition .change_num span{width: 24px;height: 24px;line-height: 22px;text-align: center;float: left;border:1px solid #CCCCCC;}
  .p_opition .change_num input {border: 1px solid #ccc;float: left;width: 22%;height: 24px;text-align: center;}
  .delete_box .delete_down {margin-top: -2px;width: 18px;height: 18px;display: block;background: url("../assets/images/delete_down.png");background-size: 16px 16px;}
  /*弹出框*/
  .jd_win{width: 100%;height: 100%;position: fixed;top:0;left:0;background: rgba(0, 0, 0, 0.6);z-index: 9999;}
  .jd_win_box{width: 80%;padding: 0 10px;border-radius: 4px;background-color: #fff;position: absolute;top:50%;left:50%;transform:translate(-50%, -50%);-webkit-transform:translate(-50%, -50%);}
  .jd_win .jd_win_tit {line-height: 75px;text-align: center;font-size: 16px;color: #666;}
  .jd_btn{width: 100%;padding: 10px 0;font-size: 16px;}
  .jd_btn  a{line-height: 36px;width: 45%;text-align: center;border-radius: 4px;}
  .jd_win .cancle{margin-right: 10%;border: 1px solid #ccc;}
  .jd_win .submit{background: #d8505c;color: #fff;}
  .img_box img{width: 100px;height: 100px;overflow: hidden;}
  .move{animation: mymove 1s;}
  @keyframes mymove {
    0%{
      opacity: 0;
      transform:translate3d(-50%,-500%,0);
      -webkit-transform:translate3d(-50%,-500%,0);
    }
    60%{
      opacity: 1;
      transform:translate3d(-50%,-50%,0);
      -webkit-transform:translate3d(-50%,-50%,0);
    }
    75%{
      opacity: 1;
      transform:translate3d(-50%,-45%,0);
      -webkit-transform:translate3d(-50%,-45%,0);
    }
    90%{
      opacity: 1;
      transform:translate3d(-50%,-54%,0);
      -webkit-transform:translate3d(-50%,-54%,0)
    }
    100%{
      opacity: 1;
      transform:translate3d(-50%,-50%,0);
      -webkit-transform:translate3d(-50%,-50%,0);
    }
  }
  /*我的购物车样式end*/

 </style>
