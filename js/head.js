if (sessionStorage.getItem("captcha") == null)
  location.href = "/captcha#" + location.href;
function checklogin()
{
  if (sessionStorage.getItem("uuid") != null && sessionStorage.getItem("username") != null)
    location.href = "/login#" + locatiob.href;
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
