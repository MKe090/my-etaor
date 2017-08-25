<template>
  <div>
    <div class="head_01">
      <a href="javascript:history.go(-1);" class="go-home" target="_self">
        <i class="icon iconfont">&#xe62b;</i>
      </a>
      <div class="tit">
        <h3>充值成功</h3>
      </div>

    </div>
    <div class="user_view">
      <div class="box">
        <div class="list_nav padding_01">
          <!--<a class="btn-gen"> 返回会员中心 </a>
          <a class="btn-gen"> 继续充值 </a>-->
          <a class="btn-gen go-center" href="../login/personal_index.html" style="margin-right:20px"> 返回个人中心 </a><br />
          <!--<a class="btn-gen go-center" href="../login/"> 查看记录 </a>-->
          <i class="fa fa-check" aria-hidden="true"></i> 恭喜您,充值成功！

				</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

</script>

<style lang="stylus" rel="stylesheet/stylus">
  .fa-check,.padding_01{text-align:center;color:green;}
  .padding_01{padding-top:150px;}
  .go-center{ display:inline-block;padding: 5px;margin-bottom: 12px;}
</style>
