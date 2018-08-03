interface ILooseObject {
  [key: string]: any;
}

// content script
let clickedElement: any = null;
let beautifyClickedElement: any = null;
document.addEventListener("mousedown", function (event) {
  clickedElement = event.target;
}, true);

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  beautifyClickedElement = clickedElement;
  let eleCss: string | undefined = $(beautifyClickedElement).attr("style");
  let eleClass: string | undefined = $(beautifyClickedElement).attr("class");
  if (eleClass) {
    eleClass = eleClass.trim().split(" ").filter((item) => item.trim() !== "").join("; ").split(" ").join("\n");
    eleClass = eleClass.trim().endsWith(";") ? eleClass : eleClass.trim() +";";
    $("#Class").text(eleClass);
  }
  if (eleCss) {
    eleCss = eleCss.trim().split(" ").filter((item) => item.trim() !== "").join("; ").split(" ").join("\n");
    eleCss = eleCss.trim().endsWith(";") ? eleCss : eleCss.trim() +";";
    $("#Style").text(eleCss);
  }
  openNav();
});

function injectSideNavBar(): void {
  $.get(chrome.extension.getURL("sideNavBar.html"), function (data) {
    $($.parseHTML(data)).appendTo("body");
    $("#closemybeautifynavbar").bind("click", function () {
      closeNav();
    });
    $(".tablinks").bind("click", function (event) {
      openCity(event, $(this).text().trim());
    });
    $("#beautifyCancel").bind("click", function () {
      closeNav();
    });
    $("#beautifySave").bind("click", function () {
      applyCssToElement();
    });
  });
}

function openNav() {
  let open: any = document.getElementById("mySidenav");
  if (open) {
    open.style.width = "250px";
  }
}

function closeNav() {
  let close: any = document.getElementById("mySidenav");
  if (close) {
    close.style.width = "0px";
  }
}

injectSideNavBar();

function openCity(evt: any, tabName: any) {
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

// apply css change to the current element
function applyCssToElement(): void {
  let css = $("#Style").text().trim();
  if (css.length !== 0) {
    css = css.endsWith(";")? css.substr(css.length - 1) : css;
    let cssObj: ILooseObject = {};
    css.split(";").forEach(function (item) {
      const keyValue: any[] = item.split(":");
      cssObj[keyValue[0].trim()] = keyValue[1].trim();
    });
    $(beautifyClickedElement).removeAttr("style");
    $(beautifyClickedElement).css(cssObj);
  }
  let cssClass = $("#Class").text().trim();
  if (cssClass.length !== 0) {
    cssClass = cssClass.endsWith(";")? cssClass.substr(cssClass.length - 1) : cssClass;
    $(beautifyClickedElement).removeAttr("class");
    $(beautifyClickedElement).addClass(cssClass.split(";").join(" "));
  }
}
