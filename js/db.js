if (typeof Bmob == "undefined")
  alert("You must include 'bmobSDK.js' to connect the database.");
var db = {};
db.readdata = function (objid,usecache)
{
    if (usecache)
    {
       var obj = {};
       var content = sessionStorage.getItem("cache-" + objid);
       if (content == null)
       {}
    }
};
