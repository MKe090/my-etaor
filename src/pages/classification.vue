<template>
  <div>
    <!--搜索框start-->
    <div class="search-content-div clearfix">
      <a href="javascript:history.go(-1);"><div class="fl dx-h5-logo"><i class="fa fa-angle-left font-20"></i></div></a>
      <div><i class="fa fa-search fl h5-serch h5-left-35"></i><input class="search-input" type="text" placeholder="请输入商品/品牌分类进行搜索"></div>
    </div>
    <div style="padding-top: 46px;"></div>
    <!--搜索框end-->
    <div class="clearfix">
      <div class="fl  fl-band-table">
        <!--品牌列表start-->
        <ul class="h5-brand-classification clearfix tabtitle">
          <li v-if="item.ParentID==0"  :id="item.ID"  v-for="(item,index) in classification" @click="classifiication(item.ID)" :class="{'active':ind === item.ID}" >{{item.ClassName}}
          </li>
        </ul>
        <!--品牌列表end-->
      </div>
      <div class="fl  fl-tabcontent">
        <!--品牌列表start-->
        <ul class="clearfix"  v-for="(item,index) in classificationlist" >
          <li>
              <router-link :to="{path: '/classification_detail/'+item.ID}">
                {{item.ClassName}}
              </router-link>
          </li>
        </ul>
        <!--品牌列表end-->
      </div>

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        classification: [],
        classid:[],
        classificationlist:[],
        ind:''
      }
    },
    methods: {
      classifiication:function (index) {
       this.classid = index;
        let dd=this.classid;
        this.goto(dd);
        this.ind = index
      },
      goto(dd){
        console.log(dd)
        var url=this.HOST +'/Product/GetProductClass.aspx'
        //var dd = this.classid
        this.$http.post(url,{ClassID :dd},{emulateJSON: true}).then((response) => {
          response = response.body;
          if(response.status===true){
            this.classificationlist=response.data.list
          }
        }, response => {
          // error callback
        });
      },
      getScorllHeight(element){

      }
    },
    created() {
      var url=this.HOST +'/Product/GetProductClass.aspx'
      this.$http.post(url).then((response) => {
        response = response.body;
        if(response.status===true){
          this.classification=response.data.list
          if (response.data.list.length > 0) {
              this.ind=response.data.list[0].ID;
              this.goto(response.data.list[0].ID);
          }
        }
      }, response => {
        // error callback
      });
      this.goto();
    }
  }
</script>

<style>
  /*分类样式Satart*/
  body{background:#FFF !important}
  a{color:#666}
  .active{background: #eee; border-right: 1px solid #eee !important; display: inline-block;width: 101%;};

  .mui-slider {padding-top: 40px;}
  .tavblock{display:block};
  .fl-tabcontent{width: 57%;margin-left: 1%;margin-top: 25px;}
  .tabhover{background: #eee;border-right: 1px solid #eee !important;}
  .fl-band-table{width: 40%;background: #fff;height: auto;border-right: 5px solid #eee;}
  .fl-tabcontent ul li{font-size: 14px;height: 36px;line-height: 36px;float: left;margin-right: 30px;margin-top: 10px;}
  .fl-baner{padding-top: 40px;}
  .fl-brand {background: #fff;padding-top: 10px;}
  .fl-baner img{width: 96%;margin: 2%;}
  .h5-brand-classification li {font-size: 14px;border-bottom: 1px solid #ddd;color: #666;height: 50px;line-height: 50px;text-align: center;border-right: 1px solid #ddd;}
  /*分类样式end*/
</style>
