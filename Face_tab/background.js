var webcamHtml = chrome.extension.getURL('webcam.html');
var cam;
var popupid;

console.log('face tab');

chrome.tabs.onCreated.addListener(function(tab) {
  console.log('hey');

});

chrome.browserAction.onClicked.addListener(function(tab) {
  console.log('camera is here!');
  cam = window.open(webcamHtml, '_blank', "height=250,width=340");
  chrome.windows.getCurrent(function(win) {
    console.log(win.id);
    win.id = popupid;
  });
});

chrome.runtime.onMessage.addListener(function(message, tab) {
  console.log(message);
  if (message > 18) {
    window.open('https://www.google.com', '_blank');
    message = 0;
    cam.focus();
  }
});
