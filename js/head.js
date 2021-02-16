if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
   location.href = "/bbs/apple-err.html";
}


if (sessionStorage.getItem("captcha") == null)
  location.href = "/captcha#" + location.href;
function checklogin()
{
  sessionStorage.setItem("url",location.href);
  if (sessionStorage.getItem("uuid") == null || sessionStorage.getItem("username") == null)
    location.href = "/login#" + encodeURI(location.href);
}
function checkrobot()
{
   var updatetime = sessionStorage.getItem("updatetime");
   updatetime = parseInt(updatetime);
   var mstime = new Date().getTime();
   if ((mstime - updatetime) < 30 * 1000)
     return true;
   else
   {
     sessionStorage.setItem("updatetime",mstime);
     return false;
   }
}
function mourning(){
   var obj = document.getElementById("mourning-Dennis-Ritchie");
   obj.className = "show-element";
   var dobj = new Date();
   var date = d.getFullYear() + "年" + (d.getMonth() + 1) + "月" + d.getDate() + "日";
   obj.innerHTML = "<center><pre>今天是 <strong>" + date + "</strong></pre></center>";
};
