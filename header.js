var phoneheight,phonewidth;
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
	}
	if(!window.requestAnimationFrame){
		window.requestAnimationFrame=(window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback){return window.setTimeout(callback,1000/60);});
	}
}
