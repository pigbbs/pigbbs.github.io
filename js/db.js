if (typeof Bmob == "undefined")
  alert("You must include 'bmobSDK.js' to connect the database.");
var db = {};
Bmob. initialize("666aff82f39ad4c7","081126");

db.newbbs = function () {

     var obj = {};
    var uuid = sessionStorage.getItem("uuid");
    var q = Bmob.Query("userinfo");
    q.get(uuid).then(res => {
      //得到用户信息
      console.log(res);
      q.set("id",res.objectId);
      q.set("BBSnum",parseInt(res.BBSnum)+1);
      //检查用户的留言板数量
      if (res.BBSnum > 2)
        alert("错误！您的账户创建的留言板已达上限");
      else
      {
        //提交用户信息给服务器
        q.save().then(res => {
          console.log(res);
          
           var query = Bmob.Query("chat");
            query.set("content","<strong>欢迎来到猪猪留言板</strong><br>");
          //初始化留言板
           query.set("level",0);
              query.save().then(res => {
                    obj.status = 200;
                    obj.result = res;
                //提交留言板给服务器
                     sessionStorage.setItem("boardID",JSON.stringify(obj));
          }).catch(err => {
                   obj.status = 400;
                   obj.result = err;
                     sessionStorage.setItem("boardID",JSON.stringify(obj));
              });
        }).catch(err => {
                console.log(err);
          });
      }
    }).catch(err => {
      console.log(err);
    });
     
};
