function getHtml(name) {
	var thisParent = document.currentScript.parentElement;
	var xhr = new XMLHttpRequest();
	xhr.onload = function() {
		thisParent.setAttribute("id", name);
		thisParent.innerHTML += this.responseText;

		buildAside(thisParent);
	}
	xhr.open("GET", name);
	xhr.responseType = "text";
	xhr.send();
}

function buildAside(sectionElem) {
	var h2 = sectionElem.querySelector("h2");
	var asideUl = document.querySelector("aside>ul");
	var li = document.createElement("li");
	var a = document.createElement("a");
	a.href = "#" + sectionElem.id;
	a.innerText = h2.innerText;
	li.appendChild(a);
	asideUl.appendChild(li);
}