/**
 * Created by scokill.zhu on 2016/3/15.
 */
/*
 相同域名，异步加载js文件优化方法
 EFWS.Script.loadScriptXhrInjection(url,onload,bOrder);
 EFWS.Script.loadScriptXhrInjection("xxxx.js",函数名 or NULL,True or False);
 名词解释
 url:ajax异步访问路径
 onload:脚本加载后触发函数
 bOrder:如果该脚本需要依赖其他脚本按顺序执行，则设置为true(默认false)

 跨域脚本加载优化方法：
 ① DOM加载脚本：EFWS.Script.loadScriptDomElement("xxxx.js",函数名 or 不填);
 ② window.write加载脚本：EFWS.Script.loadScriptDocWrite("xxxx.js",函数名 or 不填)
 */
var EFWS={Script:null,LoadImg:null};
EFWS.Script={
    loadScripts:function(aUrls,onload){
        var nUrls=aUrls.length;
        var bDifferent=false;
        for(var i=0;i<nUrls;i++){
            if(EFWS.Script.differentDomain(aUrls[i])){
                bDifferent=true;
                break;
            }
        }
        //选择最佳加载方案
        var loadFunc=EFWS.Script.loadScriptXhrInjection;
        if(bDifferent){
            if(-1 != navigator.userAgent.indexOf('Firefox') || -1!=navigator.userAgent.indexOf('Opera')){
                loadFunc=EFWS.Script.loadScriptDomElement;
            }else{
                loadFunc=EFWS.Script.loadScriptDocWrite;
            }
        }
        for(var i=0;i<nUrls;i++){
            loadFunc(aUrls[i],(i + 1 == nUrls ? onload : null),true);
        }
    },
    differentDomain:function(url){
        if(0===url.indexOf('http://') || 0===url.indexOf('https://')){
            var mainDoman=document.location.protocol+"://"+document.location.host+"/";
            return (0!==url.indexOf(mainDoman));
        }
        return false;
    },
    loadScript:function(url,onload){
        EFWS.Script.loadScriptDomElement(url,onload);
    },
    loadScriptDomElement:function(url,onload){
        var domscript=document.createElement('script');
        domscript.src=url;
        if(onload){
            domscript.onloadDone=false;
            domscript.onload=onload;
            domscript.onreadystatechange=function(){
                if(("loaded"===domscript.readyState || "complete"===domscript.readyState) && !domscript.onloadDone){
                    domscript.onloadDone=true;
                    domscript.onload();
                }
            }
        }
        document.getElementsByTagName("head")[0].appendChild(domscript);
    },
    loadScriptDocWrite:function(url,onload){
        document.write('<scr'+'ipt src="'+url+'" type="text/javascript"></scr'+'ipt>');
        if(onload){
            EFWS.addHandler(window,"load",onload);
        }
    },
    queuedScripts:new Array(),
    loadScriptXhrInjection:function(url,onload,bOrder){
        var iQ=EFWS.Script.queuedScripts.length;
        if(bOrder){
            var qScript={response:null,onload:onload,done:false};
            EFWS.Script.queuedScripts[iQ]=qScript;
        }
        var xhrObj=EFWS.Script.getXHRObject();
        xhrObj.onreadystatechange=function(){
            if(xhrObj.readyState==4){
                if(bOrder){
                    EFWS.Script.queuedScripts[iQ].response=xhrObj.responseText;
                    EFWS.Script.injectScripts();
                }
            }else{
                eval(xhrObj.responseText);
                if(onload){
                    onload();
                }
            }
        };
        xhrObj.open('GET',url,true);
        xhrObj.send('');
    },
    injectScripts:function(){
        var len=EFWS.Script.queuedScripts.length;
        for(var i=0;i<len;i++){
            var qScript=WFES.Script.queuedScripts[i];
            if(!qScript.done){
                if(!qScript.response){
                    break;
                }else{
                    eval(qScript.response);
                    if(qScript.onload){
                        qScript.onload();
                    }
                    qScript.done=true;
                }
            }
        }
    },
    getXHRObject:function(){
        var xhrObj=false;
        try{
            xhrObj=new XMLHttpRequest();
        }catch(e){
            var aTypes=["Msxml2.XMLHTTP.6.0","Msxml2.XMLHTTP.3.0","Msxml2.XMLHTTP","Microsoft.XMLHTTP"];
            var len=aTypes.length;
            for(var i=0;i<len;i++){
                try{
                    xhrObj=new ActiveXObject(aTypes[i]);
                }catch(e){
                    continue;
                }
                break;
            }
        }finally{
            return xhrObj;
        }
    }
};
EFWS.LoadImg={
    loadLoadImgDomElement:function(imgUrl,divClass,Index,Width,Height,W,H){
        var classNames=document.getElementsByClassName(divClass);
        //for(var i=0;i<classNames.length;i++){
        EFWS.LoadImg.createBackground(classNames[Index],imgUrl,Width,Height,W,H);
        //}
    },
    createBackground:function(divClass,imgUrl,Width,Height,W,H){
        divClass.style.backgroundImage = 'url('+imgUrl+')';
        divClass.style.backgroundSize=W+"%"+H+"%";
        divClass.style.backgroundPosition =Width+'%'+Height+'%';//'-100px -100px';
    }
};
EFWS.addHandler=function(elem,type,func){
    if(elem.addEventListener){
        elem.addEventListener(type,func,false);
    }else if(elem.attachEvent){
        elem.attachEvent("on"+type,func);
    }
};

