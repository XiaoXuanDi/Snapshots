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

/*	JS提供了insertBefore方法（在已有元素前插入一个新元素）。但是没有insertAfter方法
	但我们可以自己编写。如下即是。它和上面的addLoadEvent()方法一样都是通用函数，我们应该一起收录。
*/
	function insertAfter(newElement,targetElement){
		var parent=targetElement.parentNode;
		if (parent.lastChild==targetElement) {
			parent.appendChild(newElement);
		}else{
			parent.insertBefore(newElement,targetElement.nextSibing);
		}
	}



	function preparePlaceholder(){
		if (!document.createElement) return false;
		if (!document.createTextNode) return false;
		if (!document.getElementById) return false;
		if (!document.getElementById("imagegallery")) return false;
		var placeholder=document.createElement("img");
		placeholder.setAttribute("id","placeholder");
		placeholder.setAttribute("src","./PIC/kongbai.png");
		placeholder.setAttribute("alt","my image gallery");
		var description=document.createElement("p");
		description.setAttribute("id","description");
		var desctext=document.createTextNode("Choose an image!!");
		description.appendChild(desctext);
		var gallery=document.getElementById("imagegallery");
		insertAfter(placeholder,gallery);
		insertAfter(description,placeholder);
	}


	function prepareGallery(){
		if (!document.getElementsByTagName) return false;
		if (!document.getElementById) return false;
		if (!document.getElementById("imagegallery")) return false;
		var gallery=document.getElementById("imagegallery");
		var links=gallery.getElementsByTagName("a");
		for(var i=0;i<links.length;i++){
			links[i].onclick=function(){
				return showPic(this);
			}
			links[i].onkeypress=links[i].onclick;
		}
	}




	function showPic(whichpic){
		if (!document.getElementById("placeholder")) return false;
		var source=whichpic.getAttribute("href");
		var placeholder=document.getElementById("placeholder");
		placeholder.setAttribute("src",source);
		if (!document.getElementById("description")) return false;
		if (whichpic.getAttribute("title")){
			var text=whichpic.getAttribute("title");
		}else{
			var text=" ";
		}
		var description=document.getElementById("description");
		if (description.firstChild.nodeType==3) {
			//由于我们要改变的是p元素的文本内容，因为包含在p元素的文本是另一种节点（文本节点），它是p元素的第一个子节点。因此我想要得到的其实是它的第一个子节点的nodeValue属性值。
			description.firstChild.nodeValue=text;	
		}
		return false;
	}


	addLoadEvent(preparePlaceholder);
	addLoadEvent(prepareGallery);
