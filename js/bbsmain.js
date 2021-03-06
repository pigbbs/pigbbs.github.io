	/*
	 * PIGBBS 留言板源码 Copyright Pig Mail fat-pig-2020@outlook.com
	 * 我不指望你能读懂我的源代码
	 * 重构是不可能的
	 * 邮箱 pigbbs@outlook.com
	*/
function show_space()
	{
		var current = sessionStorage.getItem("content").length;
		var max_space = (parseInt(sessionStorage.getItem("level")) + 1) * 8 * 1024;
		document.getElementById("bbs-space").innerHTML = "当前留言板已用<font color=red>" + current + "</font>字节<br>储存空间<font color=blue>" + max_space + "</font>字节<br>已用" + (current / max_space * 100).toFixed(2) + "%<br><input type=button value=升级留言板 onclick=javascript:gopage(0);><br>";
	}
if (sessionStorage.getItem("updatetime") == null) sessionStorage.setItem("updatetime", new Date().getTime());
	document.getElementById("bbs-content-iframe").src = getblobAsText("正在加载，请稍后......");
	//显示正在加载
sessionStorage.removeItem("captcha");
Bmob.initialize("666aff82f39ad4c7", "081126");
	//登录数据库
var bbsid = location.hash.substring(1);
console.log(bbsid);
document.getElementById("qr-code").src = "https://api.no0a.cn/api/qrcode/query?url=https://pigbbs.github.io/bbs/join.html?bbsid=" + bbsid;
	//生成二维码
document.getElementById("bbsid").innerHTML = bbsid;//显示BBSID
var query = Bmob.Query("chat");
query.get(bbsid).then(res =>{
	//得到留言板信息
	console.log(res);
	sessionStorage.setItem("content", res.content);
	//写入缓存
	sessionStorage.setItem("level", res.level);
	var dislevel = res.level;
	dislevel = parseInt(dislevel);
	if (!dislevel) dislevel = "free";
	//如果等级为0，显示free
	document.getElementById("bbs-level").innerHTML = dislevel;
	//显示BBS等级
	show_space();
	//显示空间使用大小
	gopage(1);
	//渲染页面
}).
catch(err =>{
	//如果有错误，执行以下代码
	console.log(err);
	if (err.code == 101) location.href = "/";
	//错误代码==101(找不到对象)时，返回主页
});
function report()
{
	sessionStorage.setItem("bbsid",location.hash.substring(1));
	location.href = "/report";
}

