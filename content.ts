// content script
let clickedElement: any = null;

// tslint:disable-next-line:typedef
document.addEventListener("mousedown", function (event) {
  clickedElement = event.target;
}, true);

// tslint:disable-next-line:typedef
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // clickedElement.remove();
  // alert($(clickedElement).text().trim());
  console.log(clickedElement);
  console.log($(clickedElement).parent());
  openNav();
});

function injectSideNavBar(): void {
  // tslint:disable-next-line:typedef
  $.get(chrome.extension.getURL("sideNavBar.html"), function (data) {
    // $(data).appendTo("body");
    // or if you're using jQuery 1.8+:
    $($.parseHTML(data)).appendTo("body");
    $("#closemybeautifynavbar").bind("click", function () {
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
