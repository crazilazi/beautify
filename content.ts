// content script
let clickedElement: any = null;

// tslint:disable-next-line:typedef
document.addEventListener("mousedown", function(event){
  clickedElement = event.target;
}, true);

// tslint:disable-next-line:typedef
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    // clickedElement.remove();
    alert($(clickedElement).text().trim());
  }
);
