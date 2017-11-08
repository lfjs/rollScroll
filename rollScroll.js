/**
 * Created by Administrator on 2017/10/18.
 */
//"use strict";
var configRoll = {
	rollID: 'rollID'
};
//if (!document.getElementsByClassName) {
//	document.getElementsByClassName = function(className, element) {
//		var children = (element || document).getElementsByTagName('*');
//		var elements = new Array();
//		for (var i = 0; i < children.length; i++) {
//			var child = children[i];
//			var classNames = child.className.split(' ');
//			for (var j = 0; j < classNames.length; j++) {
//				if (classNames[j] == className) {
//					elements.push(child);
//					break;
//				}
//			}
//		}
//		return elements;
//	};
//}
var rollMovement = '';
//var rollBox = document.getElementById('roll');
var rollBox = document.getElementsByClassName('roll')[0];
//for(i=0;i<rollBox.len;i++){
//
//}
rollBox.style.overflowY = 'hidden';
rollBox.style.position = 'relative';
var roller = document.createElement('div');
roller.onmousedown = function(event){
	var event1 = event || window.event;
	/*为了阻止拖动浏览器中元素时发生默认事件，
	 例如拖动图片时会出现一个新窗口显示该图片，下面代码可以阻止这种事件发生
	 */
	if (event1.preventDefault) {
		event1.preventDefault();
	} else {
		event1.returnValue = false;
	}
	rollMovement = event1.clientY;

	document.onmousemove = function(e){
		var evt = e || window.event;
		var temp = evt.clientY == rollMovement?0:evt.clientY-rollMovement;
		rollMovement = evt.clientY;

		rollBox.scrollTop=rollBox.scrollTop
			+temp*(rollBox.clientHeight/(rollBox.clientHeight-((rollBox.clientHeight*rollBox.clientHeight)/rollBox.scrollHeight)));
			//+evt.movementY*(rollBox.scrollHeight/rollBox.clientHeight);
		roller.style.top =(
				rollBox.scrollTop
					//+（窗口高度-滚动条高度）*(内容滚动量/（内容总高度-窗口总高度）)
				+((rollBox.clientHeight-((rollBox.clientHeight*rollBox.clientHeight)/rollBox.scrollHeight))*(rollBox.scrollTop/(rollBox.scrollHeight-rollBox.clientHeight)))
			)+'px';
		//(function (obj){
		//	for(x in obj){
		//		console.log(x+'：'+obj[x])
		//	}
		//})(evt)
	}
};
document.onmouseup = function(){
	document.onmousemove = function(){}
};
roller.innerHTML = '';
roller.id = 'roller';
roller.style.minWidth = '25px';
roller.style.position = 'absolute';
roller.style.top = '0px';
roller.style.right = '0px';
roller.style.backgroundColor = 'gray';
roller.style.fontFamily = '微软雅黑';
roller.style.cursor = '-webkit-grab';
roller.style.height = (rollBox.clientHeight*rollBox.clientHeight)/rollBox.scrollHeight+'px';
var consoleBox = document.createElement('div');
//document.body.appendChild(consoleBox);

var rollScrollFunc = function (e){
//rollBox.DOMMouseScroll = function(e){
	//rollBox.onscroll = function(e){
	var evt = e || window.event;
	if(typeof (evt.wheelDelta) == "undefined"){
		rollBox.scrollTop=evt.detail>0?rollBox.scrollTop+100:rollBox.scrollTop-100;
	}else{
		rollBox.scrollTop=rollBox.scrollTop-evt.wheelDelta;
	}
	consoleBox.innerHTML = 'consoleBox' + '<br/>'
		+ 'clientHeight：' + rollBox.clientHeight + '<br/>'
		+ 'scrollHeight：' + rollBox.scrollHeight + '<br/>'
		+ 'scrollTop：' + rollBox.scrollTop;
	roller.style.top =(
		rollBox.scrollTop
			//+（窗口高度-滚动条高度）*(内容滚动量/（内容总高度-窗口总高度）)
		+((rollBox.clientHeight-((rollBox.clientHeight*rollBox.clientHeight)/rollBox.scrollHeight))*(rollBox.scrollTop/(rollBox.scrollHeight-rollBox.clientHeight)))
		)+'px';
};
rollBox.appendChild(roller);

if(rollBox.addEventListener){
	rollBox.addEventListener('DOMMouseScroll',rollScrollFunc,false);
}
rollBox.onmousewheel=rollScrollFunc;//IE/Opera/Chrome/Safari