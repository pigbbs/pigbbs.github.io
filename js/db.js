if (typeof Bmob == "undefined")
  alert("You must include 'bmobSDK.js' to connect the database.");
var db = {};
Bmob. initialize("666aff82f39ad4c7","081126");
db.readdata = function (objid,usecache)
{
    if (usecache)
    {
       var obj = {};
       var content = sessionStorage.getItem("cache-" + objid);
       if (content == null)
       {
           obj.status = 400;
       } else {
           obj.status = 200;
           obj.content = content;
       }
       return obj;
    }
};
