function getHtml(name) {
	var thisParent = document.currentScript.parentElement;
	var xhr = new XMLHttpRequest();
	xhr.onload = function() {
		debugger;
		thisParent.innerHTML += this.responseText;
	}
	xhr.open("GET", name);
	xhr.responseType = "text";
	xhr.send();
}