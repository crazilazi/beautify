interface ILooseObject {
  [key: string]: any;
}

// content script
let clickedElement: any = null;

// tslint:disable-next-line:typedef
document.addEventListener("mousedown", function (event) {
  clickedElement = event.target;
}, true);

// tslint:disable-next-line:typedef
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // if($("#mySidenav").length !== 0) {
  //   $("#mySidenav").remove();
  //   injectSideNavBar();
  // }
  let eleCss: string | undefined = $(clickedElement).attr("style");
  let eleClass: string | undefined = $(clickedElement).attr("class");
  if (eleClass) {
    $("#Class").text(eleClass);
  }
  if (eleCss) {
    $("#Style").text(eleCss);
     // tslint:disable-next-line:typedef
     $("#beautifySave").off().on("click", function () {
      applyCssToElement($("#Style").text().trim(), clickedElement);
    });
  }
  openNav();
});

function injectSideNavBar(): void {
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
    // tslint:disable-next-line:typedef
    $("#beautifyCancel").bind("click", function () {
      closeNav();
    });
   
  });
}

// tslint:disable-next-line:typedef
function openNav() {
  let open: any = document.getElementById("mySidenav");
  if (open) {
    open.style.width = "250px";
  }
}

// tslint:disable-next-line:typedef
function closeNav() {
  let close: any = document.getElementById("mySidenav");
  if (close) {
    close.style.width = "0px";
  }
}
injectSideNavBar();

// tslint:disable-next-line:typedef
function openCity(evt: any, tabName: any) {
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

// apply css change to the current element

function applyCssToElement(css: string, elementToApply: Element): void {
  if (css.trim().length === 0) {
    return;
  }
  let cssObj: ILooseObject = {};
  // tslint:disable-next-line:typedef
  css.split(";").forEach(function (item) {
    const keyValue: any[] = item.split(":");
    cssObj[keyValue[0]] = keyValue[1];
  });
  $(elementToApply).css(cssObj);
}
