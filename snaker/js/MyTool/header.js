var phoneheight,phonewidth,closeWindowFun;
var _w=window;
var _dom=document;
window.onresize = function() {
	if (window.innerWidth){
		phonewidth = window.innerWidth;
	} else if ((document.body) && (document.body.clientWidth)) {
		phonewidth = document.body.clientWidth;
	}
	if (window.innerHeight){
		phoneheight = window.innerHeight;
	}else if ((document.body) && (document.body.clientHeight)){
		phoneheight = document.body.clientHeight;
	}
	if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth)
	{
		phoneheight = document.documentElement.clientHeight;
		phonewidth = document.documentElement.clientWidth;
	}

};
window.onload=function(){
	if (window.innerWidth){
		phonewidth = window.innerWidth; 
	} else if ((document.body) && (document.body.clientWidth)) {
		phonewidth = document.body.clientWidth; 
	} 
	if (window.innerHeight){
		phoneheight = window.innerHeight; 
	}else if ((document.body) && (document.body.clientHeight)){
		phoneheight = document.body.clientHeight; 
	} 
	if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) 
	{ 
		phoneheight = document.documentElement.clientHeight; 
		phonewidth = document.documentElement.clientWidth; 
	}
	if(!window.cancelRequestAnimationFrame){
		window.cancelRequestAnimationFrame=(window.cancelAnimationFrame||window.webkitCancelRequestAnimationFrame||window.mozCancelRequestAnimationFrame||window.oCancelReuqestAnimationFrame||window.clearTimeout);
		window.cancelNextRequestAnimationFrame = window.cancelRequestAnimationFrame
			|| window.webkitCancelAnimationFrame
			|| window.webkitCancelRequestAnimationFrame
			|| window.mozCancelRequestAnimationFrame
			|| window.oCancelRequestAnimationFrame
			|| window.msCancelRequestAnimationFrame
			|| clearTimeout;
	}
	if(!window.requestAnimationFrame){
		window.requestAnimationFrame=(window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback){return window.setTimeout(callback,1000/60);});
	}

	if (!document.getElementsByClassName) {
		document.getElementsByClassName = function (className, element) {
			var children = (element || document).getElementsByTagName('*');
			var elements = new Array();
			for (var i = 0; i < children.length; i++) {
				var child = children[i];
				var classNames = child.className.split(' ');
				for (var j = 0; j < classNames.length; j++) {
					if (classNames[j] == className) {
						elements.push(child);
						break;
					}
				}
			}
			return elements;
		};
	}
	
	
};
//调用ajax函数
var xmlhttp;
function Postajax(url,ValStr){
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	} else {// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange=function(){
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
			var arr=xmlhttp.responseText;
			var json=eval('('+arr+')');
			if(json["index"]=="1"){
				window.location.href=json["url"];
			}
			if(json["errcode"]){
				alert(json["errmsg"]);
			}
			if(json["index"]=="100"){
				alert(json["title"]);
			}
        }
    };
    //getHttp(xmlhttp);
	xmlhttp.open("POST",url,true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send(ValStr);
}
//获取url参数
function GetQueryString(name){
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r!=null)return  unescape(r[2]); return null;
}
//判断（手机）机型
var browser={
	versions:function(){
		var u = navigator.userAgent, app = navigator.appVersion;
		return {
			trident: u.indexOf('Trident') > -1, //IE内核
			presto: u.indexOf('Presto') > -1, //opera内核
			webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
			gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
			mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
			ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
			android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
			iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
			iPad: u.indexOf('iPad') > -1, //是否iPad
			webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
			weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
			qq: u.match(/\sQQ/i) == " qq" //是否QQ
		};
	}(),
	language:(navigator.browserLanguage || navigator.language).toLowerCase()
};

//关闭浏览器窗口事件
function closeWindow(){
	var ua = navigator.userAgent.toLowerCase();
	if(ua.match(/MicroMessenger/i)=="micromessenger") {
		WeixinJSBridge.call('closeWindow');
 	} else {
		_w.close();
	}
}

//非微信浏览器不能浏览
function _isWeiXin(){
	_dom.getElementsByTagName("body")[0].innerHTML="123";
	var ua = navigator.userAgent.toLowerCase();
	if(ua.match(/MicroMessenger/i)=="micromessenger") {
		
 } else {
 		//_dom.getElementById("scene").innerHTML="123";
		_dom.getElementsByTagName("body")[0].innerHTML="";
	}
}
