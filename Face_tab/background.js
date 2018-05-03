var webcamHtml = chrome.extension.getURL('webcam.html');
var cam;
var popupid;
var tab;
let Mouthopen = true;

console.log('face tab');

// Extantion Hello world
chrome.tabs.onCreated.addListener(function(tab) {
  console.log('new tab');
});

// Open camera
chrome.browserAction.onClicked.addListener(function(tab) {
  console.log('camera is here!');
  cam = window.open(webcamHtml, '_blank', "height=250,width=340");
  chrome.windows.getCurrent(function(win) {
    console.log(win.id);
    win.id = popupid;
  });
});


// If the mouth is open (based on the distance between the lips), open new tab
chrome.runtime.onMessage.addListener(function(message, tab) {
  console.log(message);
  if (message > 15) {
    window.open('https://youtu.be/HrkfXWPk_vo?t=4', '_blank');
    cam.focus();
  }
});
