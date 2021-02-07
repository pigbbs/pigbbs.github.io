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
           obj.status = 500;
       } else {
           obj.status = 200;
           obj.content = content;
       }
       return obj;
    } else {
        var obj = {};
        var query = Bmob.Query("chat");
        query.get(objid).then(res => {
            obj.status = 200;
            obj.content = res;
            sessionStorage.setItem("cache-" + objid,res.content);
        }).catch(err => {
            obj.status = 400;
            obj.content = err;
        });
        return obj;
     }
};
db.savedata = function(objid,dat) {
   var obj = {};
   var query = Bmob.Query("chat");
   query.set("content",dat);
   query.save(res => {
        obj.status = 200;
        obj.result = res;
        return obj;
   }).catch(err => {
       obj.status = 400;
       obj.result = err;
       return obj;
   });   
};
db.newbbs = function () {

     var obj = {};
     var query = Bmob.Query("chat");
     query.set("content","<strong>欢迎来到猪猪留言板</strong><br>");
    query.set("lever","free");
     query.save().then(res => {
          obj.status = 200;
          obj.result = res;
          return obj;
     }).catch(err => {
          obj.status = 400;
          obj.result = err;
          return obj;
     });
     
};
