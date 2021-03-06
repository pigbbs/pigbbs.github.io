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
			if (sessionStorage.getItem('upload_file') == file_dataurl)
			{
				//当缓存区溢出时，清除缓存
				sessionStorage.removeItem('upload_file');
			}
			document.getElementById("submit_file").disabled = false;
			//启用提交文件按钮
			var blob = image_dataURLtoBlob(file_dataurl);
			//把DataURL转换成Blob对象
			var url = window.URL.createObjectURL(blob);
			//构建blob URL
			document.getElementById("upload_status").src = getblobAsText("<img height=100% width=100% src=" + url + " id=upload_image_frame>");
			//渲染页面
			document.getElementById("upload_status").contentWindow.window.document.getElementById("upload_image_frame").onload = function () {
				//当图片加载完毕后，删除blob URL(防盗链技术)
				window.URL.revokeObjectURL(url);
			};
			
		};
	} else {
		//文件后缀名不正确
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
