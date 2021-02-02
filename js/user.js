var user = {};
if (typeof Bmob == "undefined")
  alert("You must include 'BmobSDK.js'");
user.register = function(username,password)
{
   var userinfo = {};
   userinfo.username = username;
   userinfo.password = password;
   userinfo.email = null;
   userinfo.phone = null;
   Bmob.user.register(userinfo).then(res => {
       var obj = {};
       obj.status = 200;
       obj.result = res;
       sessionStorage.setItem("username",res.username);
       sessionStorage.setItem("uuid",res.objectId);
       return obj;
   }).catch(err => {
       var obj = {};
       obj.status = 500;
       obj.result = err;
       return obj;
   });
}
