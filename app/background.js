"use strict";
// background (background js) page
chrome.contextMenus.create({
    "title": "i wanan be beautiful",
    "id": "iwanabebeautiful",
    "contexts": ["all"]
});
// tslint:disable-next-line:typedef
chrome.contextMenus.onClicked.addListener(function (info, tab) {
    if (tab) {
        chrome.tabs.sendMessage(tab.id, {});
    }
});
