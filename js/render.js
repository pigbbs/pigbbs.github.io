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
		display = display.replaceAll("<hr>","<input type=button value=举报 onclick=javascript:report();><hr />");
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
	var i = localStorage.getItem("cache-img-" + uuid);
	if (i != null)
		return i;
	const img = Bmob.Query("image");
	img.get(uuid).then(res => {
		i = res.content;
		var j = 1;
		while (typeof res["content"+j] != "undefined")
		{
			i += res["content"+j];
			j++;
		}
		localStorage.setItem("cache-img-" + uuid,i);
	}).catch(err => {
		console.log(err);
	});
}
function render_img(){
	document.getElementById("bbs-content-iframe").onload = function(){
		
		var s = setInterval(function(){
			var arr = document.getElementById("bbs-content-iframe").contentWindow.window.document.getElementsByClassName("user_upload_img");
			if (!arr.length)
				clearInterval(s);
			var i = 0;
			while (i != arr.length)
			{	
				var img = loadImage(arr[i].id);
				if (typeof img != "undefined")
				{
					let blob = image_dataURLtoBlob(img);
					let url = window.URL.createObjectURL(blob);
					arr[i].src = url;
					arr[i].onload = function () {
						window.URL.revokeObjectURL(url);
					};
					arr[i].className = "user_upload_img_success";
				}
				i++;
			}
		},500);
	};
};


