/**
 * Created by WangYou on 2017/7/25.
 */
  //设置cookie
const cookieutil={
    setCookie: function (cname, cvalue, exdays) {
      let d = new Date();
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
      let expires = "expires=" + d.toUTCString();
     // console.info(cname + "=" + cvalue + "; " + expires);
      document.cookie = cname + "=" + cvalue + "; " + expires;
     // console.info(document.cookie);
    },
    //获取cookie
    getCookie: function (cname) {
      let name = cname + "=";
      let ca = document.cookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
      }
      return "";
    },
    //清除cookie
    clearCookie: function () {
      this.setCookie("username", "", -1);

    },
    checkCookie: function () {
      let user = this.getCookie("username");
      if (user != "") {
        alert("Welcome again " + user);
      } else {
        user = prompt("Please enter your name:", "");
        if (user != "" && user != null) {
          this.setCookie("username", user, 365);
        }
      }
    }};
export {cookieutil}
