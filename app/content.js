"use strict";
// content script
var clickedElement = null;
// tslint:disable-next-line:typedef
document.addEventListener("mousedown", function (event) {
    clickedElement = event.target;
}, true);
// tslint:disable-next-line:typedef
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    var eleCss = $(clickedElement).attr("style");
    var eleClass = $(clickedElement).attr("class");
    if (eleClass) {
        $("#Class").text(eleClass);
    }
    if (eleCss) {
        $("#Style").text(eleCss);
    }
    openNav();
});
function injectSideNavBar() {
    // tslint:disable-next-line:typedef
    $.get(chrome.extension.getURL("sideNavBar.html"), function (data) {
        // $(data).appendTo("body");
        // or if you're using jQuery 1.8+:
        $($.parseHTML(data)).appendTo("body");
        // tslint:disable-next-line:typedef
        $("#closemybeautifynavbar").bind("click", function () {
            closeNav();
        });
        // tslint:disable-next-line:typedef
        $(".tablinks").bind("click", function (event) {
            openCity(event, $(this).text().trim());
        });
        $("#beautifyCancel").bind("click", function () {
            closeNav();
        });
    });
}
// tslint:disable-next-line:typedef
function openNav() {
    var open = document.getElementById("mySidenav");
    if (open) {
        open.style.width = "250px";
    }
}
// tslint:disable-next-line:typedef
function closeNav() {
    var close = document.getElementById("mySidenav");
    if (close) {
        close.style.width = "0px";
    }
}
injectSideNavBar();
// tslint:disable-next-line:typedef
function openCity(evt, tabName) {
    // tslint:disable-next-line:typedef
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        $(tabcontent[i]).css("display", "none");
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    $("#" + tabName).css("display", "block");
    evt.currentTarget.className += " active";
}
