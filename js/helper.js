window.onload = function () {
    var headings = document.querySelectorAll("div.outline-2 > h2");
    headings.forEach(elem => {
        var text = elem.textContent;
        elem.innerHTML = "<a href='#content'>" + text + "</a>";
    })
}
