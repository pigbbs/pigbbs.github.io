/* if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
   location.href = "/bbs/apple-err.html";
}//检查是否是苹果设备
*/

if (sessionStorage.getItem("captcha") == null)
  location.href = "/captcha#" + location.href;
//检查是否填写过验证码
function checklogin()
{
   //检查是否登录
  sessionStorage.setItem("url",location.href);
  if (sessionStorage.getItem("uuid") == null || sessionStorage.getItem("username") == null)
    location.href = "/login#" + encodeURI(location.href);
}
function checkrobot()
{
   var updatetime = sessionStorage.getItem("updatetime");
   updatetime = parseInt(updatetime);
   var mstime = new Date().getTime();
   //检查是否是机器人，两次请求这个函数的间隔低于30秒则返回true
   if ((mstime - updatetime) < 30 * 1000)
     return true;
   else
   {
     sessionStorage.setItem("updatetime",mstime);
     return false;
   }
}
function mourning(){
   //祭奠Dinnis Ritchie
   var obj = document.getElementById("mourning-Dennis-Ritchie");
   var audio_element = document.createElement("audio");
   audio_element.src = "https://pig-cmd.github.io/upload_file/clock.wav";
   audio_element.onload = function(){
      audio_element.play();
   };
   //播放鸣钟的声音
   obj.className = "show-element";
   //显示元素
   var d = new Date();
   var date = d.getFullYear() + "年" + (d.getMonth() + 1) + "月" + d.getDate() + "日";
   obj.innerHTML = "<center><pre>今天是 <strong>" + date + "</strong></pre></center>";
   var die = 2011;
   obj.innerHTML += "<center><pre>Dennis Ritchie先生逝世" + (d.getFullYear() - die) + "周年</pre></center>";
   obj.innerHTML += "<br><blockquote>当乔布斯去世时，享受到了声势浩大的追思。相形之下，里奇先生对当代科技进程做出了更大的贡献，可公众甚至不知道他是谁，这十分不公平。</blockquote>";
   obj.innerHTML += "<br><blockquote>如果说，乔布斯是可视化产品中的国王，那么里奇就是不可见王国中的君主。乔布斯的贡献在于，他如此了解用户的需求和渴求，以至于创造出了让当代人乐不思蜀的科技产品。然而，却是里奇先生为这些产品提供了最核心的部件，人们看不到这些部件，却每天都在使用着。</blockquote>";
   obj.innerHTML += "<br><br><br>牛顿说他是站在巨人的肩膀上，如今，我们都站在里奇的肩膀上。";
   obj.innerHTML += "<br><br><br><br><br>为这位伟大的C语言之父、Unix之父 Dennis Ritchie 先生 默哀半分钟";
   setTimeout(function(){
      obj.innerHTML += "<br><input type=button value=关闭 onclick=javascript:close_mourning_box();>";
      audio_element.play();
      //30秒后再次播放声音，显示关闭按钮
   },30 * 1000);
};
function page_gray()
{
   //把页面变成灰色
   document.body.innerHTML += "<style>html {-webkit-filter: grayscale(100%);-moz-filter: grayscale(100%);  -ms-filter: grayscale(100%);    -o-filter: grayscale(100%);    filter: grayscale(100%);    filter: progid:DXImageTransform.Microsoft.BasicImage(grayscale=1); }</style>";
}
function close_mourning_box()
{
   //隐藏元素
   document.getElementById("mourning-Dennis-Ritchie").className = "hide-element";
}
var d = new Date();
if (d.getMonth() == 9 && d.getDate() == 12)
{
   page_gray();
   if (location.href == "https://pigbbs.github.io/")
      mourning();
   //如果是10月12日，把页面变成灰色，如果URL是主页，调用祭奠Dennis Ritchie的函数
}
