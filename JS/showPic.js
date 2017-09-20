	function showPic(whichpic){
		if (!document.getElementById("placeholder")) return false;
		var source=whichpic.getAttribute("href");
		var placeholder=document.getElementById("placeholder");
		if (placeholder.nodeName!="IMG") return false;
		placeholder.setAttribute("src",source);
		if (document.getElementById("description")) {
			var text=whichpic.getAttribute("title") ? whichpic.getAttribute("title") : " ";
			var description=document.getElementById("description");
			if (description.firstChild.nodeType==3) {
				//由于我们要改变的是p元素的文本内容，因为包含在p元素的文本是另一种节点（文本节点），它是p元素的第一个子节点。因此我想要得到的其实是它的第一个子节点的nodeValue属性值。
				description.firstChild.nodeValue=text;	
			}
		}
		return true;
	}

	//将JS代码打包，并把这个函数添加到Windows对象的onload事件上去，这样DOM就可以正常工作了。
	window.onload=function(){
		if (!document.getElementByTagName) return false;
		var links=document.getElementByTagName("a");
		for(var i=0;i<links.length;i++){
			if (links[i].getAttribute("class")=="popup") {
				links.onclick=function(){
					popUp(this.getAttribute("href"));
					return false;
				}
			}
		}
	}
	//打开一个名为popup的新窗口
	function popUp(winURL){
		window.onpen(winURL,"popup","width=320,height=480");	
	}


	function prepareGallery(){
		if (!document.getElementByTagName) return false;
		if (!document.getElementById) return false;
		if (!document.getElementById("imagegallery")) return false;
		var gallery=document.getElementById("imagegallery");
		var links=document.getElementByTagName("a");
		for(var i=0;i<links.length;i++){

			links[i].onclick=function(){
				return showPic(this) ? false : true;
			}
		}
	}

/*	这个函数将把那些在页面加载完毕时执行的函数创建为一个队列。最简单的方式其实是：
	window.onload=function(){
	firstFunction();
	secondFunction();
	}
	但这种适用需要绑定的函数不是很多的场合。故我们用下面这个addLoadEvent(由Simon Willison编写)函数
*/

	function addLoadEvent(func){
		var oldonload=window.onload;
		if (typeof window.onload!='function') {
			window.onload=func;
		}else{
			window.onload=function(){
				oldonload();
				func();
			}
		}
	}
	addLoadEvent(prepareGallery);
