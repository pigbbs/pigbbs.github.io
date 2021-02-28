	/*
	 * PIGBBS 留言板源码 Copyright Pig Mail fat-pig-2020@outlook.com
	 * 我不指望你能读懂我的源代码
	 * 重构是不可能的
	 * 邮箱 pigbbs@outlook.com
	*/
function buyspace(space_level, need_pigcoin) {
	var pigcoin = sessionStorage.getItem("pigcoin");
	//确认是否要升级留言板
	pigcoin = parseInt(pigcoin);
	document.getElementById("bbs-content-iframe").src = getblobAsText("<span style='font-color:3em'>购买储存空间</span><br><input type=button value=返回 onclick=javascript:window.parent.window.gopage(0);><br>等级：" + space_level + " 价格：" + need_pigcoin + "猪头<br>我的猪头：<span id=my-pigcoin>" + pigcoin + "</span>个<br>BBSID:" + location.hash.substring(1) + "<br><font color=red>小猪提示：您正在进行金钱交易<br>请谨慎操作，支付后概不退还<br><div id=get-status></div><br><input type=button value=购买 onclick=javascript:submit_form_buyspace(" + space_level + "," + need_pigcoin + ");><input type=button value=退出 onclick=javascript:window.parent.window.gopage(1);>");
}
function submit_form_buyspace(space_level, need_pigcoin) {
	var bbsid = location.hash.substring(1);
	var uuid = sessionStorage.getItem("uuid");
	const chatinfo = Bmob.Query("chat");
	const query = Bmob.Query("userinfo");
	query.get(uuid).then(res =>{
		//得到用户数据
		console.log(res);
		var userinfo = res;
		sessionStorage.setItem("pigcoin", userinfo.pigcoin);
		document.getElementById("bbs-content-iframe").contentWindow.window.document.getElementById("my-pigcoin").innerHTML = userinfo.pigcoin;
		sessionStorage.setItem("use4image", userinfo.use4image);
		sessionStorage.setItem("useHTML", userinfo.useHTML);
		sessionStorage.setItem("BBSnum", userinfo.BBSnum);
		//更新用户数据，并检查是否有足够的猪头去升级留言板
		if (need_pigcoin > userinfo.pigcoin) document.getElementById("bbs-content-iframe").contentWindow.window.document.getElementById("get-status").innerHTML = "<font color=red>交易失败！您的猪头不足<input type=button value=点我充值 onclick=javascript:window.open('https://chenglan28.github.io/avs-account/pigcoin');></font>";
		else {
			chatinfo.get(bbsid).then(res =>{
				//得到留言板数据
				var bbsinfo = res;
				bbsinfo.level = bbsinfo.level;
				sessionStorage.setItem("level", bbsinfo.level);
				if (bbsinfo.level == "free") bbsinfo.level = 0;
				else bbsinfo.level = parseInt(bbsinfo.level);
				var maxlevel = 255 - bbsinfo.level;
				if (space_level > maxlevel) {
					document.getElementById("bbs-content-iframe").contentWindow.window.document.getElementById("get-status").innerHTML = "<font color=red>交易失败！留言板等级过大，无法交易！</font><br><input type=button value=返回 onclick=javascrpt:gopage(1);>";
					return;
				}
				//计算购买等级是否超过上限，防止有人篡改升级的等级
				userinfo.pigcoin -= need_pigcoin;
				bbsinfo.level += space_level;
				//扣除猪头，增加等级
				chatinfo.set("id", bbsid);
				chatinfo.set("level", bbsinfo.level);
				document.getElementById("bbs-level").innerHTML = bbsinfo.level;
				//显示留言板等级
				show_space();
				//显示空间使用大小
				query.set("id", uuid);
				query.set("pigcoin", userinfo.pigcoin);
				sessionStorage.setItem("pigcoin", userinfo.pigcoin);
				//在本地更新用户的猪头数据
				document.getElementById("bbs-content-iframe").contentWindow.window.document.getElementById("my-pigcoin").innerHTML = userinfo.pigcoin;
				//显示用户的猪头
				sessionStorage.setItem("level", bbsinfo.level.toString());
				//在本地更新留言板等级
				show_space();
				//显示空间使用大小
				query.save().then(res =>{
					console.log(res);
					//提交用户数据给服务器
					chatinfo.save().then(res =>{
						//提交BBS数据给服务器
						//如果全部成功，则交易成功
						document.getElementById("bbs-level").innerHTML = bbsinfo.level;
						document.getElementById("bbs-content-iframe").contentWindow.window.document.getElementById("get-status").innerHTML = "<font color=green>交易成功！</font>";
					}).
					catch(err =>{
						//如果提交用户数据给服务器成功，提交BBS数据给服务器失败，则撤销操作
						console.log(err);
						document.getElementById("bbs-content-iframe").contentWindow.window.document.getElementById("get-status").inenrHTML = "<font color=red>交易失败！未知的错误！<br>正在撤销操作......</font>";
						bbsinfo.level -= space_level;
						//减去留言板等级
						document.getElementById("bbs-level").innerHTML = bbsinfo.level;
						//显示留言板等级
						sessionStorage.setItem("level", bbsinfo.level);
						//在本地更新留言板等级
						show_space();
						//显示空间使用大小
						userinfo.pigcoin += need_pigcoin;
						//增加用户的猪头
						document.getElementById("my-pigcoin").innerHTML = userinfo.pigcoin;
						//显示用户猪头
						sessionStorage.setItem("pigcoin", userinfo.pigcoin);
						//在本地更新用户的猪头
						query.set("id", uuid);
						query.set("pigcoin", userinfo.pigcoin);
						query.save().then(res =>{
							console.log(res);
							document.getElementById("bbs-content-iframe").contentWindow.window.document.getElementById("get-status").innerHTML = "<font color=red>交易失败！未知的错误！<br>操作撤销成功！</font>";
							//提交用户信息给服务器，如果成功，则撤销成功
						}).
						catch(err =>{
							console.log(err);
							//如果提交失败，则生成事件ID，让用户向管理员提交撤销请求，并附上事件ID
							var num = encodeURI(uuid) + "pdjcp" + btoa(uuid) + "ps3rp" + btoa((pigcoin * 10 + 8) * 2 - 18) + "pdatep" + btoa(encodeURI(new Date()));
							document.getElementById("bbs-content-iframe").contentWindow.window.document.getElementById("get-status").innerHTML = "<font color=red>交易失败！未知的错误！<br>操作撤销失败！<br>请把此页截图发送给<a href=fat-pig-2020@outlook.com>fat-pig-2020@outlook.com</a><br>我们稍后便会处理<br>事件ID:<font color=blue>" + num + "</font></font>";
						});
					});
				}).
				catch(err =>{
					//提交用户信息给服务器失败，取消操作
					console.log(err);
					document.getElementById("bbs-content-iframe").contentWindow.window.document.getElementById("get-status").innerHTML = "<font color=red>交易失败！未知的错误！</font>";
				});
			}).
			catch(err =>{
				//获取留言板信息失败，取消操作
				console.log(err);
				document.getElementById("bbs-content-iframe").contentWindow.window.document.getElementById("get-status").innerHTML = "<font color=red>交易失败！未知的错误！</font>";
			});
		}
	}).
	catch(err =>{
		//获取用户信息失败，取消操作
		console.log(err);
		document.getElementById("bbs-content-iframe").contentWindow.window.document.getElementById("get-status").innerHTML = "<font color=red>交易失败！未知的错误！</font>";
	});

}
