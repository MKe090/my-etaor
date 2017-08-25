var layer = document.createElement("div");
layer.id = "layer";
function func(DIVwidth, DIVheight, DIVtext, DIVtime) {//120px,40px
  var style =
    {
      background: "#666",
      position: "fixed",
      zIndex: 10,
      width: DIVwidth + "px",
      // height: DIVheight + "px",
      left: "50%",
      top: "50%",
      marginTop: -(DIVheight / 2) + "px",
      marginLeft: -(DIVwidth / 2) + "px",
      opacity: "0.9",
      borderRadius: "5px",
      textAlign: "center",
      color: "#fff",
      padding: "20px",
      fontSize: "16px",
      fontWeight: "600",
      lineHeight: "18px"
    }
  for (var i in style)
    layer.style[i] = style[i];
  layer.innerHTML = DIVtext;
  var index= DIVtext.indexOf('重新登录');
  var relogin = (index > 0);
  var str ="document.body.removeChild(layer);if("+relogin+"){  window.location='/wap/login/login.html' }";
  if (document.getElementById("layer") == null) {

    document.body.appendChild(layer);
    setTimeout(str, DIVtime)
  }
}
/**
 * Created by WangYou on 2017/7/4.
 */
