	/*
	 * PIGBBS 留言板源码 Copyright Pig Mail fat-pig-2020@outlook.com
	 * 我不指望你能读懂我的源代码
	 * 重构是不可能的
	 * 邮箱 pigbbs@outlook.com
	*/
document.getElementById("upload_file").onchange = function(){
	var file = document.getElementById("upload_file").files[0];
	//得到需要读取的文件
	var suffix = file.name.substring(file.name.lastIndexOf("."));
	//得到文件后缀名
	if (suffix == ".png" || suffix == ".svg" || suffix == ".bmp" || suffix == ".webp" || suffix == ".jpg" || suffix == ".gif" || suffix == ".jpeg")
	{
		//文件后缀名正确
		var reader = new FileReader();
		reader.readAsDataURL(file);
		//读取用户上传的文件，转换成DataURL格式
		reader.onload = function() {
			var file_dataurl = reader.result;
			sessionStorage.setItem("upload_file",file_dataurl);
			//缓存用户上传的文件
			if (sessionStorage.getItem('upload_file') != file_dataurl)
			{
				//当缓存区溢出时，清除缓存
				sessionStorage.removeItem('upload_file');
			}
			sessionStorage.setItem("upload_file_suffix",suffix);
			document.getElementById("submit_file").disabled = false;
			//启用提交文件按钮
			var blob = image_dataURLtoBlob(file_dataurl);
			//把DataURL转换成Blob对象
			var url = window.URL.createObjectURL(blob);
			//构建blob URL
			document.getElementById("upload_status").src = getblobAsText("<img height=100% width=100% src=" + url + " id=upload_image_frame>");
			//渲染页面
			document.getElementById("upload_status").onload = function() {
				document.getElementById("onload_status").contentWindow.window.document.getElementById("upload_image_frame").onload = function () {
					//当图片加载完毕后，删除blob URL(防盗链技术)
					window.URL.revokeObjectURL(url);
				};
			};
			
		};
	} else {
		//文件后缀名不正确
		document.getElementById("submit_file").disabled = true;
		//禁用提交文件按钮
		alert("目前仅支持图片文件上传\n文件类型限制为：.png .svg .bmp .webp .jpeg .jpg .gif");
		return;
	}
};
function image_dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:"image/*"});
}
function upload_file () {
	if (sessionStorage.getItem("upload_file") == null)
	{
		//当无缓存时，读取文件
		var file = document.getElementById("upload_file").files[0];
		//得到需要读取的文件
		var reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function () {
			//将需要读取的文件转换成DataURL
			var file_content = reader.result;
		}
	}
	else {
		var file_content = sessionStorage.getItem("upload_file");
		//读取缓存
	};
	var suffix = sessionStorage.getItem("upload_file_suffix");
	//读取缓存中的文件后缀名
	if (file_content.length > (20 * 1024 * 1024))
	{
		alert("文件过大，不支持大于20M的图片上传");
		return;
	}
	var price;
	if (file_content.length <  (1024 * 1024))
		price = 5;
	else {
		if (file_content.length < (2 * 1024 * 1024))
			price = 15;
		else {
			if (file_content.length < (4 * 1024 * 1024))
				price = 35;
			else {
				if (file_content.length < (8 * 1024 * 1024))
					price = 80;
				else {
					price = file_content.length * 12;
				};
			};
		};
	};

	if (confirm("文件即将上传\n文件类型：图片 文件后缀名：" + suffix + " 文件大小：" + file_content.length + "字节\n收费：" + price + "猪头\n是否同意收费？\n同意将开始上传 不同意则取消上传"))
	{
		if (checkrobot())
		{
			alert("请等待30秒后上传");
			return;
		}
		const userinfo = Bmob.Query("userinfo");
		const idb = Bmob.Query("image");
		const chat = Bmob.Query("chat");
		var fee_status = false;
		var success_bool = false;
		const uuid = sessionStorage.getItem("uuid");
		userinfo.get(uuid).then(res => {
			//得到用户数据
			var pigcoin = res.pigcoin;
			if (pigcoin < price)
				alert("你的猪头不足\n请充值");
			else {
				pigcoin -= price;
				userinfo.set("id",uuid);
				userinfo.set("pigcoin",pigcoin);
				sessionStorage.setItem("pigcoin",pigcoin);
				//扣款
				userinfo.save().then(res => {
					fee_status = true;
					idb.set("suffix",suffix);
					idb.set("content",file_content.substring(0,1024*1024*2));
					idb.set("content2",file_content.substring(1024*1024*2,1024*1024*5));
					idb.set("content3",file_content.substring(1024*1024*5,1024*1024*8));
					idb.set("content4",file_content.substring(1024*1024*8,1024*1024*11));
					idb.set("content5",file_content.substring(1024*1024*11,1024*1024*14));
					idb.set("content6",file_content.substring(1024*1024*14,1024*1024*17));
					idb.set("content7",file_content.substring(1024*1024*17,1024*1024*20));
					//提交文件数据
					idb.save().then(res => {
						//得到图片的uuid，得到留言板数据
						var image_uuid = res.objectId;
						chat.get(location.hash.substring(1)).then(res => {
							var bbs_content = res.content;
							bbs_content = "[" + sessionStorage.getItem('username') + "]<font color=red>" + new Date().toString() + "</font><br><img =id=" + image_uuid + " class=user_upload_img><hr>" + bbs_content;
							if (((res.level + 1) * 8 * 1024) < bbs_content.length)
							{
								alert("留言板储存空间已达上限，请升级留言板");
								gopage(0);
								return;
							};
							chat.set("id",location.hash.substring(1));
							chat.set("content",bbs_content);
							sessionStorage.setItem("content",bbs_content);
							sessionStorage.setItem("level",res.level);
							//提交留言板数据，操作完成
							chat.save().then(res => {
								gopage(1);
								alert("操作成功！");
								success_bool = true;
							}).catch(err => {
								alert("操作失败！\n无法提交留言板数据");
							});
						}).catch(err => {
							alert("操作失败！\n无法获取留言板数据");
						});
					}).catch(err => {
						alert("操作失败！\n无法提交图片数据");
					});
					if (!success_bool && fee_status)
					{
						//如果扣款成功但提交文件失败，则撤销操作
						pigcoin += price;
						userinfo.set("id",uuid);
						userinfo.set("pigcoin",pigcoin);
						sessionStorage.setItem("pigcoin",pigcoin);
						userinfo.save().then(res => {
							//操作撤销成功
							console.log("操作撤销成功！");
						}).catch(err => {
							//操作撤销失败
							alert("操作撤销失败，请把以下代码发给pigbbs@outlook.com处理\n" + btoa(uuid) + "|p" + btoa(price.toString()) + "|t" + btoa(escape(new Date().toString(16))));
						});
					}
				}).catch(err => {
					alert("操作失败！\n无法提交用户信息");
				});
			}; 
		}).catch(err => {
			alert("操作失败！\n错误：无法取得用户信息");
		});

	}
};
