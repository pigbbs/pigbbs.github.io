function newcaptcha(canvasid)
{
   var arr = [0,1,2,3,4,5,6,7,8,9,"a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
   var str = "";
   var i = 0;
   while (i != 4)
   {
      str += arr[parseInt(Math.random()*arr.length)];
      i++;
   }
   var ctx = document.getElementById(canvasid).getContext("2d");
   var canvas = document.getElementById(canvasid);
   canvas.height = "50px";
   canvas.width = "200px";
   sessionStorage.setItem("captcha",str);
   ctx.fillStyle="#ff0000";
   ctx.font = "40px Arial";
   ctx.fillText(str,0,0);
}
function checkcaptcha(textid)
{
    var txt = document.getElementById(textid).value;
    if (txt == sessionStorage.getItem("captcha"))
    {
      sessionStorage.setItem("captcha","captcha");
      return true;
    }
    else
      return false;
}
