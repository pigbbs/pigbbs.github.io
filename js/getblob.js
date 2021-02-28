	function getblobAsText(text)
	{
		try {
			var blob = new Blob([text],{type:"text/html"});
		} catch(err) {
			window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
			if (BlobBuilder && err.name == "TypeError")
			{
				var blob_obj = new BlobBuilder();
				blob_obj.append([text]);
				var blob = blob_obj.getBlob("text/html");
			} else {
				if (err.name == "InvalidStateError")
				{
					var blob = new Blob([text],{type:"text/html"});
				} else {
					alert("你的浏览器不支持Blob对象，请更换浏览器");
					location.href = "/support";
				}
			}
		}
		return (window.URL.createObjectURL(blob));
		
	}
