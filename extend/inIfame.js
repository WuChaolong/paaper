
if(!apper){
	var apper = createApper();
}

function createApper(){
	var htmlElement = document.getElementsByTagName("html")[0];
	
	htmlElement.style["position"]="relative";
    htmlElement.style["min-height"]="100%";

	var apperHTML = '<iframe src="http://localhost:8080/apper/?key='+document.location.href
		+'" style="position: absolute;width: 100%;height: 100%;top: 0;left: 0;z-index: -1;border:0;pointer-events: none;"></iframe>';
	var apper = htmlToElement(apperHTML);
	var cssEle = htmlToElement('<style>@-webkit-keyframes move_eye { from { right:0;}  60%{right:0;} to  { right:-21em;}  }@-moz-keyframes move_eye { from { right:0;}  60%{right:0;} to  { right:-21em;}  }@-o-keyframes move_eye { from { right:0;}  60%{right:0;} to  { right:-21em;}  }@keyframes move_eye { from { right:0;}  60%{right:0;} to  { right:-21em;}  } .show-prompt{position: fixed;bottom: .5em;right: -21em;z-index: 2;box-shadow: 1px 1px 5px #868686;padding: .5em;padding-left: 3.5em;transition: right 2s;background-image: url(http://localhost:8080/apper/index_files/img/1463885391767/apper.png);background-size: auto 100%;background-repeat: no-repeat;-webkit-animation: 5s ease-in-out move_eye;-moz-animation: 5s ease-in-out move_eye;-o-animation: 5s ease-in-out move_eye;animation: 5s ease-in-out move_eye;font-family: initial;}.show-prompt:hover{right:0;animation-play-state: paused;}</style>');
	document.body.appendChild(apper);
	document.body.appendChild(cssEle);
	addDblclik(htmlElement,apper.contentWindow);
	return apper;
}
function addDblclik(e1,e2){
	e2.ondblclick = null;
	e1.ondblclick = function(){
		if(apper.style["pointer-events"] == "none"){
			openWriteApper();
		}else{
			onlyReadApper();
		}
		addDblclik(e2,e1)
	}
}
function openWriteApper(){

    apper.style["pointer-events"] = "auto";
    apper.style["z-index"] = 1;
    if(true){
    	showPrompt('<div class="show-prompt">哈哈，你能画了，或者双击回去<br>Haha,You can write,or dblclick back</div>')
    }
	
}

function onlyReadApper(){

	apper.style["pointer-events"] = "none";
	apper.style["z-index"] = -1;
	var prompts = document.getElementsByClassName("show-prompt");
	for(var i = 0;i<prompts.length;i++){
		prompts[i].remove();
	}
}


function showPrompt(html){
	var element = htmlToElement(html);
	document.body.appendChild(element); 
}


/**
 * @param {String} HTML representing a single element
 * @return {Element}
 */
function htmlToElement(html) {
    var template = document.createElement('template');
    template.innerHTML = html;
    return template.content.firstChild;
}