function newcaptcha(canvasid)
{
   try {
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
   sessionStorage.setItem("captchastr",str);
  // alert(str);
   ctx.fillStyle="black";
   ctx.fillRect(0,0,400,100);
   ctx.font = "40px Arial";
   var rand1 = [parseInt((Math.random() - 0.5) * 10),parseInt((Math.random() - 0.5) * 10),parseInt((Math.random() - 0.5) * 10),parseInt((Math.random() - 0.5) * 10)];
   console.log(rand1);
   var rand2 = [parseInt((Math.random() - 0.5) * 50),parseInt((Math.random() - 0.5) * 50),parseInt((Math.random() - 0.5) * 50),parseInt((Math.random() - 0.5) * 50)];
   console.log(rand2);
   var rand3 = ["#" + parseInt(Math.random() * 192 + 64).toString(16) + parseInt(Math.random() * 192 + 64).toString(16) + parseInt(Math.random() * 192 + 64).toString(16),"#" + parseInt(Math.random() * 192 + 64).toString(16) + parseInt(Math.random() * 192 + 64).toString(16) + parseInt(Math.random() * 192 + 64).toString(16),"#" + parseInt(Math.random() * 192 + 64).toString(16) + parseInt(Math.random() * 192 + 64).toString(16) + parseInt(Math.random() * 192 + 64).toString(16),"#" + parseInt(Math.random() * 192 + 64).toString(16) + parseInt(Math.random() * 192 + 64).toString(16) + parseInt(Math.random() * 192 + 64).toString(16)];
   console.log(rand3);
   ctx.fillStyle=rand3[0];
   ctx.fillText(str.substring(0,1),50 + rand2[0],50 + rand1[0]);
   ctx.fillStyle=rand3[1];   
   ctx.fillText(str.substring(1,2),150 + rand2[1],50 + rand1[1]);
   ctx.fillStyle=rand3[2];
   ctx.fillText(str.substring(2,3),250 + rand2[2],50 + rand1[2]);  
   ctx.fillStyle=rand3[3];
   ctx.fillText(str.substring(3,4),350 + rand2[3],50 + rand1[3]);
   } catch (err) { alert(err); }
}
function checkcaptcha(textid)
{
    var txt = document.getElementById(textid).value;
    if (txt == sessionStorage.getItem("captchastr"))
    {
      sessionStorage.setItem("captcha","captcha");
      return true;
    }
    else
      return false;
}
