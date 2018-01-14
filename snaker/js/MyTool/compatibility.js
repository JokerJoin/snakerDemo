var phoneheight,phonewidth,close_wFun;
var _w=window;
var _dom=document;
_w.onload=function(){
	if (_w.innerWidth){
		phonewidth = _w.innerWidth; 
	} else if ((_dom.body) && (_dom.body.clientWidth)) {
		phonewidth = _dom.body.clientWidth; 
	} 
	if (_w.innerHeight){
		phoneheight = _w.innerHeight; 
	}else if ((_dom.body) && (_dom.body.clientHeight)){
		phoneheight = _dom.body.clientHeight; 
	} 
	if (_dom._domElement && _dom._domElement.clientHeight && _dom._domElement.clientWidth) 
	{ 
		phoneheight = _dom._domElement.clientHeight; 
		phonewidth = _dom._domElement.clientWidth; 
	}
	if(!_w.cancelRequestAnimationFrame){
		_w.cancelRequestAnimationFrame=(_w.cancelAnimationFrame||_w.webkitCancelRequestAnimationFrame||_w.mozCancelRequestAnimationFrame||_w.oCancelReuqestAnimationFrame||_w.clearTimeout);
		_w.cancelNextRequestAnimationFrame = _w.cancelRequestAnimationFrame || _w.webkitCancelAnimationFrame || _w.webkitCancelRequestAnimationFrame || _w.mozCancelRequestAnimationFrame || _w.oCancelRequestAnimationFrame || clearTimeout;
	}
	if(!_w.requestAnimationFrame){
		_w.requestAnimationFrame=(_w.webkitRequestAnimationFrame || _w.mozRequestAnimationFrame || _w.oRequestAnimationFrame || _w.msRequestAnimationFrame || function(callback){return _w.setTimeout(callback,1000/60);});
	}
	
};



//获取url参数
//name type:string
function GetQueryString(name){
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r!=null)return  unescape(r[2]); return null;
}


/**
 * 删除数组指定元素
 * 
 */
Array.prototype.removeByValue = function(val) {
  for(var i=0; i<this.length; i++) {
    if(this[i] == val) {
      this.splice(i, 1);
      break;
    }
  }
}
/*
_w.addEventListener("touchstart",function(event){
				
},false);
_w.addEventListener("touchmove",function(event){
	event.preventDefault();
},false);
_w.addEventListener("touchend",function(event){
	
},false);
*/