	var search = {};
search.InBBS = function ()
	{
		var keyword = document.getElementById("keyword").value;
		//取得关键词
		var content = sessionStorage.getItem("content");
		var start_time = new Date().getTime();
		//取得留言板内容
		var arr = [];
		var i = 0;
		//使用arr数组来储存匹配结果
		while (content.indexOf(keyword) != -1)
		{
			arr[i] = {};
			arr[i].position = content.indexOf(keyword);
			//得到关键词位置
			arr[i].page = parseInt(arr[i].position / 1024) + 1;
			//计算页面位置
			if (arr[i].positon > 20)
			{
				//如果关键词的位置在留言板开始的30个字符之后，截取上下文60个字符
				arr[i].content = content.substring(arr[i].position - 30,arr[i].position + 30);
			
			}
			else {
				//截取从开头到关键词后30个字符
				arr[i].content = content.substring(0,arr[i].position + 30);
			}
			i++;
			content = content.substring(arr[i-1].position + keyword.length);
		}
		var end_time = new Date().getTime();
		if (arr.length > 1)
		{
			//匹配结果至少为2个时，开始排序
			var i = 0;
			var j = 0;
			while ((i + 1) != arr.length)
			{
				j = i;
				while ((j + 1) != arr.length)
				{
					if (arr[j].position > arr[j + 1].position)
					{
						//如果前一项大于后一项，交换位置
						var tmp = arr[j];
						arr[j] = arr[j + 1];
						arr[j + 1] = tmp;
					}
					j++;
				}
				i++;
			}
		}
		var sort_time = new Date().getTime();
		var i = 0;
		var letter = "<input type=button onclick=javascript:window.parent.window.gopage(1); value=返回><br><center><span style='font-size:2em'>猪猪留言板智能搜索系统</span><br>为你找到" + arr.length + "个匹配结果 查找用时" + (end_time - start_time) + "毫秒 排序用时" + (sort_time - end_time) + "毫秒 总共用时" + (sort_time - start_time) + "毫秒</center><hr>";
		while (i != arr.length)
		{
			letter += "<strong>第" + arr[i].page + "页 第" + arr[i].position + "个字符<iframe src=" + getblobAsText(arr[i].content) + " height=10% width=80%>Not support this frame.Please change the browser.</iframe><br><input type=button value=跳转 onclick=javascript:window.parent.window.gopage(" + arr[i].page + ");><hr>";
			i++;
		}
		console.log(arr);
		document.getElementById("bbs-content-iframe").src = getblobAsText(letter);
	}
