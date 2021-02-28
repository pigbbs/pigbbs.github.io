function submitform() {
	var form = document.getElementById("form").innerHTML;
	//得到文字
	form = form.replace(/<div>/g, "");
	form = form.replace(/<\/div>/g, "");
	form = form.replace(/<br>/g, "\n");
	form = form.replace(/&/g, "&amp;");
	form = form.replace(/</g, "&lt;");
	form = form.replace(/>/g, "&gt;");
	form = form.replace(/\s/g, "&nbsp;");
	form = form.replace(/\'/g, "&#39;");
	form = form.replace(/\"/g, "&quot;");
	//HTML转义
	var arr = ["sb","250","傻逼","煞笔","傻b","fuck","我操","我草","卧草","艹","tmd","他妈的","他娘的","日你","我日","脑子有问题","吃屎"];
	var i = 0;
	var b = false;
	while (i != arr.length)
	{
		if (form.toLowerCase().indexOf(arr[i]) != -1)
		{
			alert("中国网警提醒您，互联网并非法外之地\n请注意您的言行举止\n你的账户信息，IP地址以及计算机MAC地址已上传到我们的数据库\n如果再有这种行为，轻者封号处理，重者拉黑并举报");
			var xhr = new XMLHttpRequest();
			xhr.open("POST","https://pigbbs.github.io?method=report&word=" + form + "&key=" + arr[i] + "&username=" + sessionStorage.getItem('username') + "&uuid=" + sessionStorage.getItem('uuid'),true);
			xhr.send();
			b = true;
		}
		i++;
	}
	//敏感词检查
	if (b)
		return;
	

	
 	var submit_limit = (parseInt(localStorage.getItem("level")) + 1) * 140;
	if (submit_limit > 2048)

		submit_limit = 2048;

	//最高为2048字节

	if (form.length > submit_limit) {

		alert("输入过长！");

		return;

	}

	if (form.length < 10)

	{

		alert("输入过短！至少10个字");

		return;

	}

	if (checkrobot()) {

		alert("请等待30秒再发送");

		//检查是否是机器人

		return;

	}

	if (sessionStorage.getItem("captcha") == null) {

		alert("请填写验证码");

		return;

	}
	form = form.replace(/\n/g, "<br>");
        //换行符替换
	var bbsid = location.hash.substring(1);
	const query = Bmob.Query("chat");
	query.get(bbsid).then(res =>{
		console.log(res);
		var content = res.content;
		content = "[" + sessionStorage.getItem("username") + "]" + "<font color=red>" + new Date() + "</font><br>" + form + "<hr>" + content;
		var level = res.level;
		if (level == "free") level = 0;
		if (content.length > (8 * 1024 * (level + 1))) {
			alert("数据库存储已达上限\n请升级数据库储存空间");
			//检查是否达到数据库储存上限
			gopage(0);
			return;
		}
		query.set("id", res.objectId);
		query.set("content", content);
		query.save().then(res =>{
			//发送数据
			alert("发送成功！");
			sessionStorage.setItem("content", content);
			document.getElementById("form").innerHTML = "";
			gopage(1);
			show_space();
			//显示空间使用大小
		}).
		catch(err =>{
			console.log(err);
			alert("发送失败！");
		});
	}).
	catch(err =>{
		console.log(err);
	});
}
