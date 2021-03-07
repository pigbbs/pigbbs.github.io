/*
	 * PIGBBS 留言板源码 Copyright Pig Mail fat-pig-2020@outlook.com
	 * 我不指望你能读懂我的源代码
	 * 重构是不可能的
	 * 邮箱 pigbbs@outlook.com
	*/
function gopage(n) {
	//渲染页面-函数
	n = parseInt(n);
	if (0 > n) n = 1;
	//对页码进行处理
	if (n) {
		document.getElementById("bp").className = "show-element";
		document.getElementById("np").className = "show-element";
		//如果n为true 显示翻页按钮
	} else {
		document.getElementById("bp").className = "hide-element";
		document.getElementById("np").className = "show-element";
		//如果n为false(0)，只显示下一页的按钮（升级BBS页面）
		var bbsid = location.hash.substring(1);
		const query = Bmob.Query("chat");
		query.get(bbsid).then(res =>{
			console.log(res);
			sessionStorage.setItem("content", res.content);
			sessionStorage.setItem("level", res.level);
			//得到BBS信息，更新缓存
			if ((res.level + 1) * 8 == 2 * 1024) document.getElementById("bbs-content-iframe").src = getblobAsText("该留言板的等级已经是最高，无法升级<br><input type=button value=返回 onclick=javascript:window.parent.window.gopage(1);>");
			else {
				var level = res.level;
				if (level == "free") level = 0;
				else level = parseInt(level);
				var dislevel = level;
				if (!dislevel) dislevel = 0;
				//计算价格，并渲染
				var bbs_content = "";
				bbs_content = "留言板等级：" + dislevel + "<br>等级上限：" + (2 * 1024 / 8 - 1) + "<br>交易价格<br>";
				var maxlevel = (2 * 1024 / 8 - 1 - level);
				var maxnum;
				var maxprice = maxlevel * 20;
				if (maxlevel < 10) {
					maxnum = "不打折";
				} else if (maxlevel < 30) {
					maxnum = "打九八折";
					maxprice *= 0.98;
				} else if (maxlevel < 50) {
					maxnum = "打九五折";
					maxprice *= 0.95;
				} else if (maxlevel < 100) {
					maxnum = "打九折";
					maxprice *= 0.9;
				} else if (maxlevel < 150) {
					maxnum = "打七五折";
					maxprice *= 0.75;
				} else if (maxlevel < 200) {
					maxnum = "打六五折";
					maxprice *= 0.65;
				} else {
					maxnum = "打五折";
					maxprice *= 0.5;
				}
				maxprice = parseInt(maxprice);
				bbs_content += "[最高等级] 购买" + maxlevel + "等级 原价" + (maxlevel * 20) + "猪头 现价" + maxprice + "猪头 <font color=red>" + maxnum + "</font>" + "<font color=blue>" + maxlevel * 8 * 1024 + "字节</font>储存空间 <input type=button value=购买 onclick=javascript:window.parent.window.buyspace(" + maxlevel + "," + maxprice + ");><br>";
				if (maxlevel > 199) bbs_content += "购买200等级 原价4000猪头 现价2600猪头 <font color=red>打六五折</font> <font color=blue>1638400字节</font>储存空间 <input type=button value=购买 onclick=javascript:window.parent.window.buyspace(200,2600);><br>";
				if (maxlevel > 149) bbs_content += "购买150等级 原价3000猪头 现价2250猪头 <font color=red>打七五折</font> <font color=blue>1228800字节</font>储存空间 <input type=button value=购买 onclick=javascript:window.parent.window.buyspace(150,2250);><br>";
				if (maxlevel > 99) bbs_content += "购买100等级 原价2000猪头 现价1800猪头 <font color=red>打九折</font> <font color=blue>819200字节</font>储存空间 <input type=button value=购买 onclick=javascript:window.parent.window.buyspace(100,1800);><br>";
				if (maxlevel > 49) bbs_content += "购买50等级 原价1000猪头 现价950猪头 打九五折 <font color=blue>409600字节</font>储存空间 <input type=button value=购买 onclick=javascript:window.parent.window.buyspace(50,950);><br>";
				if (maxlevel > 29) bbs_content += "购买30等级 原价600猪头 现价588猪头 打九八折 <font color=blue>245760字节</font>储存空间 <input type=button value=购买 onclick=javascript:window.parent.window.buyspace(30,588);><br>";
				if (maxlevel > 19) bbs_content += "购买20等级 原价400猪头 现价396猪头 打九九折 <font color=blue>163840字节</font>储存空间 <input type=button value=购买 onclick=javascript:window.parent.window.buyspace(20,396);><br>";
				if (maxlevel > 9) bbs_content += "购买10等级 200猪头 <font color=blue>81920字节</font>储存空间 <input type=button value=购买 onclick=javascript:window.parent.window.buyspace(10,200);><br>";
				if (maxlevel > 4) bbs_content += "购买5等级 100猪头 40960字节储存空间 <input type=button value=购买 onclick=javascript:window.parent.window.buyspace(5,100);><br>";
				if (maxlevel > 2) bbs_content += "购买3等级 60猪头 24576字节储存空间 <input type=button value=购买 onclick=javascript:window.parent.window.buyspace(3,60);><br>";
				if (maxlevel > 1) bbs_content += "购买2等级 40猪头 16384字节储存空间 <input type=button value=购买 onclick=javascript:window.parent.window.buyspace(2,40);><br>";
				if (maxlevel > 0) bbs_content += "购买1等级 20猪头 8192字节储存空间 <input type=button value=购买 onclick=javascript:window.parent.window.buyspace(1,20);><br>";
				bbs_content += "<br><br><br><input type=button value=退出 onclick=javascript:window.parent.window.gopage(1);>";
				document.getElementById("bbs-content-iframe").src = getblobAsText(bbs_content);

				//                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
			}
		}).
		catch(err =>{
			console.log(err);
		});
	}
	if (n == 1) document.getElementById("bp").className = "hide-element";
	//如果页面等于1，隐藏上一页按钮
	if (n > 1) document.getElementById("bp").className = "show-element";
	sessionStorage.setItem("page", n);
	var content = sessionStorage.getItem("content");
	document.getElementById("page-num").innerHTML = n;
	//显示页码
	if (content.length > (n - 1) * 1024) {
		//计算显示长度，如果当前页面无内容，则跳转到第一页
		if (content.length > n * 1024) var display = content.substring((n - 1) * 1024, n * 1024);
		else var display = content.substring((n - 1) * 1024);
		//判断内容是否超出当前页面的长度
		display = display.replaceAll("<hr>","<input type=button value=举报 onclick=javascript:window.parent.window.report();><hr />");
		display = change_char(display);
				document.getElementById("bbs-content-iframe").src = getblobAsText(display);
		render_img();
	} else gopage(1);
}
function fgopage() {
	var page = document.getElementById("page-num").innerHTML;
	page = parseInt(page);
	if (page != page) page = 1;
	//如果页码不是个数字，设置页码为1
	gopage(page);
}
function backpage() {
	var page = sessionStorage.getItem("page");
	page = parseInt(page);
	page--;
	//上一页
	gopage(page);
	
}
function nextpage() {
	var page = sessionStorage.getItem("page");
	page = parseInt(page);
	page++;
	//下一页
	gopage(page);
}
function loadImage(uuid)
{
	//加载图片
	var i = localStorage.getItem("cache-img-" + uuid);
	if (i != null)
		return i;
	//如果在缓存中存在，则返回缓存
	const img = Bmob.Query("image");
	img.get(uuid).then(res => {
		//如果不存在，则请求服务器端
		i = res.content;
		var j = 1;
		while (typeof res["content"+j] != "undefined")
		{
			i += res["content"+j];
			j++;
		}
		//拼接字符串
		localStorage.setItem("cache-img-" + uuid,i);
		//写入缓存
	}).catch(err => {
		console.log(err);
	});
}
function render_img(){
	document.getElementById("bbs-content-iframe").onload = function(){
		
		var s = setInterval(function(){
			var arr = document.getElementById("bbs-content-iframe").contentWindow.window.document.getElementsByClassName("user_upload_img");
			//得到待操作的数组
			if (!arr.length)
				clearInterval(s);
			var i = 0;
			while (i != arr.length)
			{	
				var img = loadImage(arr[i].id);
				//取得图片
				if (typeof img != "undefined")
				{
					//如果返回了缓存，则加载图片
					let blob = image_dataURLtoBlob(img);
					//把图片从DataUrl格式转成Blob格式
					let url = window.URL.createObjectURL(blob);
					//构建Blob URL
					arr[i].src = url;
					arr[i].onload = function () {
						window.URL.revokeObjectURL(url);
						//当图片加载完后，删除Blob URL(防盗链技术)
					};
					arr[i].className = "user_upload_img_success";
					//标记加载完的图片
				}
				i++;
			}
		},500);
	};
};
function change_char(str)
{
	var command = str.match(/\{{1}[a-z0-9]*\}{1}/gim);
	//提取中所有的命令
	if (command == null)
		return str;
	var result = [];
	var i = 0;
	while(i != command.length)
	{
		var ptr = command[i];
		var string = ptr.substring(1,ptr.length-1);
		//删去命令中的标识符
		result[i] = parseCommand(string);
		//解析命令
		i++;
	}
	i = 0;
	while (i != result.length)
	{
		str = str.replaceAll(command[i],result[i]);
		i++;
	}
	return str;
}
function parseCommand(str)
{
	//命令解析器
	if (str.indexOf(" ") == -1)
		var main_command = str;
	else
		var main_command = str.split(" ")[0];
	//得到主命令
	var argu_middle = str.split(" ");
	var argu = {};
	var i = 0;
	while (i != argu_middle.length)
	{
		if (argu_middle[i].indexOf("=") == -1)
		{
			//当参数没有默认值时，将参数的默认值设为true，并发出警告
			argu[argu_middle[i]] = true;
			console.warn("PigBBS Command Compiler\nWarning:The value of the parameter should be set\nCode:fffe\n%s{" + str + "}","color:red");
		}
		else
			argu[argu_middle[i].split("=")[0]] = argu_middle[i].split("=")[1];
		i++;
	}
	//生成参数对象
	switch(main_command)
	{
		//当主命令为img/image时
		case "img":
			if (typeof argu.src == "undefined" && typeof argu.source == "undefined")
			{
				console.error("PigBBS Command Compiler\nError:The source location of the picture object is not specified\nCode:5000\n%s{" + str + "}","color:red");
				return "";
				//检查是否写图片的源位置
			}
			var res = "<img src='";
			if (typeof argu.source != "undefined")
				res += argu.source + "'";
			else
				res += argu.src + "'";
			//在HTML标签中加上源位置
			if (typeof argu.height != "undefined")
				res += " height='" + argu.height + "'";
			if (typeof argu.width != "undefined")
				res += " width='" + argu.width + "'";
			//如果参数中有尺寸的话，在HTML标签中加上尺寸
			res += ">";
			return res;
			break;
		case "image":
			if (typeof argu.src == "undefined" && typeof argu.source == "undefined")
			{
				console.error("PigBBS Command Compiler\nError:The source location of the picture object is not specified\nCode:5000\n%s{" + str + "}","color:red");
				return "";
				//检查是否写图片的源位置
			}
			var res = "<img src='";
			if (typeof argu.source != "undefined")
				res += argu.source + "'";
			else
				res += argu.src + "'";
			//在HTML标签中加上源位置
			if (typeof argu.height != "undefined")
				res += " height='" + argu.height + "'";
			if (typeof argu.width != "undefined")
				res += " width='" + argu.width + "'";
			//如果参数中有尺寸的话，在HTML标签中加上尺寸
			res += ">";
			return res;
			break;
		case "link":
			//如果主命令为link或l的话
			if (typeof argu.url == "undefined")
			{
				console.error("PigBBS Command Compiler\nError:The path to which the link is pointed is not specified\nCode:5001\n%s{" + str + "}","color:red");
				return "";
				//如果没有指定链接指向的URL的话，报错
			}
			var res = "<a href='https://pigbbs.github.io/link?url=" + escape(argu.url) + "' target='_blank'>";
			if (typeof argu.content != "undefined")
				res += argu.content;
			else
				res += argu.url;
			//如果参数中有链接显示的内容的话，显示内容，没有的话，显示URL
			res += "</a>";
			return res;
			break;
		case "l":
			//如果主命令为link或l的话
			if (typeof argu.url == "undefined")
			{
				console.error("PigBBS Command Compiler\nError:The path to which the link is pointed is not specified\nCode:5001\n%s{" + str + "}","color:red");
				return "";
				//如果没有指定链接指向的URL的话，报错
			}
			var res = "<a href='https://pigbbs.github.io/link?url=" + escape(argu.url) + "' target='_blank'>";
			if (typeof argu.content != "undefined")
				res += argu.content;
			else
				res += argu.url;
			//如果参数中有链接显示的内容的话，显示内容，没有的话，显示URL
			res += "</a>";
			return res;
			break;
			
		default:
			console.error("PigBBS Command Compiler\nError:There are no matching commands\nCode:ffff\n%s{" + str + "}","color:red");
			return "";
		
	}
	return "";
}
